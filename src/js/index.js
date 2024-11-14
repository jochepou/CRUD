import Producto from "../../classes/Producto.js";

function updateProductos() {
    const tablaProductosBody = document.querySelector("#tablaProductos tbody");
    tablaProductosBody.innerHTML = ""

    Producto.allItems.forEach(prod => {
        tablaProductosBody.innerHTML += `
            <tr id="${prod.codigo}">
                <td>${prod.codigo} </td>
                <td><img src="${prod.imagen}" alt="${prod.nombre}" width="50"></td>
                <td>${prod.nombre}</td>
                <td>${prod.precio}</td>
                <td>${prod.descripcion}</td>

                <td width="150">
                    <button data-id="${prod.codigo}" class="eliminar">Eliminar</button>
                    <button data-id="${prod.codigo}" class="editar">Editar</button>
                </td>

            </tr>
        `;
    });
};

// Llama a la función para mostrar los usuarios cuando se carga la página
updateProductos()

// Agregar una variable para el modo de edición
let editMode = false;
let codigoProductoEnEdicion = null;

// Evento para agregar un nuevo producto al hacer clic en el botón "Agregar Producto"
document.getElementById("guardar").addEventListener("click", () => {
    // Completa el formulario con la información del usuario seleccionado
    let codigo = document.getElementById("codigo").value.trim();
    let imagen = document.getElementById("imagen").value.trim();
    let nombre = document.getElementById("nombre").value.trim();
    let precio = document.getElementById("precio").value.trim();
    let descripcion = document.getElementById("descripcion").value.trim();
    
    // Se gestiona distinto el evento de "Guardar" y "Editar"
    if (editMode) {
        // Si estamos en modo edición, actualizamos el producto existente
        let producto = Producto.obtenerProducto(codigoProductoEnEdicion);
        producto.codigo = codigo;
        producto.imagen = imagen;
        producto.nombre = nombre;
        producto.precio = precio;
        producto.descripcion = descripcion;

        Producto.guardarProductos();
        
        // Cambiar el botón de nuevo a "Agregar producto"
        document.getElementById("guardar").innerText = "Agregar producto";
        editMode = false;
        codigoProductoEnEdicion = null;
    } else {
        // Si no estamos en modo edición, creamos un nuevo producto
        Producto.crear(codigo, imagen, nombre, precio, descripcion);
    }

    // Limpiar el formulario
    document.getElementById("formulario").reset();

    updateProductos();
});


// Evento para gestionar las acciones de "Eliminar" y "Editar"
document.getElementById("tablaProductos").addEventListener("click", (event) => {
    
    if (event.target.className === "eliminar") {
        // Identificar usuario
        let codigoProducto = event.target.dataset.id;
        console.log("Producto elegido: ", codigoProducto)


        // TODO: Eliminar del array
        Producto.eliminar(codigoProducto);

        // Volver a renderizar tabla
        updateProductos();

    }
    if (event.target.className === "editar") {
        let codigoProducto = event.target.dataset.id;
        let productoAEditar = Producto.obtenerProducto(codigoProducto);
        
        // Llenar el formulario con la información del producto
        document.getElementById("codigo").value = productoAEditar.codigo;
        document.getElementById("imagen").value = productoAEditar.imagen;
        document.getElementById("nombre").value = productoAEditar.nombre;
        document.getElementById("precio").value = productoAEditar.precio;
        document.getElementById("descripcion").value = productoAEditar.descripcion;
 
        // Cambiar a modo edición
        document.getElementById("guardar").innerText = "Guardar cambios";
        editMode = true;
        codigoProductoEnEdicion = codigoProducto;
    }
});
