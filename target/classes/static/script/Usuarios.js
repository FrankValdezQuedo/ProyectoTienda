// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarUsuarios();
  $('#tablaUsuarios').DataTable();
});

//LISTAR
async function cargarUsuarios(){
  const request = await fetch('api/usuarios', {
    method: 'GET',
    headers:{
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
               }
  });

  const usuarios = await request.json();
  let listadoHtml = '';

  usuarios.forEach((user) => {
    let usuarioHtml = '<tr>' +
                       '<td>' + user.id + '</td>' +
                       '<td>' + user.usuario + '</td>' +
                       '<td>' + user.contrasena + '</td>' +
                       '<td>' + user.nombre + '</td>' +
                       '<td>' + user.email + '</td>' +
                       '<td><a href="" onclick="eliminarUsuario('+user.id+')" class="btn btn-danger" style="margin-right: 5px;"><i class="fa-solid fa-trash"></i></a><a href="" class="btn btn-warning"><i class="fa-solid fa-pen-to-square"></i></a></td>' +
                     '</tr>';
    listadoHtml += usuarioHtml;
  });

  document.querySelector('#tablaUsuarios tbody').innerHTML = listadoHtml;
}

//REGISTRAR

async function registrarUsuario() {
  // Obtener los valores de los campos
  let nombre = document.getElementById('txtNombre').value;
  let usuario = document.getElementById('txtUsuario').value;
  let email = document.getElementById('txtEmail').value;
  let rol_id = document.getElementById('txtRol').value;
  let contrasena = document.getElementById('txtPassword').value;
  let repetircontra = document.getElementById('txtRepetirPassword').value;

  // Verificar si algún campo está vacío
  if (!nombre || !usuario || !email || !rol_id || !contrasena || !repetircontra) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  // Verificar si las contraseñas coinciden
  if (repetircontra !== contrasena) {
    alert("Las contraseñas no coinciden");
    return;
  }

  // Crear un objeto con los datos del usuario
  let datos = {
    nombre: nombre,
    usuario: usuario,
    email: email,
    rol_id: rol_id,
    contrasena: contrasena
  };

  // Realizar la solicitud de registro
  try {
    const response = await fetch('api/registrar', {
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
      'Content-Type': 'application/json',
      'Authorization':localStorage.token
   }
}


//ELIMINAR

async function eliminarUsuario(id){
if(!confirm('Desea eliminar un usuario?')){
return;
}

  const request = await fetch('api/usuario/'+id, {
    method: 'DELETE',
    headers: getHeaders()
  });
}


