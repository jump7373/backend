const express = require ("express");
const app = express();
const productRoutes = require ("./routes/productRoutes");
const path = require('path');
const listadoProductos = require ('./tienda.json');
const productMethods = require("./api/productMethods");

const chatJS = require("./chat");
let chat = new chatJS();
let mensajes = require("./mensajes.json");


const http = require("http")
const server = http.createServer(app)

const { Server } = require("socket.io")
const io = new Server(server)

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname + `/public`)))
app.use(`/api`, productRoutes)

const port = process.env.PORT || 8080

io.on(`connection`, (socket) => {
    
    socket.emit(`productsConected`, listadoProductos)
    socket.on(`newProduct`, data =>{
        productMethods.saveProductSocket(data)
    })

    socket.emit(`chatActualizado`, mensajes)
    socket.on(`newMessage`, data =>{
        chat.saveMessage(data)
    })
})

server.listen(port, () =>{
    console.log(`Server in port ${port}!`)
})

app.use("/api/productos", productRoutes)

