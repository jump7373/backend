const knex = require("knex")({
    client:"mysql",
    connection: {
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "",
        database: "cervezame"
    },
    pool: {min: 2, max: 8}
})

knex.schema.createTableIfNotExists("productos", function(table){
    table.increments("id").primary()
    table.string("title")
    table.string("descripcion")
    table.integer("price")
    table.string("thumbnail")
    table.integer("stock")
    table.integer("timestamp")
    table.string("codigo")


})
.then(() => {
    console.log ("Tabla creada");
})
.catch((err) =>{
    throw err;
})


module.exports = knex;