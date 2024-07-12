$(document).ready(function () {
    cargarProductosPorId();
});
// Recuperar los IDs almacenados en localStorage
var idsrecuperados = JSON.parse(localStorage.getItem('ids'));
let cantidad = 1;
let subtotal = 0;

async function cargarProductosPorId() {
    for (let i = 0; i < idsrecuperados.length; i++) {
        const request = await fetch('api/productoId/' + idsrecuperados[i], {
            method: 'GET',
            headers: getHeaders()
        });
        const productos = await request.json();
        console.log("productos: ", productos);
        let listadoHtml = '';
        for (let prod of productos) {
            subtotal = cantidad * prod.precio;
            let productoshtml = '<tr><td>' + prod.id + '</td><td>' + prod.nombre + '</td><td>' + prod.descripcion + '</td><td>' + prod.precio + '</td><td>' + cantidad + '</td><td>' + subtotal + '</td><td><a href="" onclick="eliminarProducto(' + prod.id + ')" class="btn btn-danger" style="margin-right: 5px;"><i class="fa-solid fa-trash"></i></a></td></tr>';
            listadoHtml += productoshtml;
            
        }
        // Actualizar el contenido de la tabla con los productos
        document.querySelector('#tablaProductosid tbody').innerHTML += listadoHtml;
    }
}

function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

function eliminarProducto(id) {
    // Encontrar el índice del número en el array
    var index = idsrecuperados.indexOf(id);
    if (index !== -1) {
        // Utilizar splice para eliminar el número del array
        idsrecuperados.splice(index, 1);
        // Guardar el array actualizado en el localStorage
        localStorage.setItem('ids', JSON.stringify(idsrecuperados));
        console.log("Número eliminado correctamente.");
    } else {
        console.log("El número no está presente en el array de ids.");
    }
}
