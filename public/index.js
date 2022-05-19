const socket = io()

// Productos
socket.on(`productsConected`, (data) =>{
    mostrarProductos(data)
})

const mostrarProductos = lista => {
    const prod = lista.map(item =>
        `<tr>
            <td>${item.title}</td>
            <td>${item.price}</td>
            <td><img style= "width: 50px" src="${item.thumbnail}"></td>
        </tr>`
        ).join(' ')
        document.getElementById(`productList`).innerHTML = prod
}


//Chat
socket.on(`chatActualizado`, (data) =>{
    mostrarChat(data)
})

const mostrarChat = lista => {
    let mensajes = lista.map(item => `
    <div>
        <h2 style="color: blue">${item.email}</h2>
        <p style="color: green"><i>${item.message}</i></p>
        
        <p>Mensaje enviado a las: ${item.time}</p>
        
    </div>
    `).join(' ')
    document.querySelector(`#messageSent`).innerHTML = mensajes;
}

const enviarMensaje = () => {
    let email = document.querySelector("#emailForm").value
    let message = document.querySelector("#messageForm").value
    let time = new Date()

    if (email.length !== 0 && message.length !== 0) {
        const nuevoMail = {
            email, 
            time: `${time.getDate()} - ${time.getMonth()} - ${time.getFullYear()} (${time.getHours()} : ${time.getMinutes()})`,
            message
        }
        email = document.querySelector("#emailForm").value = " "
        message = document.querySelector("#messageForm").value = " "
        socket.emit("newMessage", nuevoMail)
        
    }else{
        document.querySelector("#messageError").innerHTML = `<span style: "color: Red"> Campos incompletos </span>`
        setTimeout(() =>{
            document.querySelector("#messageError").innerHTML = ''
        }, 3000)
    }

}

document.querySelector("#chatForm").addEventListener("submit", (e) =>{
    e.preventDefault()
    enviarMensaje()
})