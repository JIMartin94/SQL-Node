export default class ContenedorProductos{

    constructor(nombre,objetoDB){
        this.nombre = nombre;
        this.objetoDB = objetoDB;

        objetoDB.schema.hasTable(nombre).then(exists => {
            if (!exists) {
                objetoDB.schema.createTable(nombre, tabla => {
                    tabla.increments('id'),
                        tabla.string('title'),
                        tabla.double('price'),
                        tabla.string('thumbnail')
                })
                    .then(() => {
                        console.log(`tabla ${nombre} creada!`)
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
            return 'No se pudieron obtener los productos';
        }
    }

    async getById(idprod){
        try {
            let obj = await this.objetoDB.select('*').from(this.nombre).where({id: idprod})
            return obj
        } catch (error) {
            return 'No se pudieron obtener los productos';
        }
    }

    async agregarProducto(producto){
        if(producto.title == null || typeof(producto.title) != "string" ){
            return "Debe ingresar bien el titulo"
        }
        if(producto.price == null || typeof(producto.price) != "number" ){
            return "Debe ingresar bien el precio"
        }
        if(producto.thumbnail == null || typeof(producto.thumbnail) != "string" ){
            return "Debe ingresar bien la URL"
        }
        try {
            await this.objetoDB.insert(producto).into(this.nombre)
            return "Se ingreso el producto correctamente"
        } catch (error) {
            return "El producto no se pudo agregar"
        }
    }

    async actualizarProducto(producto,idProd){
        if(producto.title == null || typeof(producto.title) != "string" ){
            return "Debe ingresar bien el titulo"
        }
        if(producto.price == null || typeof(producto.price) != "number" ){
            return "Debe ingresar bien el precio"
        }
        if(producto.thumbnail == null || typeof(producto.thumbnail) != "string" ){
            return "Debe ingresar bien la URL"
        }
        try {
            let obj = await this.objetoDB.update(producto).from(this.nombre).where({id: idProd})
            if(obj == 0){
                return "No Se puedo actualizar el producto"
            }
            return "Se actualizo el producto correctamente"
        } catch (error) {
            return "El producto no se pudo agregar"
        }
    }

    async borrarProducto(idProd){
        try {
            let obj = await this.objetoDB.delete().from(this.nombre).where({id: idProd})
            if(obj == 0){
                return `No existe producto con id ${idProd}`
            }
            return `El objeto con id ${idProd} fue eliminado.`
        } catch (error) {
            return `No se pudo eliminar el objeto con id ${idProd}.`
        }
    }


}
    
