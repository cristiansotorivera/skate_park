import { Router } from "express"; // Importamos Router de express
import { 
    login_get, login_post, registrar_post, registrar_get, getAdmin, getUser, 
    getAllSkaters, nuevoEstado, getUserToken, deleteUser, updateSkater 
} from "../controllers/skatersController.js"; // Importamos los controladores
import { verifyToken, verifyAdmin } from "../middlewares/jwt.middlware.js"; // Importamos los middlewares

const router = Router(); // Creamos una instancia del router

// Ruta para obtener todos los skaters
router.get('/', getAllSkaters);

// Ruta para mostrar la página de login
router.get('/login', login_get);

// Ruta para manejar el envío del formulario de login
router.post('/login', login_post);

// Ruta para mostrar la página de registro
router.get('/registrar', registrar_get);

// Ruta para manejar el envío del formulario de registro
router.post('/registrar', registrar_post);

// Ruta para obtener los datos del administrador
router.get('/admin', getAdmin);

// Ruta para obtener los datos de un usuario
router.get('/datos', getUser);

// Ruta para obtener los datos de un usuario autenticado mediante token
router.get('/datosUser', verifyToken, getUserToken);

// Ruta para actualizar el estado de un skater
router.post('/estado', nuevoEstado);

// Ruta para eliminar un usuario
router.delete('/datos', deleteUser);

// Ruta para actualizar los datos de un skater
router.put('/update', updateSkater);

export default router; // Exportamos el router
