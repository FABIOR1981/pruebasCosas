// Configuración global para pruebasCosas
const CONFIG = {
  PROYECTO: 'pruebasCosas',
  ARCHIVO: 'pruebasCosas.json',
  URL_BASE_API: 'https://bibliofaro.netlify.app/.netlify/functions/',
  URL_UPDATE: 'https://bibliofaro.netlify.app/.netlify/functions/update-archivo',
  URL_GET: 'https://bibliofaro.netlify.app/.netlify/functions/get-archivo?proyecto=pruebasCosas&archivo=pruebasCosas.json',
  ACCIONES: {
    AGREGAR: 'agregar',
    MODIFICAR: 'modificar',
    ELIMINAR: 'eliminar'
  },
  CAMPOS: ['id', 'nombre'],
  MENSAJES: {
    EXITO: 'Operación realizada correctamente.',
    ERROR: 'Ocurrió un error. Intente nuevamente.'
  },
  DEBUG: false,
  TIMEOUT: 10000 // ms
};
