export class Session{
    constructor(DBComponent){
        this.DBComponent = DBComponent
    }

    async createSession(sessionObject, user){

        sessionObject.request.session.user = {
            id: user[0].id,
            email: user[0].email,
            name: user[0].name
        }

        sessionObject.response.json({
            success: true,
            message: 'Se ha iniciado sesion correctamente',
            user: sessionObject.request.session.user
        })
    }

    sessionExist(sessionObject){
        return (sessionObject.request.session.user? true : false)
    }

    destroySession(sessionObject){
        sessionObject.request.session.destroy((error) =>{
            if (error) {
                sessionObject.response.status(500).json({
                    success: false,
                    message: 'Error al cerrar sesión'
                });
            }
                
            sessionObject.response.json({
                success: true,
                message: 'Sesión cerrada exitosamente'
            });
        })
    }

}