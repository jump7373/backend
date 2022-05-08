const express = require ("express")
const app = express()
const productRoutes = require ("./routes/productRoutes.js")
const {engine} = require("express-handlebars")
const port = 8080;
const http = require("http")
const server = http.createServer(app)
const listaProductos = require ("./tienda.json")

const {Server} = require("socket.io")
const io = new Server (server)


app.use(express.static(__dirname + "/public"))
app.use(express.json())
app.set("view engine", "hbs")
app.set("views", "./views")

app.engine("hbs", engine({
    extname:".hbs",
    defaultLayout:"index.hbs",
    partialsDir:__dirname+"/views/partials"
}))


io.on("connection", (socket) => {

    
    socket.emit("message_back", listaProductos)
    
    socket.on("message_front", (data) =>{
        console.log(data)
    })

    
})


app.use("/api/productos", productRoutes)

app.get("/", (req, res) =>{
    res.render("partials/home", {})
})

server.listen (port, ()=>{
    console.log("Server Funcionando")
})
