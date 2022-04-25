const express = require ("express")
const app = express()
const productRoutes = require ("./routes/productRoutes.js")
const port = 8080;

app.use(express.json())
app.use(express.static("public"))

app.use("/api/productos", productRoutes)





app.listen (port, ()=>{
    console.log("Server Funcionando")
})
