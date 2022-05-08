const ClassItem = require ("../classItem")
const productos = new ClassItem("./tienda.json")


const getForm = (res, url) => res.sendFile(url, {root: '.'});

const saveProductSocket = object => {
    productos.save(object).then(res => console.log(res))
}

module.exports = {getForm, saveProductSocket}