const express = require ("express");
const res = require("express/lib/response");
const app = express()
const productRoutes = require ("./routes/productRoutes.js")
const port = 8080;


app.set("view engine", "pug")
app.set("views", "./views")

app.get("/", (req, res)=>{
    res.render("index")
})

app.use(express.json())
// app.use(express.static("public"))

app.use("/api/productos", productRoutes)

app.listen (port, ()=>{
    console.log("Server Funcionando")
})
