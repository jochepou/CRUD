export default class Producto {

    static #items = [];

    static {
        let producto = window.localStorage.getItem('producto')
        if (producto) {
            this.#items = JSON.parse(producto).map(item => new this(item.codigo, item.imagen, item.nombre, item.precio, item.descripcion))
        }
    }

    //Metodo para despues poder usar en el Index (porque el #items esta como privada)
    static get allItems() {
        return this.#items
    }

    // creación del constructor
    constructor(codigo, imagen, nombre, precio, descripcion) {
        this.codigo = codigo;
        this.imagen = imagen;  // Nuevo campo para el link de la foto
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;  // Nuevo campo para la descripción
        

        console.log(`Codigo: ${this.codigo}, Nombre: ${this.nombre}, Precio: ${this.precio}`);
    }

    // creación método estático 
    static crear(codigo, imagen, nombre, precio, descripcion) {
        let producto = new Producto(codigo, imagen, nombre, precio, descripcion);
        Producto.#items.push(producto);
        this.#saveItems()

        return producto
    }

    static #saveItems(){
        window.localStorage.setItem('producto', JSON.stringify(this.#items))
    }

    static guardarProductos() {
        this.#saveItems();
    }


    static eliminar(codigoProducto){
        this.#items = this.#items.filter(product => product.codigo!== codigoProducto)
        this.#saveItems()
    }

    // Funcion Eliminar

    static obtenerProducto(codigo) {
        return this.#items.find(product => product.codigo === codigo);
    }
}
