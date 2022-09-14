import express from 'express'
import { clienteSQL, clienteSQLite } from './clienteSQL.js'
import ContenedorMensajes from './contenedorMensajes.js';
import ContenedorProductos from './contenedorProductos.js';


const app = express();

app.use(express.json())

const productos = new ContenedorProductos("productos",clienteSQL);

const mensajes = new ContenedorMensajes("mensajes",clienteSQLite);

app.get('/productos', async (req,res)=>{
    const products = await productos.getAll();
    res.json(products)
})

app.get('/mensajes', async (req,res)=>{
    const mensajs = await mensajes.getAll();
    res.json(mensajs)
})

app.get('/productos/:id', async(req,res)=>{
    const producto = await productos.getById(Number(req.params.id))
    res.json(producto)
})

app.get('/mensajes/:id', async(req,res)=>{
    const mensaje = await mensajes.getById(Number(req.params.id))
    res.json(mensaje)
})

app.post('/productos', async (req,res) =>{
    let prod = {title: req.body.title, price: req.body.price, thumbnail: req.body.thumbnail}
    let obj = await productos.agregarProducto(prod);
    res.json(obj)
})

app.post('/mensajes', async (req,res) =>{
    let mens = {autor: req.body.autor, texto: req.body.texto, date: new Date().toLocaleString()}
    let obj = await mensajes.agregarMensaje(mens);
    res.json(obj)
})


app.put('/productos/:id',async (req,res)=>{
    let id = Number(req.params.id)
    let prod = { title: req.body.title, price: req.body.price, thumbnail: req.body.thumbnail}
    await productos.actualizarProducto(prod,id).then(data =>{
        res.json(data);
    }).catch(e=>{
        console.log(e)
    })
})

app.put('/mensajes/:id',async (req,res)=>{
    let id = Number(req.params.id)
    let prod = {autor: req.body.autor, texto: req.body.texto, date: new Date().toLocaleString()}
    await mensajes.actualizarMensaje(prod,id).then(data =>{
        res.json(data);
    }).catch(e=>{
        console.log(e)
    })
})

app.delete('/productos/:id',async (req,res)=>{
    await productos.borrarProducto(Number(req.params.id)).then(data=>{
        res.json(data);
    }).catch(e=>{
        console.log(e)
    })
})

app.delete('/mensajes/:id',async (req,res)=>{
    await mensajes.borrarMensaje(Number(req.params.id)).then(data=>{
        res.json(data);
    }).catch(e=>{
        console.log(e)
    })
})

app.listen(8080, () =>{
    console.log('Servidor conectado')
})