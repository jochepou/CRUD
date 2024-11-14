import Producto from "../../classes/Producto.js";

// Seleccionar contenedor de productos
const productosContainer = document.getElementById("productosContainer");
const cartCount = document.getElementById("itemCountDisplay");

// Contador de artículos en el carrito
let itemCount = 0;

// Cargar el carrito desde `localStorage`, o inicializarlo vacío si no hay datos
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Crear una tarjeta para cada producto y agregarla al contenedor
Producto.allItems.forEach(prod => {
    // Crear el elemento de la tarjeta del producto
    const productCard = document.createElement('div');
    productCard.classList.add("m-4");

    // Insertar contenido en la tarjeta
    productCard.innerHTML += `
        <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3">
           <div class="col-span-1">
                <img src="${prod.imagen}" width="140" alt="Imagen del producto">
                <h2 class="text-lg font-bold">${prod.nombre}</h2>
                <p class="text-2xl font-semibold">$${prod.precio}</p>
                <button data-id="${prod.codigo}" class="añadir mt-auto focus:outline-none text-dark bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-500 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Añadir al carrito</button>
           </div>
        </div>
    `;

    // Agregar la tarjeta al contenedor de productos
    productosContainer.appendChild(productCard);

    // Seleccionar el botón recién creado y añadir el evento
    const button = productCard.querySelector("button.añadir");
    button.addEventListener("click", (e) => {
        const codigoProducto = e.target.getAttribute("data-id");
        agregarAlCarrito(codigoProducto);
    });
});

//https://componentland.com/component/product-card-2

// Función para agregar un producto al carrito
function agregarAlCarrito(codigoProducto) {
    let producto = Producto.allItems.find(prod => prod.codigo === codigoProducto);
    if (producto) {
        // Buscar el producto en el carrito
        const productoExistente = carrito.find(item => item.codigo === codigoProducto);

        if (productoExistente) {
            // Si el producto ya está en el carrito, aumentamos su cantidad
            productoExistente.cantidad += 1;
        } else {
            // Si no está en el carrito, lo agregamos con cantidad 1
            carrito.push({ ...producto, cantidad: 1 });
        }

        actualizarContadorYStorage(); // Actualizamos el contador y guardamos el carrito
    }
}

// Llamada inicial para mostrar el carrito guardado
actualizarContadorYStorage();

// Función para actualizar el contador y guardar el carrito en `localStorage`
function actualizarContadorYStorage() {
    // Calcula el número total de productos en el carrito
    const itemCount = carrito.reduce((total, prod) => total + prod.cantidad, 0);

    // Actualiza la visualización del contador
    if (cartCount) {
        cartCount.textContent = itemCount;
    }

    // Guarda el carrito actualizado en `localStorage`
    localStorage.setItem("carrito", JSON.stringify(carrito));
}





