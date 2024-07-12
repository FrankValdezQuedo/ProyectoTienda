$(document).ready(function() {
  cargarProductoshtml();
  document.getElementById("cantidad").textContent = ids.length;
});

// Inicializar el arreglo 'ids' desde el almacenamiento local, si existe
var ids = JSON.parse(localStorage.getItem('ids')) || [];

async function cargarProductoshtml() {
  const request = await fetch('api/productos', {
    method: 'GET',
    headers: getHeaders()
  });

  const productos = await request.json();
  let listadoHtml = '<div class="container mt-4"><div class="row">';

  for (let i = 0; i < productos.length; i++) {
    listadoHtml += `
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <label>${productos[i].nombre}</label>
          </div>
          <div class="card-body">
            <i>$${productos[i].precio}</i>
            <img src="${productos[i].imagen_url}" width="200" height="180">
          </div>
          <div class="card-footer text-center">
            <label>${productos[i].descripcion}</label>
            <div>
              <a href="#" onclick="carrito(${productos[i].id})" class="btn btn-outline-info">Agregar</a>
              <a href="#" class="btn btn-danger">Comprar</a>
            </div>
          </div>
        </div>
      </div>`;

    if ((i + 1) % 3 === 0 && i !== productos.length - 1) {
      listadoHtml += `</div><div class="row">`;
    }
  }

  listadoHtml += `</div></div>`;
  document.querySelector('#container').innerHTML = listadoHtml;
}


function getHeaders(){
return {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
   }
}

function carrito(id) {
    ids.push(id);
    console.log(ids);
    document.getElementById("cantidad").textContent = ids.length;

    // Guardar el arreglo 'ids' en el almacenamiento local
    localStorage.setItem('ids', JSON.stringify(ids));
}