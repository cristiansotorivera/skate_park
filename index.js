import express from 'express' // Importamos express
import { engine } from 'express-handlebars'; // Importamos el motor de plantillas handlebars
import dotenv from 'dotenv/config' // Importamos dotenv para las variables de entorno
import fileUpload from 'express-fileupload'; // Importamos el middleware para subir archivos

import routerUser from './router/skaters.Router.js'; // Importamos el enrutador de skaters

const app = express(); // Creamos una instancia de la aplicación express

const __dirname = import.meta.dirname; // Obtenemos el directorio actual (esto funciona con ES Modules)

// Middleware para servir archivos estáticos desde el directorio 'public'
app.use(express.static('public'));

// Middleware para parsear JSON
app.use(express.json());

// Middleware para parsear datos de formularios
app.use(express.urlencoded({ extended: true }));

// Middleware para manejar la subida de archivos
app.use(
  fileUpload({
    limits: { fileSize: 6000000 }, // Límite de tamaño del archivo en bytes
    abortOnLimit: true, // Abortamos la subida si el archivo excede el límite
    responseOnLimit: "Imagen demasiado grande, prueba con una de menor tamaño", // Mensaje de respuesta si el archivo es demasiado grande
  })
);

// Middleware para manejar las rutas de skaters
app.use('/', routerUser);

// Configuración del motor de plantillas handlebars
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views'); // Establecemos el directorio de vistas

// Obtenemos el puerto desde las variables de entorno
const PORT = process.env.PORT;

// Iniciamos el servidor en el puerto especificado
app.listen(PORT, () => console.log('running on port ' + PORT));
