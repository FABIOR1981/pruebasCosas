// Código de prueba para invocar la función update-archivo de biblioFaRo desde pruebasCosas

async function guardarEnBiblioFaRo() {
  const url = 'https://TU-SITIO-NETLIFY.netlify.app/.netlify/functions/update-archivo'; // Cambia por tu URL real
  const body = {
    proyecto: 'pruebasCosas',
    archivo: 'pruebas.json',
    datos: { mensaje: '¡Funciona desde pruebasCosas!', fecha: new Date().toISOString() },
    accion: 'update'
  };
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const text = await resp.text();
    console.log('Respuesta de biblioFaRo:', text);
  } catch (e) {
    console.error('Error al guardar en biblioFaRo:', e);
  }
}

guardarEnBiblioFaRo();
