import express from "express";
import { getAll, getById, getByAuthorId, create, update, remove } from "../controllers/postsController.js";

const router = express.Router();

// ── Rutas de posts
// /author/:authorId debe ir ANTES de /:id para que Express no lo confunda
router.get("/", getAll);
router.get("/author/:authorId", getByAuthorId);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;


//? ESTE ARCHIVO DEFINE LAS RUTAS RELACIONADAS CON LOS POSTS. INCLUYE RUTAS PARA OBTENER TODOS LOS POSTS, OBTENER UN POST POR ID, OBTENER LOS POSTS DE UN AUTOR POR SU ID, CREAR UN NUEVO POST, ACTUALIZAR UN POST EXISTENTE Y ELIMINAR UN POST. CADA RUTA LLAMA AL CONTROLADOR CORRESPONDIENTE PARA REALIZAR LA OPERACIÓN SOLICITADA. SE EXPORTA EL ROUTER PARA SER USADO EN EL ARCHIVO PRINCIPAL DE LA APLICACIÓN. ES IMPORTANTE NOTAR QUE LA RUTA PARA OBTENER LOS POSTS DE UN AUTOR DEBE DEFINIRSE ANTES DE LA RUTA PARA OBTENER UN POST POR ID, PARA EVITAR CONFLICTOS EN LA RESOLUCIÓN DE RUTAS.