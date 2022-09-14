const{ clienteSQL, clienteSQLite } = require('./clienteSQL.js')

clienteSQL.schema.hasTable('productos')
    .then(exists => {
        if (!exists) {
            clienteSQL.schema.createTable('productos', tabla => {
                tabla.increments('id'),
                    tabla.string('title'),
                    tabla.double('price'),
                    tabla.string('thumbnail')
            })
                .then(() => {
                    console.log('tabla "productos" creada!')
                })
        } else {
            console.log('la tabla "productos" ya existe. no se realizaron cambios')
        }
    })
    .finally(() => {
        clienteSQL.destroy()
    })

clienteSQLite.schema.hasTable('mensajes')
    .then(exists => {
        if (!exists) {
            clienteSQLite.schema.createTable('mensajes', tabla => {
                tabla.increments('id'),
                    tabla.string('autor'),
                    tabla.string('texto'),
                    tabla.string('date')
            })
                .then(() => {
                    console.log('tabla "mensajes" creada!')
                })
        } else {
            console.log('la tabla "mensajes" ya existe. no se realizaron cambios')
        }
    })
    .finally(() => {
        clienteSQLite.destroy()
    })