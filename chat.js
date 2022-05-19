const knex = require("./db/knexSQLite3")

class Chat {
    constructor() {
        this.knex = knex;
    }

    async createTable() {
        try {
            let table_exist = await this.knex.schema.hasTable("mensajes");
            if (table_exist) {
                return;

            } else {
                let newTabla = await this.knex.schema.createTable("mensajes", (table) => {
                    table.increments("id").primary()
                    table.string("email")
                    table.string("time")
                    table.string("message")

                    return newTabla;
                })
            }

        } catch (err) {
            console.log("CreateTable error: ", err);
        }
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