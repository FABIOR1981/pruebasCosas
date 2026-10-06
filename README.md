# pruebasCosas

Proyecto de prueba para usar **biblioFaRo**, un servicio propio de almacenamiento de archivos JSON publicado como Netlify Functions en `bibliofaro.netlify.app`.

Sirve como ejemplo mínimo de cómo otra aplicación puede leer y guardar datos en biblioFaRo sin tener su propio backend.

## Qué hace

- Formulario simple para **guardar o modificar registros**, identificados por ID.
- Botón **Cargar registros** que lee los datos guardados y los muestra en una lista con acciones.

## Cómo funciona

- `config.js` define las direcciones de biblioFaRo:
  - `get-archivo?proyecto=pruebasCosas&archivo=pruebasCosas.json` para leer;
  - `update-archivo` para guardar.
- `app.js` usa esas direcciones para leer los registros, verificar si un ID ya existe y guardar los cambios.

Para usar el mismo patrón en otro proyecto, copiá `config.js` y cambiá el nombre del proyecto y del archivo.

## Ejecutar localmente

No necesita instalación. Abrí `index.html` en el navegador. Necesita conexión, porque los datos están en biblioFaRo.

## Estructura

```
index.html    Página de prueba
config.js     Direcciones de biblioFaRo
app.js        Lectura y guardado de registros
estilos.css   Estilos
```
