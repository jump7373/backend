const express = require("express")
const { Router } = express
const routerCarrito = new Router()
const Carrito = require("../classCart")
const archivoCarrito = new Carrito("clientes.json")
archivoCarrito.setCart()
const Contenedor = require ("../classItem")
const archivoProducto = new Contenedor("../tienda.json")
const isAdmin = require ("../middlewares/admin")



routerCarrito.post("/", async (req,res) =>{
    res.json(await archivoCarrito.createCart())
    
})


routerCarrito.post("/:cartId/products/:productId", async (req,res) =>{
     let response = await archivoCarrito.addProduct(req.params.cartId, req.params.productId)
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