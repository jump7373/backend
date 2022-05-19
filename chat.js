const { knexSQLite } = require("./db/knexMySQL")

class Chat {
    constructor() {
        this.knex = knexSQLite;
    }

    
    async saveMessage(message) {
        
        await this.knex("mensajes").insert(message)
    };



    // async saveMessage(message) {
    //     const chatMessage = new Promise((resolve, reject) =>{
    //         return fs.readFile(`${this.file}`, `utf-8`, (err, data) => {
    //             if(err){
    //                 reject(err)
    //             }
    //             const listaMensajes = JSON.parse(data);
    //             const msj = {...message, id: listaMensajes.length !== 0 ? listaMensajes[listaMensajes.length - 1].id + 1 : 1}
    //             listaMensajes.push(msj)
    //             fs.writeFile(`${this.file}`, JSON.stringify(listaMensajes, null, 2), `utf-8`, (err) => err && console.log(err))
    //             return resolve(listaMensajes)
    //         })
    //     })
    //     return chatMessage;
    // }
}

module.exports = Chat