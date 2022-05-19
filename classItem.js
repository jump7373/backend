const fs = require ("fs");
const { knexMySQL } = require("./db/knexMySQL")

class Contenedor {
    constructor (){
        this.knex = knexMySQL;
    }

    async save(object) {
       
        await this.knex("productos").insert(object).then(() => {
            console.log(`Producto cargado`)
         }).catch(err => {
            console.log(err)
         })
    }

    async getById(id) {
        
        const product = await this.knex.from("productos").select("*").where({id: id})
        
        return product;
    }

    async getAll() {
        
        const product = await this.knex.from("productos").select("*")
        
        return product;
    }

    async deleteById(id) {
        const borrarProducto = await this.knex.from("productos").where({id: id}).del()
        
        return borrarProducto;
    }

    async getRandom() {
        const listadoProductos = await this.getAll()

        const productoRandom = (min, max) => Math.floor(math.random() * (max - min)) + min;
        return listadoProductos[productoRandom(0, 3)]
    }

    async editById(id, item){
        
        const productoEditado = await this.knex("productos").where({id: id}).update({
            
            title: item.title,
            descripcion: item.descripcion,
            price: item.price,
            thumbnail: item.thumbnail,
            stock: item.stock,
            timestamp: item.timestamp,
            codigo: item.codigo
            
        })

        return productoEditado;
    }


}

module.exports = Contenedor;

