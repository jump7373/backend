const express = require ("express")
const app = express()
const productRoutes = require ("./routes/productRoutes.js")
const port = 8080;

app.set("view engine", "ejs")
app.set("views", "./views")

app.use(express.json())


app.use("/api/productos", productRoutes)

app.get("/", (req, res)=>{
    res.render("index")
})


app.listen (port, ()=>{
    console.log("Server Funcionando")
})
