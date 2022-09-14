
export default class ContenedorMensajes{

    constructor(nombre,objetoDB){
        this.nombre = nombre;
        this.objetoDB = objetoDB;

        objetoDB.schema.hasTable(nombre).then(exists => {
            if (!exists) {
                objetoDB.schema.createTable(nombre, tabla => {
                    tabla.increments('id'),
                        tabla.string('autor'),
                        tabla.string('texto'),
                        tabla.string('date')
                })
                    .then(() => {
                        console.log(`tabla ${nombre} fue creada!`)
                    })
            } else {
                console.log(`la tabla "${nombre}" ya existe. no se realizaron cambios`)
            }
        })
        // .finally(() => {
        //     objetoDB.destroy()
        // })
    }

    async getAll(){
        try {
            let objs = await this.objetoDB.select('*').from(this.nombre)
            return objs
        } catch (error) {
            return 'No se pudieron obtener los mensajes';
        }
    }

    async getById(idmensaje){
        try {
            let obj = await this.objetoDB.select('*').from(this.nombre).where({id: idmensaje})
            return obj
        } catch (error) {
            return 'No se pudieron obtener los mensajes';
        }
    }

    async agregarMensaje(mensaje){
        if(mensaje.autor == null || typeof(mensaje.autor) != "string" ){
            return "Debe ingresar bien el autor"
        }
        if(mensaje.texto == null || typeof(mensaje.texto) != "string" ){
            return "Debe ingresar bien el texto"
        }
        if(mensaje.date == null || typeof(mensaje.date) != "string" ){
            return "Debe ingresar bien la fecha"
        }
        try {
            await this.objetoDB.insert(mensaje).into(this.nombre)
            return "Se ingreso el mensaje correctamente"
        } catch (error) {
            return "El mensaje no se pudo agregar"
        }
    }

    async actualizarMensaje(mensaje,idMens){
        if(mensaje.autor == null || typeof(mensaje.autor) != "string" ){
            return "Debe ingresar bien el autor"
        }
        if(mensaje.texto == null || typeof(mensaje.texto) != "string" ){
            return "Debe ingresar bien el texto"
        }
        if(mensaje.date == null || typeof(mensaje.date) != "string" ){
            return "Debe ingresar bien la fecha"
        }
        try {
            let obj = await this.objetoDB.update(mensaje).from(this.nombre).where({id: idMens})
            if(obj == 0){
                return "No Se puedo actualizar el mensaje"
            }
            return "Se actualizo el mensaje correctamente"
        } catch (error) {
            return "El mensaje no se pudo agregar"
        }
    }

    async borrarMensaje(idProd){
        try {
            let obj = await this.objetoDB.delete().from(this.nombre).where({id: idProd})
            if(obj == 0){
                return `No existe mensaje con id ${idProd}`
            }
            return `El mensaje con id ${idProd} fue eliminado.`
        } catch (error) {
            return `No se pudo eliminar el mensaje con id ${idProd}.`
        }
    }


}
    