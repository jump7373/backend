const express = require("express")
const fs = require("fs");
const port = 8080;
const multer = require ("multer")

const Contenedor = require("../classItem");
const archivo2 = new Contenedor("tienda.txt")

const { Router } = express
let router = new Router()

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads")
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
})

let upload = multer ({storage})


router.get(`/`, async (req, res) =>{
    const TLProd = await archivo2.getAll()
    res.render("templates/productos", {data: TLProd})
})


router.get("/:id", async (req, res) =>{
    let productoBuscado = await archivo2.getByID(req.params.id)    
    res.send(productoBuscado)    
})

router.post("/", upload.single("thumbnail"), (req, res) =>{
    let file = req.file
    if(!file){
        res.status(400).send({message: "Error al cargar"})
    }
    
    let nuevoProducto ={
        title: req.body.title,
        price: parseInt(req.body.price),
        thumbnail: req.file.path,
        id: parseInt(req.body.id)
    }
    console.log(req.file)
    
    archivo2.save(nuevoProducto)

    res.send(`El nuevo producto es ${nuevoProducto.id}`)
    
})

router.put("/:id", async (req, res)=>{
    let id = req.params.id
    const listaProductos = await archivo2.getAll();
    const productoId = await archivo2.getByID(id);

    const idFind = listaProductos.findIndex((item) => item.id == id)

    if(idFind >= 0){
        listaProductos[idFind] = {...req.body, id: productoId.id}
        fs.writeFileSync("../tienda.txt", JSON.stringify(listaProductos));
        res.send("Producto Actualizado")
    }else{
        res.send(`Producto con id ${id} no está en la tienda.`)
    }
})

router.delete("/:id", async (req, res)=>{
    const borrarId = req.params.id;

    res.send(await archivo2.deleteById(borrarId))
})


module.exports = router