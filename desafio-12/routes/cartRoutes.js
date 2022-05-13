const express = require("express")
const { Router } = express
const routerCarrito = new Router()
const Contenedor = require ("../classItem")
const archivoProducto = new Contenedor("../tienda.json")
const isAdmin = require ("../admin")
const Carrito = require("../classCart")
const archivoCarrito = new Carrito("../clientes.json")

routerCarrito.post("/", async (req,res) =>{
     res.send(await archivoCarrito.create())
})

routerCarrito.post("/:cartId/products", async (req,res) =>{
     let response = await archivoCarrito.addProduct(req.params.cartId, req.body.productId)
     response.error ? res.status(400).json(response) : res.status(200).send();
})


routerCarrito.get("/:cartId/products", async (req, res)=>{
    let response = await archivoCarrito.getProducts(req.params.cartId)
    response.error ? res.status(400).json(response) : res.status(200).json(response)

})


routerCarrito.delete("/:cartId/products/:productId", async (req, res)=>{
    let response = await archivoCarrito.deleteProduct (req.params.cartId, req.params.productId)
    response.error ? res.status(400).json(response) : res.status(200).send()
})

routerCarrito.delete("/:cartId", async (req, res) =>{
    let response = await archivoCarrito.deleteCart(req.params.cartId)
    response.error ? res.status(400).json(response) : res.status(200).send()
})

module.exports = routerCarrito