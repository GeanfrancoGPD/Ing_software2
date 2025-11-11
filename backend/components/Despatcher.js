import { DB } from "./DBComponent.js";
import { Session } from "./session.js";
// import nodemailer from "nodemailer";

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
                message: "Email y contraseña son requeridos",
            });
        }

        const user = await this.DBPool.executeQuery(
            "SELECT id_usuario AS id, nombre AS name, email FROM usuario WHERE email = $1 AND password = $2",
            [email, password]
        );

        if (user.length === 0) {
            return sessionObject.response.status(401).json({
                success: false,
                message: "Credenciales incorrectas",
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
        message: "Todos los datos son requeridos",
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

    await this.DBPool.executeQuery(
      "INSERT INTO usuario (nombre, email, password, id_tipo_usuario) VALUES ($1, $2, $3, $4)",
      [nombre, email, password, tipoFinal]
    );

    sessionObject.response.json({
      success: true,
      message: "Se ha creado el usuario correctamente",
    });
  }

  async recoverPassword(sessionObject) {
    const { email } = sessionObject.request.body;

    if (!email) {
      return sessionObject.response.status(403).json({
        success: false,
        message: "El email es requerido",
      });
    }

    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "<tu_correo>@gmail.com",
    //     pass: "<tu_contraseña>",
    //   },
    // });

    // await transporter.sendMail({
    //   from: "<tu_correo>@gmail.com",
    //   to: email,
    //   subject: "Recuperacion de contraseña",
    //   html: `
    //                 <h1>Recupera tu contraseña</h1>
    //                 <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
    //                 <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
    //                 <a href="http://localhost:3000/api/resetpassword" style="
    //                 background-color: #007bff;
    //                 color: white;
    //                 padding: 10px 20px;
    //                 text-decoration: none;
    //                 border-radius: 5px;
    //                 display: inline-block;
    //                 ">Restablecer contraseña</a>
    //                 <p>Este enlace expirará en 1 hora.</p>
    //                 <p>Si no solicitaste este cambio, ignora este correo.</p>
    //             `,
    // });

    sessionObject.response.json({
      success: true,
      message: "Se ha enviado el correo correctamente",
    });
  }

  async resetPassword(sessionObject) {
    const { email, password } = sessionObject.request.body;

    if (!email || !password) {
      return sessionObject.response.status(404).json({
        success: false,
        message: "Email y contraseña son requeridos",
      });
    }

    await this.DBPool.executeQuery(
      "update usuario set password = $2 where email = $1",
      [email, password]
    );

    sessionObject.response.json({
      success: true,
      message: "Se ha cambiado la contraseña correctamente",
    });
  }

  async getData(sessionObject) {
    if (this.sessionComponent.sessionExist(sessionObject)) {
      const data = await this.DBPool.executeQuery(
        `SELECT a.nombre AS name, c.nombre AS profile
       FROM usuario AS a
       INNER JOIN perfil_usuario AS b ON a.id = b.id_usuario
       INNER JOIN perfil AS c ON b.id_perfil = c.id
       WHERE a.id = $1`,
        [sessionObject.request.session.user.id]
      );

      sessionObject.response.json({
        name: data[0].name,
        profile: data[0].profile,
        success: true,
      });
    }
  }

  destroy(sessionObject) {
    this.sessionComponent.destroySession(sessionObject);
  }
}
