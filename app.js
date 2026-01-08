// Configura la URL de tu función Netlify real:
const URL_UPDATE = 'https://bibliofaro.netlify.app/.netlify/functions/update-archivo';
const URL_GET = 'https://bibliofaro.netlify.app/.netlify/functions/get-archivo?proyecto=pruebasCosas&archivo=pruebasCosas.json';

// Guardar registro
const form = document.getElementById('form-guardar');
form.onsubmit = async function(e) {
  e.preventDefault();
  const id = document.getElementById('input-id').value.trim();
  const nombre = document.getElementById('input-nombre').value.trim();
  if (!id || !nombre) return;
  const body = {
    proyecto: 'pruebasCosas',
    archivo: 'pruebas.json',
    accion: 'agregar',
    id,
    datos: { nombre }
  };
  const resp = await fetch(URL_UPDATE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  alert(await resp.text());
  form.reset();
  cargarRegistros();
};

// Leer registros activos y renderizar con acciones
const btnCargar = document.getElementById('btn-cargar');
btnCargar.onclick = cargarRegistros;

async function cargarRegistros() {
  const resp = await fetch(URL_GET);
  let data;
  try {
    data = await resp.json();
  } catch {
    data = { error: await resp.text() };
  }
  const div = document.getElementById('resultados');
  if (data.error) {
    div.innerHTML = '<span style="color:red">' + data.error + '</span>';
    return;
  }
  if (!Array.isArray(data) || data.length === 0) {
    div.innerHTML = '<em>No hay registros activos.</em>';
    return;
  }
  div.innerHTML = '<table><tr><th>ID</th><th>Nombre</th><th>Acciones</th></tr>' +
    data.map(r => `<tr><td>${r.id}</td><td>${r.nombre}</td><td>
      <button onclick="editarRegistro('${r.id}','${r.nombre.replace(/'/g, "\'")}")">Editar</button>
      <button onclick="eliminarRegistro('${r.id}')">Eliminar</button>
    </td></tr>`).join('') + '</table>';
}

window.editarRegistro = function(id, nombre) {
  document.getElementById('input-id').value = id;
  document.getElementById('input-nombre').value = nombre;
};

window.eliminarRegistro = async function(id) {
  if (!confirm('¿Eliminar este registro?')) return;
  const body = {
    proyecto: 'pruebasCosas',
    archivo: 'pruebas.json',
    accion: 'eliminar',
    id,
    datos: {}
  };
  const resp = await fetch(URL_UPDATE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  alert(await resp.text());
  cargarRegistros();
};

// Cargar registros al inicio
cargarRegistros();
