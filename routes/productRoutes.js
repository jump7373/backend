const express = require("express")
const { Router } = express
const productRouter = new Router()
const Contenedor = require("../classItem")
const archivo = new Contenedor()
const isAdmin = require("../middlewares/admin")


const productMethods = require("../api/productMethods")
const {knexMySQL} = require("../db/knexMySQL")

const urlForm = "/form"
const form = 'public/index.html'

productRouter.get("/", async (req, res) => {
   let productos = await archivo.getAll()
   
   res.render("templates/products", { data: productos })

})

productRouter.get("/:id", async (req, res) => {
   let prodId = await archivo.getById(req.params.id)

   if (prodId) {
       res.render("templates/products", {data: prodId})
   } else {
       res.render("templates/noExiste", {data: req.params.id})
   }

})

productRouter.post("/", isAdmin, async (req, res) => {
      let nuevoProducto = {
         title: req.body.title,
         descripcion: req.body.descripcion,
         price: parseInt(req.body.price),
         thumbnail: req.body.thumbnail,
         stock: parseInt(req.body.stock),
         timestamp: new Date(),
         codigo: req.body.codigo               
     } 
     
   await archivo.save(nuevoProducto)   
   
   res.redirect("/")
})

productRouter.put("/:id", isAdmin, async (req, res) => {
   
   let id = req.params.id

   let editarProducto = {
      title: req.body.title,
      descripcion: req.body.descripcion,
      price: parseInt(req.body.price),
      thumbnail: req.body.thumbnail,
      stock: parseInt(req.body.stock),
      timestamp: new Date(),
      codigo: req.body.codigo               
  } 

  await archivo.editById(id, editarProducto)

  res.send({data: editarProducto})
     
})


productRouter.delete("/:id", isAdmin, async (req, res) => {
   const Id = req.params.id;
   const productoBorrado = await archivo.deleteById(Id)
   res.send("Producto Borrado")
})


module.exports = productRouter