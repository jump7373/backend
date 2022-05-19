const knex = require("knex")({
    client: "sqlite3",
    connection: {filename: "./mydb.sqlite"},
    useNullAsDefault: true,
})


exports.module = knex;