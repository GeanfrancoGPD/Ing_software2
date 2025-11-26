import { DB } from './DBComponent.js';
import { Session } from './session.js';
import { hash, compare } from '../util/bycript.js';
import crud from '../controller/crud.js';
// import { sendEmail } from '../controller/email.js';

export class Despatcher {
  constructor(DBConfig) {
    this.DBPool = new DB(DBConfig);
    this.sessionComponent = new Session();
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

    // sendEmail(email);
    sessionObject.response.json({
      success: true,
      message: 'Se ha enviado el correo correctamente',
    });
  }

  async resetPassword(sessionObject) {
    const { email, password } = sessionObject.request.body;

    if (!email || !password) {
      return sessionObject.response.status(404).json({
        success: false,
        message: 'Email y contraseña son requeridos',
      });
    }

    await this.DBPool.executeQuery(
      'update usuario set password = $2 where email = $1',
      [email, password]
    );

    sessionObject.response.json({
      success: true,
      message: 'Se ha cambiado la contraseña correctamente',
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

      const user = await crud.findById('usuario', 'id_usuario', targetId);
      if (!user)
        return sessionObject.response
          .status(404)
          .json({ success: false, message: 'Usuario no encontrado' });

      const tipo = await crud.findById(
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

  destroy(sessionObject) {
    this.sessionComponent.destroySession(sessionObject);
  }

  //   Marcarlo como usado (conservar historial):
  // UPDATE public.cliente_cupon
  // SET usado = true, fecha_asignacion = now()
  // WHERE id_usuario = 123
  //   AND id_cupon = 45;
}
