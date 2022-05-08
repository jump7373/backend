const socket = io()

socket.on("message_back", (data) =>{
    console.log(data)
    socket.emit("message_front", "Gracias amigo!!")
})

const render = (data) => {
    let listaRenderizada = data.map((item) => {
        return `
        <p>${item.title}</p>
        `
    }).join(" ")

    document.querySelector("#listaSocket").innerHTML = listaRenderizada
}
