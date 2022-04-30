const express = require ("express")
const app = express()
const productRoutes = require ("./routes/productRoutes.js")
const {engine} = require("express-handlebars")
const port = 8080;

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", "./views")

app.engine("hbs", engine({
    extname:".hbs",
    defaultLayout:"index.hbs",
    partialsDir:__dirname+"/views/partials"
}))
// app.use(express.static("public"))

app.use("/api/productos", productRoutes)

app.get("/", (req, res) =>{
    res.render("partials/home", {})
})

app.listen (port, ()=>{
    console.log("Server Funcionando")
})
