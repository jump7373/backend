const fs = require("fs")
const Contenedor = require ("./classItem")
const productList = new Contenedor("./tienda.json")


class Carrito {
    constructor(file) {
        this.file = file;
        this.cart = []
    }

    fileExists = async () => fs.existsSync(this.file)

    readFile = async () => JSON.parse(await fs.promises.readFile(this.file, "utf-8"));

    setCart = async () => (this.cart = await this.readFile())

    findID = (id) => this.cart.findIndex((item) => item.id == id);

    findProductIndex = (cartId, productId) => {
        let cartIndex = this.findID(cartId)
        let productIndex = this.cart[cartIndex].products.findIndex((item) => item.id == productId)
        return productIndex;
    }

    createCart = async () => {
                
        if (await this.fileExists()) {     
            
            try {
                
                let nuevoCarrito = {
                    id: this.cart.length !== 0 ? this.cart[this.cart.length - 1].id + 1 : 1,
                    products: [] 
                }

                this.cart.push(nuevoCarrito);
                await fs.promises.writeFile(this.file, JSON.stringify(this.cart), `utf-8`);
                return { cartId: nuevoCarrito.id }
            } catch (err) {
                console.log("Error: " + err)
                return { error: "Carrito no creado" }
            }
        } else console.log("No se encuentra el archivo")
    }

    getProducts = async (cartId) => {
        if (await this.fileExists()) {
            try {
                let cart = this.cart.find((item) => item.id == cartId)
                if (cart) {
                    return cart.products;
                } else {
                    return { error: "No existen los productos" }
                }
            } catch (err) {
                console.log("Error: " + err)
                return { error: "Error al obtener los productos" }
            }
        } else {
            console.log("No se encuentra el archivo")
        }
    }

    get = async (cartId) => {
        if (await this.fileExists()) {
            try {
                let cart = this.cart.find((item) => item.id == cartId)
                if (cart) {
                    return cart
                } else {
                    return { error: "Carrito no encontrado" }
                }
            } catch (err) {
                console.log("Error: " + err)
                return { error: "Error al obtener los productos" }
            }

        } else {
            console.log("No se encuentra el archivo")
        }
    }

    addProduct = async(cartId, productId) => {
        
         
        if(await this.fileExists()){

            try{
                const newProduct = await productList.getById(productId);
                let indexUpdate = this.findID(cartId)
                if(indexUpdate >= 0 && newProduct.id ) {
                    this.cart[indexUpdate].products.push(newProduct)
                    await fs.promises.writeFile(this.file, JSON.stringify(this.cart))
                    return true;
                }else{
                    return {error: "El producto o el carrito no existes"}
                }
            }catch(err){
                console.log("Error: " + err)
                return{error: "Producto no agregado"}
            }
        }else{
            console.log("No se encuentra el archivo")
        }

    }

    deleteProduct = async (cartId, productId) =>{
        if (await this.fileExists()){
            try{
                let cartIndex = this.findID(cartId)
                let productIndex = this.findProductIndex(cartId, productId)
                if(cartIndex >= 0 && productIndex >= 0){
                    this.cart[cartIndex].products.splice(productIndex, 1)
                    await fs.promises.writeFile(this.file, JSON.stringify(this.cart))
                    return true;

                }else{
                    return {error: "El producto o el carrito no existen."}
                }
            }catch(err){
                console.log("Error: " + err)
                return {error: "No se pudo borrar el producto"}
            }
        }else{
            console.log("No se encuentra el archivo")
        }
    }

    deleteCart = async (cartId) => {
        if(await this.fileExists()) {
            try{
                let cartIndex = this.findID(cartId)
                if(cartIndex >= 0){
                    this.cart[cartIndex].products = []
                    await fs.promises.writeFile(this.file, JSON.stringify(this.cart))
                    return true
                }else{
                    return {error: "El carrito no existe."}
                }
            }catch(err){
                console.log("Error: " + err)
                return {error: "El carrito no se pudo vaciar."}
            }
        }else{
            console.log("No se encuentra el archivo")
        }
    }
}

module.exports = Carrito