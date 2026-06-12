import express from 'express';
import { getAll, getById, create, update, remove } from '../controllers/authorsController.js';

const router = express.Router();

// ── Rutas de autores──────────────────────────────────────
router.get('/',     getAll);
router.get('/:id',  getById);
router.post('/',    create);
router.put('/:id',  update);
router.delete('/:id', remove);

export default router;

//? ESTE ARCHIVO DEFINE LAS RUTAS RELACIONADAS CON LOS AUTORES. INCLUYE RUTAS PARA OBTENER TODOS LOS AUTORES, OBTENER UN AUTOR POR ID, CREAR UN NUEVO AUTOR, ACTUALIZAR UN AUTOR EXISTENTE Y ELIMINAR UN AUTOR. CADA RUTA LLAMA AL CONTROLADOR CORRESPONDIENTE PARA REALIZAR LA OPERACIÓN SOLICITADA. SE EXPORTA EL ROUTER PARA SER USADO EN EL ARCHIVO PRINCIPAL DE LA APLICACIÓN.