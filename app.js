// Configura la URL de tu función Netlify real:
const URL_UPDATE = 'https://bibliofaro.netlify.app/.netlify/functions/update-archivo';
const URL_GET = 'https://bibliofaro.netlify.app/.netlify/functions/get-archivo?proyecto=pruebasCosas&archivo=pruebasCosas.json';

// Guardar o modificar registro
const form = document.getElementById('form-guardar');
let registrosActuales = [];
form.onsubmit = async function(e) {
  e.preventDefault();
  const id = document.getElementById('input-id').value.trim();
  const nombre = document.getElementById('input-nombre').value.trim();
  if (!id || !nombre) return;
  // Verificar si el ID ya existe en los registros actuales
  const existe = registrosActuales.some(r => r.id === id && r.activo !== false);
  const body = {
    proyecto: 'pruebasCosas',
    archivo: 'pruebasCosas.json',
    accion: existe ? 'modificar' : 'agregar',
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
  const div = document.getElementById('resultados');
  let data;
  if (resp.ok) {
    try {
      data = await resp.json();
    } catch {
      data = [];
    }
  } else {
    const errorText = await resp.text();
    div.innerHTML = '<span style="color:red">' + errorText + '</span>';
    return;
  }
  registrosActuales = Array.isArray(data) ? data : [];
  if (!Array.isArray(data) || data.length === 0) {
    div.innerHTML = '<em>No hay registros activos.</em>';
    return;
  }
  function escapeJSString(str) {
    return String(str)
      .replace(/\\/g, "\\\\")
      .replace(/'/g, "\\'")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r");
  }
  div.innerHTML = '<table><tr><th>ID</th><th>Nombre</th><th>Acciones</th></tr>' +
    data.map(r => `<tr><td>${r.id}</td><td>${r.nombre}</td><td>
      <button onclick="editarRegistro('${r.id}','${escapeJSString(r.nombre)}')">Editar</button>
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
    archivo: 'pruebasCosas.json',
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
