import { DB } from './DBComponent.js';
import { Session } from './session.js';
import { hash, compare } from '../util/bycript.js';
import Crud from '../controller/crud.js';
import crypto from 'crypto';
import { sendEmail } from '../controller/email.js';
import { log } from 'console';

export class Despatcher {
  constructor(DBConfig) {
    this.DBPool = new DB(DBConfig);
    this.crud = new Crud(this.DBPool);
    this.sessionComponent = new Session();
  }

  existSession(sessionObject) {
    return this.sessionComponent.sessionExist(sessionObject);
  }

  async login(sessionObject) {
    const { email, password } = sessionObject.request.body;

    if (!email || !password) {
      return sessionObject.response.status(400).json({
        success: false,
        message: 'Email y contraseña son requeridos',
      });
    }
    const user = await this.DBPool.executeQuery(
      'SELECT id_usuario AS id, nombre AS name, email, password FROM usuario WHERE email = $1',
      [email]
    );

    if (user.length === 0) {
      return sessionObject.response
        .status(401)
        .json({ success: false, message: 'Usuario no encontrado' });
    }

    const isPasswordValid = await compare(password, user[0].password);

    if (!isPasswordValid) {
      return sessionObject.response.status(401).json({
        success: false,
        message: 'contraseña incorrecta',
      });
    }

    await this.sessionComponent.createSession(sessionObject, user);
  }

  async registerUser(sessionObject) {
    const { nombre, email, password, tipo_usuario } =
      sessionObject.request.body;

    if (!email || !password || !nombre) {
      return sessionObject.response.status(402).json({
        success: false,
        message: 'Todos los datos son requeridos',
      });
    }

    // Si no se especifica tipo_usuario, usar el ID del tipo "Cliente"
    let tipoFinal = tipo_usuario;
    if (!tipo_usuario) {
      const tipoCliente = await this.DBPool.executeQuery(
        "SELECT id_tipo_usuario FROM Tipos_usuario WHERE de_tipo_usuario = 'Cliente'"
      );
      if (tipoCliente.length === 0) {
        return sessionObject.response.status(500).json({
          success: false,
          message: "No se encontró el tipo de usuario 'Cliente'",
        });
      }
      tipoFinal = tipoCliente[0].id_tipo_usuario;
    }

    const hashedPassword = await hash(password);

    await this.DBPool.executeQuery(
      'INSERT INTO usuario (nombre, email, password, id_tipo_usuario) VALUES ($1, $2, $3, $4)',
      [nombre, email, hashedPassword, tipoFinal]
    );

    sessionObject.response.json({
      success: true,
      message: 'Se ha creado el usuario correctamente',
    });
  }

  async recoverPassword(sessionObject) {
    const { email } = sessionObject.request.body;

    if (!email) {
      return sessionObject.response.status(403).json({
        success: false,
        message: 'El email es requerido',
      });
    }

    const emailExists = await this.crud.findById('usuario', 'email', email);

    if (!emailExists) {
      return sessionObject.response.status(404).json({
        success: false,
        message: 'El email no está registrado',
      });
    }
    // 1. Generar token aleatorio
    let token = Math.random().toString(36).substring(2, 8).toUpperCase();

    // 2. Calcular expiración
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // 3 minutos

    // 3. Guardar token en la base de datos
    await this.DBPool.executeQuery(
      `
    INSERT INTO password_reset_tokens (email, token, expires_at)
    VALUES ($1, $2, $3)
    ON CONFLICT (email)
    DO UPDATE SET token = $2, expires_at = $3
    `,
      [email, token, expiresAt]
    );

    // 4. Enviar email
    sendEmail(email, token);

    return sessionObject.response.json({
      success: true,
      message: 'Token generado',
    });
  }

  async resetPassword(sessionObject) {
    console.log('Cuerpo de la solicitud:', sessionObject.request.body);

    const { token, password } = sessionObject.request.body;

    if (!token || !password) {
      return sessionObject.response.status(400).json({
        success: false,
        message: 'Token y contraseña son requeridos',
      });
    }

    // 1. Buscar el token en la DB
    const rows = await this.DBPool.executeQuery(
      'SELECT email, token, expires_at FROM password_reset_tokens WHERE token = $1',
      [token]
    );

    if (!rows.length) {
      return sessionObject.response.status(401).json({
        success: false,
        message: 'Token inválido',
      });
    }

    const record = rows[0];

    // 2. Validar expiración
    if (new Date() > record.expires_at) {
      return sessionObject.response.status(401).json({
        success: false,
        message: 'El token ha expirado',
      });
    }

    const newHashed = await hash(password);

    await this.DBPool.executeQuery(
      'UPDATE usuario SET password = $1 WHERE email = $2',
      [newHashed, record.email]
    );

    return sessionObject.response.json({
      success: true,
      message: 'Contraseña cambiada correctamente',
    });
  }

  async getData(sessionObject) {
    if (!this.sessionComponent.sessionExist(sessionObject)) {
      return sessionObject.response
        .status(401)
        .json({ success: false, message: 'No hay sesión activa' });
    }

    try {
      const requesterId = sessionObject.request.session.user.id; // quien hace la petición
      const requesterTipo = sessionObject.request.session.user.tipo; // 1=admin,2=cliente,3=empleado (ajusta según tu sesión)
      const targetId = sessionObject.request.params?.id || requesterId; // si piden id, sino su propio id

      // si no es admin y pide otro usuario -> 403
      if (requesterTipo !== 1 && Number(targetId) !== Number(requesterId)) {
        return sessionObject.response
          .status(403)
          .json({ success: false, message: 'No autorizado' });
      }

      const user = await this.crud.findById('usuario', 'id_usuario', targetId);
      if (!user)
        return sessionObject.response
          .status(404)
          .json({ success: false, message: 'Usuario no encontrado' });

      const tipo = await this.crud.findById(
        'tipos_usuario',
        'id_tipo_usuario',
        user.id_tipo_usuario
      );

      return sessionObject.response.json({
        name: user.nombre,
        email: user.email,
        profile: tipo ? tipo.de_tipo_usuario : 'Usuario',
        success: true,
      });
    } catch (error) {
      console.error(error);
      return sessionObject.response
        .status(500)
        .json({ success: false, message: 'Error al obtener datos' });
    }
  }

  async toProccess(sessionObject) {
    const { table, params, type } = sessionObject.request.body;
    // Lógica para el método ToProccess
    /**
     *  ejemplos
     * create:
     *  await this.crud.create("usuario", { nombre: "Juan", email: "test" });
     * update:
     *  await this.crud.update("usuario", "id_usuario", 5, { email: "nuevo@mail.com" });
     * delete:
     *  await this.crud.delete("usuario", "id_usuario", 5);
     * findById:
     *  const user = await this.crud.findById("usuario", "id_usuario", 5);
     * findAll:
     *  const users = await this.crud.findAll("usuario");
     *
     */
    if (!this.existSession(sessionObject)) {
      return sessionObject.response
        .status(401)
        .json({ success: false, message: 'No hay sesión activa' });
    }

    try {
      switch (type) {
        case 'create':
          // Lógica para crear un registro
          const created = await this.crud.create(table, params);
          return sessionObject.response.json({
            success: true,
            data: created,
          });

        case 'update':
          // Lógica para actualizar un registro
          const { idCol, id, data } = params;
          const updated = await this.crud.update(table, idCol, id, data);
          return sessionObject.response.json({
            success: true,
            data: updated,
          });
        case 'delete':
          // Lógica para eliminar un registro
          const { idCol: delIdCol, id: delId } = params;
          const deleted = await this.crud.delete(table, delIdCol, delId);
          return sessionObject.response.json({
            success: true,
            data: deleted,
          });
        case 'findById':
          // Lógica para encontrar un registro por ID
          const { idCol: findIdCol, id: findId } = params;
          const foundById = await this.crud.findById(table, findIdCol, findId);
          return sessionObject.response.json({
            success: true,
            data: foundById,
          });
        case 'findAll':
          // Lógica para encontrar registros
          const found = await this.crud.findAll(table);
          return sessionObject.response.json({
            success: true,
            data: found,
          });
      }
    } catch (error) {
      console.error(error);
      return sessionObject.response
        .status(500)
        .json({ success: false, message: 'Error al procesar la solicitud' });
    }
  }

  destroy(sessionObject) {
    this.sessionComponent.destroySession(sessionObject);
  }

  //   Marcarlo como usado (conservar historial):
  // UPDATE public.cliente_cupon
  // SET usado = true, fecha_asignacion = now()
  // WHERE id_usuario = 123
  //   AND id_cupon = 45;
}
