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


const Productos = async () => {
    const TLProd = await archivo2.getAll()
    router.get('/', (req, res) => {
        res.send(TLProd)
    })
}
Productos()


const ProductosRandom = async () => {
    const productosRan = await archivo2.getAll()

    router.get("/productoRandom", (req, res) => {
        
        let productoRandom = productosRan[Math.floor(Math.random() * productosRan.length)];
        res.send(productoRandom)
    })
}

ProductosRandom()

// router.get("/productos/:id", async (req, res) =>{
//     let productoBuscado = await archivo2.getByID(req.params.id)
    

//     res.send(productoBuscado)    
// })

const ProductosId = async () => {
    const productosPorId = await archivo2.getAll()

    router.get("/:id", (req, res) => {
        let id = req.params.id

            
            let productoId = productosPorId.find((item) => {
                return item.id == id
            });
            
            if(productoId){
                res.send(productoId)    
            }else{
                res.send({Error: "Producto no encontrado"})
            }
        
    })
}

ProductosId()




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



module.exports = router