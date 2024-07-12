$(document).ready(function() {
  cargarProductos();
  $('#tablaProductos').DataTable();
});

async function cargarProductos(){
  const request = await fetch('api/productos', {
    method: 'GET',
    headers: getHeaders()
  });

  const productos = await request.json();
  let listadoHtml = '';

for(let prod of productos){
// Creamos un elemento <img> y lo configuramos con la URL de la imagen
  let imagen = '<img src="' + prod.imagen_url + '" alt="Producto" style="max-width: 50px; max-height: 50px;">';
  let productoshtml =' <tr><td>'+prod.id+'</td><td>'+prod.nombre+
  '</td><td>'+prod.descripcion+'</td><td>'+prod.precio+'</td><td>'+prod.stock+
  '</td><td>'+prod.categoria+'</td><td>'+imagen+'</td></td><td><a href="" onclick="eliminarProducto('+prod.id+')" class="btn btn-danger" style="margin-right: 5px;"><i class="fa-solid fa-trash"></i></a><a href="" class="btn btn-warning"><i class="fa-solid fa-pen-to-square"></i></a></td></tr>';

  listadoHtml+= productoshtml;
  }

  document.querySelector('#tablaProductos tbody').innerHTML = listadoHtml;
}

//AGREGAR

async function registrarProducto() {
  // Obtener los valores de los campos
  let nombre = document.getElementById('txtNombre').value;
  let descripcion = document.getElementById('txtDescripcion').value;
  let precio = document.getElementById('txtPrecio').value;
  let stock = document.getElementById('txtStock').value;
  let categoria = document.getElementById('txtCategoria').value;
  let imagen_url = document.getElementById('urlimagen').value;

  // Verificar si algún campo está vacío
  if (!nombre || !descripcion || !precio || !stock || !categoria || !imagen_url) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  // Crear un objeto con los datos del usuario
  let datos = {
    nombre: nombre,
    descripcion: descripcion,
    precio: precio,
    stock: stock,
    categoria: categoria,
    imagen_url: imagen_url
  };

  // Realizar la solicitud de registro
  try {
    const response = await fetch('api/registrarproducto', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });

    // Verificar si la solicitud fue exitosa
    if (response.ok) {
      alert("La cuenta fue creada con éxito.");
      window.location.href = 'index.html';
    } else {
      alert("Ocurrió un error al crear la cuenta. Por favor, inténtelo de nuevo.");
    }
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    alert("Ocurrió un error al crear la cuenta. Por favor, inténtelo de nuevo.");
  }
}


function getHeaders(){
return {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
   }
}

async function eliminarProducto(id){
if(!confirm('Desea eliminar un producto?')){
return;
}
  const request = await fetch('api/producto/'+id, {
    method: 'DELETE',
    headers: getHeaders()
  });
}

