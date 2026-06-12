import express from 'express';
import { login } from '../controllers/authController.js';

const router = express.Router();

// POST /auth/login
router.post('/login', login);

export default router;

//? ESTE ARCHIVO DEFINE LAS RUTAS RELACIONADAS CON LA AUTENTICACIÓN. EN ESTE CASO, SOLO HAY UNA RUTA PARA INICIAR SESIÓN (POST /auth/login) QUE LLAMA AL CONTROLADOR DE LOGIN. SE EXPORTA EL ROUTER PARA SER USADO EN EL ARCHIVO PRINCIPAL DE LA APLICACIÓN.