const knexMySQL = require("knex")({
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

const knexSQLite = require("knex")({
    client: "sqlite3",
    connection: {filename: "./mydb.sqlite"},
    useNullAsDefault: true,
})

knexMySQL.schema.createTableIfNotExists("productos", function(table){
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



knexSQLite.schema.createTableIfNotExists("mensajes", function (table) {
      table.string("email");
      table.string("time");
      table.string("message");
      table.increments("id").primary()
    })
    .then(() => {
      console.log("Tabla mensajes creada");
    })
    .catch((err) => {
      console.log(err);
    });


module.exports = {knexMySQL, knexSQLite};