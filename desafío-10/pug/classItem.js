const { Console } = require("console")
const { json } = require("express/lib/response")
const fs = require(`fs`)
const { resolve } = require("path")
const { argv } = require("process")



class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
        this.stock = []

    }

    save(object) {


        this.stock.push(object)


        fs.readFile(`./${this.fileName}`, "utf-8", (err, data) => {
            if (err) {
                console.log("Error al leer el archivo.")
                fs.writeFile(`./${this.fileName}`, JSON.stringify(this.stock), "utf-8", (err) => {
                    if (err) {
                        console.log("No se pudo actualizar el documento")
                    } else {
                        console.log("Se actualizó el documento correctamente")

                    }
                })
            } else {

                
                if (data === "") {
                    fs.writeFile(`./${this.fileName}`, JSON.stringify(this.stock), "utf-8", (err) => {
                        if (err) {
                            console.log("No se pudo actualizar el documento vacío")
                        } else {
                            console.log("Se agregó el primer objeto al archivo")

                        }
                    })
                } else {

                    const dataFile = JSON.parse(data)
                    this.stock.push(...dataFile)


                    fs.writeFile(`./${this.fileName}`, JSON.stringify(this.stock), "utf-8", (err) => {
                        if (err) {
                            console.log("No se pudo actualizar el documento")
                        } else {
                            console.log("Se actualizó el documento correctamente")

                        }
                    })
                }



            }
            console.log(object.id)
        })



    }

    
    async getAll() {
        const data = await fs.promises.readFile(`./${this.fileName}`, "utf-8", (err, data) => {

            if (err) throw err
            const info = JSON.parse(data)
            return info
        })

        return JSON.parse(data)
    }

    async getByID(idNumber){
        const productos = await this.getAll()
        const index = productos.find((item) => {
            return item.id == idNumber
        })
        try{
            if(index){
                return index
            }else{
                return console.log("Producto no encontrado")
            }
        }
        catch(err) {
            console.log(err)
        }
    }

    
    async deleteById(idNumber){
        const productos = await this.getAll();

        if(productos.length > 0){
            const eliminarProducto = productos.filter((item) => {
                return item.id !== idNumber
            });

            fs.writeFileSync(`./${this.fileName}`, JSON.stringify(eliminarProducto))
            console.log("Producto borrado")
            
        }else{
            console.log("El producto no existe")
        }
    }

    // deleteById(idNumber) {
    //     const listaProductos = this.getAll()
    //     if(typeof listaProductos == 'object'){
    //         if(typeof id === 'number' && id <= listaProductos.length && id > 0){
    //             const eliminarProducto = listaProductos.filter((item) => item.id !== idNumber)
    //             if(eliminarProducto.length < listaProductos.lengt){
    //                 fs.writeFileSync(`./${this.fileName}`, JSON.stringify(eliminarProducto))
    //                 return `El producto con ID ${idNumber} fue eliminado`
    //             }
    //             return `El producto con ID ${idNumber} fue borrado`
    //         }else{
    //             return `El producto con ID ${idNumber} no existe`
    //         }
    //     }
    //     else return listaProductos
    // }

    deleteAll() {
        fs.writeFile(`./${this.fileName}`, "", "utf-8", (err) => {
            if (err) {
                console.log("No se pudo actualizar el documento")
            } else {
                console.log("Se borró todo el contenido del documento")

            }
        })
    }

}

const escuadra = {
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
    id: 1
}

const calculadora = {
    title: 'Calculadora',
    price: 234.56,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
    id: 2
}

const globoTerraqueo = {
    title: 'Globo Terráqueo',
    price: 345.67,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
    id: 3
}


//archivo.save(escuadra)
//archivo.save(calculadora)
//archivo.save(globoTerraqueo)
//archivo.getByID(1)
//archivo.getAll()
// archivo.deleteById(2)
//archivo.deleteAll()

module.exports = Contenedor 