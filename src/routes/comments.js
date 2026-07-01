import express from "express";
import {
  getByPostId,
  create,
  remove,
} from "../controllers/commentsController.js";

const router = express.Router();

// ── Rutas de comentarios
router.get("/post/:postId", getByPostId);
router.post("/", create);
router.delete("/:id", remove);

export default router;

//? ESTE ARCHIVO DEFINE LAS RUTAS RELACIONADAS CON LOS COMENTARIOS. INCLUYE RUTAS PARA OBTENER LOS COMENTARIOS DE UN POST POR SU ID, CREAR UN NUEVO COMENTARIO Y ELIMINAR UN COMENTARIO EXISTENTE. CADA RUTA LLAMA AL CONTROLADOR CORRESPONDIENTE PARA REALIZAR LA OPERACIÓN SOLICITADA. SE EXPORTA EL ROUTER PARA SER USADO EN EL ARCHIVO PRINCIPAL DE LA APLICACIÓN.
