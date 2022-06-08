export const Products_controller_memory = class Products_container {
	constructor() {
		this.products = [];
	}

	// RECIBE UN id Y ENCUENTRA EL indice DEL PRODUCTO
	findIndex = (id) => this.products.findIndex((product) => product.id == id);

	// RECIBE UN OBJETO CON title, price y thumbnail Y LO GUARDA
	save = async ({ title, price, thumbnail, description, stock }) => {
		try {
			let lastId, newId, new_product;
			lastId = !this.products.length ? 0 : this.products[this.products.length - 1].id;
			newId = lastId + 1;
			new_product = { title, price, thumbnail, id: newId, description, stock };
			this.products.push(new_product);
			return true;
		} catch (err) {
			console.log("Error ", err);
			return { error: "Product not saved" };
		}
	};

	// RETORNA TODOS LOS PRODUCTOS
	getAll = async () => {
		try {
			return this.products;
		} catch (err) {
			console.log("Error ", err);
		}
	};

	// RECIBE UN ID Y RETORNA EL PRODUCTO
	getById = async (id) => {
		try {
			let product = this.products.find((product) => product.id == id);
			if (product) return product;
			else return { error: "Product not found." };
		} catch (err) {
			console.log("Error ", err);
			return { error: "Error getting product." };
		}
	};

	// RECIBE UN id POR params y UN OBJETO CON title, price y thumbnail Y ACTUALIZA EL PRODUCTO.
	updateById = async (id, { title, price, thumbnail, description, stock }) => {
		try {
			let index_to_update = this.findIndex(id);
			if (index_to_update >= 0) {
				const new_product = { id: +id, title, price, thumbnail, description, stock };
				this.products[index_to_update] = new_product;

				return true;
			} else return { error: "Product not found." };
		} catch (err) {
			console.log("Error ", err);
			return { error: "Product not updated." };
		}
	};

	// RECIBE UN id POR params Y ELIMINA EL PRODUCTO
	deleteById = async (id) => {
		try {
			let index_to_delete = this.findIndex(id);
			if (index_to_delete >= 0) {
				this.products.splice(index_to_delete, 1);
				return true;
			} else return { error: "Product not found." };
		} catch (err) {
			console.log("Error ", err);
			return { error: "Product not deleted." };
		}
	};
};
