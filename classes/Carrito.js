import Producto from "../../classes/Producto.js";
export default class Carrito {

    static #carritoItems = []; //  Mi array

    // creación del constructor
    constructor(codigo, imagen, nombre, precio, descripcion, cantidad) {
        this.codigo = codigo;
        this.imagen = imagen;  // Nuevo campo para el link de la foto
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;  // Nuevo campo para la descripción
        this.cantidad = cantidad;
    }

    static { 
        const carrito = JSON.parse(localStorage.getItem("carrito")) || []; 
        carrito.forEach(({codigo, imagen, nombre, precio, descripcion, cantidad}) => {
        this.#carritoItems.push(new Carrito(codigo, imagen, nombre, precio, descripcion, cantidad));
        });
    }


    // Obtener todos los items del carrito //Metodo para despues poder usar en el Index (porque el #items esta como privada)
    static get items() {
        return this.#carritoItems;
    }

    // Agregar un producto al carrito
    static agregarProducto(codigo, imagen, nombre, precio, descripcion, cantidad) {
        // Buscar si el producto ya está en el carrito
        let itemExistente = this.#carritoItems.find(item => item.codigo === producto.codigo);

        if (itemExistente) {
            // Si el producto ya está en el carrito, actualizar la cantidad
            itemExistente.cantidad += cantidad;
        } else {
            // Si no está en el carrito, agregar un nuevo item
            new Carrito(codigo, imagen, nombre, precio, descripcion, cantidad);
        }

        this.#saveCarrito();
    }

    // Eliminar un producto del carrito
    static eliminarProducto(codigoProducto) {
        this.#carritoItems = this.#carritoItems.filter(item => item.codigo !== codigoProducto);
        this.#saveCarrito();
        console.log(this.#carritoItems)
        console.log(codigoProducto)
    }

    // Calcular el total del carrito
    static get total() {
        return this.#carritoItems.reduce((total, item) => total + item.precio * item.cantidad, 0);
    }

    // Guardar el carrito en el localStorage
    static #saveCarrito() {
        window.localStorage.setItem('carrito', JSON.stringify(this.#carritoItems));
    }

    // Limpiar el carrito (vaciarlo completamente)
    static vaciarCarrito() {
        this.#carritoItems = [];
        this.#saveCarrito();
    }

    // Método de actualización en la clase Carrito
    static actualizarCantidad(codigoProducto, cantidad) {
        let item = this.#carritoItems.find(item => item.codigo === codigoProducto);
        if (item) {
            item.cantidad += cantidad;
            if (item.cantidad <= 0) {
                // Eliminar el producto si la cantidad es 0 o menor
                this.eliminarProducto(codigoProducto);
            } else {
                this.#saveCarrito(); // Guardar en localStorage
            }
        }
    };
}