import Carrito from "../../classes/Carrito.js";

    // Inicializar el carrito desde localStorage
    //let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Llamada inicial para mostrar el carrito guardado
mostrarContenidoDelCarrito();

// Función para mostrar el contenido del carrito
function mostrarContenidoDelCarrito() {
    let carritoDiv = document.getElementById('carrito');
    carritoDiv.innerHTML = ''; // Limpiar contenido anterior

    let items = Carrito.items; // Obtener los elementos del carrito
    if (items.length === 0) {
        carritoDiv.innerHTML = '<p>Tu carrito está vacío.</p>';
        return;
    }

    let total = 0;
    items.forEach(item => {
        let itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <div class="bg-white shadow">
                <div class="px-4 py-6 sm:px-8 sm:py-10">
                    <div class="flow-root">
                        <ul class="-my-8">
                            <li class="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                                <div class="shrink-0">
                                <img class="h-24 w-24 max-w-full rounded-lg object-cover" src="${item.imagen}" alt="${item.nombre}"/>
                                </div>

                                <div class="relative flex flex-1 flex-col justify-between">
                                <div class="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                    <div class="pr-8 sm:pr-5">
                                    <p class="text-base font-semibold text-gray-900">${item.nombre}</p>
                                    <p class="mx-0 mt-1 mb-0 text-sm text-gray-400">${item.descripcion}</p>
                                    <p class="mx-0 mt-1 mb-0 text-sm text-gray-400">P. unitario $${item.precio}</p>
                                    </div>

                                    <div class="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                    <p class="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">$${item.precio*item.cantidad}</p>

                                    <div class="sm:order-1">
                                        <div class="mx-auto flex h-8 items-stretch text-gray-600">
                                        <button data-id="${item.codigo}" class="decrementar-cantidad flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">-</button>
                                        <div class="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">${item.cantidad}</div>
                                        <button data-id="${item.codigo}" class="incrementar-cantidad flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">+</button>
                                        </div>
                                    </div>
                                    </div>
                                </div>

                                <div class="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                                    <button type="button" data-id="${item.codigo}" class="eliminar flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" class=""></path>
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div> 
                </div>
            </div>   
        `;
        carritoDiv.appendChild(itemDiv);
        total += item.precio * item.cantidad;
    });

    // Asignar eventos para botones de incremento y decremento
    document.querySelectorAll('.incrementar-cantidad').forEach(button => {
        button.addEventListener('click', (e) => {
            const codigoProducto = e.currentTarget.getAttribute('data-id');
            Carrito.actualizarCantidad(codigoProducto, 1); // Incrementar en 1
            mostrarContenidoDelCarrito(); // Actualizar la vista
        });
    });

    document.querySelectorAll('.decrementar-cantidad').forEach(button => {
        button.addEventListener('click', (e) => {
            const codigoProducto = e.currentTarget.getAttribute('data-id');
            Carrito.actualizarCantidad(codigoProducto, -1); // Decrementar en 1
            mostrarContenidoDelCarrito(); // Actualizar la vista
        });
    });

    document.querySelectorAll('.eliminar').forEach(button => {
        button.addEventListener('click', (e) => {
            const codigoProducto = e.currentTarget.getAttribute('data-id');
            Carrito.eliminarProducto(codigoProducto);
            mostrarContenidoDelCarrito();
        });
    });

    // Añadir el total
    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<p>Total: $${total}</p>`;
    carritoDiv.appendChild(totalDiv);
}

document.getElementById("limpiar-carrito").addEventListener("click", () => {
    localStorage.removeItem("carrito"); // O usa localStorage.clear() si quieres eliminar todo
    Carrito.vaciarCarrito(); // Esto vacía el carrito en la clase
    mostrarContenidoDelCarrito(); // Actualiza la vista del carrito en la interfaz
});



// https://componentland.com/component/boxed-shopping-cart-2
