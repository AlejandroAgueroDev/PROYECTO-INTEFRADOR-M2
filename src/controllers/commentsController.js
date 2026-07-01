import { getCommentsByPostId, createComment, deleteComment } from '../services/commentsServices.js';
import { commentCreateSchema, parseWithSchema } from '../utils/validation.js';

const getByPostId = async (req, res, next) => {
  try {
    const comments = await getCommentsByPostId(req.params.postId);
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const parsed = parseWithSchema(commentCreateSchema, req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error });
    }

    const { post_id, author_id, content } = parsed.data;

    const comment = await createComment({ post_id, author_id, content });
    res.status(201).json(comment);
  } catch (err) {
    if (err.code === '23503') return res.status(400).json({ error: 'post_id o author_id no existen' });
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const deleted = await deleteComment(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Comentario no encontrado' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export { getByPostId, create, remove };

//? ESTE CONTROLADOR SE ENCARGA DE RECIBIR LAS SOLICITUDES RELACIONADAS CON LOS COMENTARIOS, VALIDAR LOS DATOS Y LLAMAR A LOS SERVICIOS CORRESPONDIENTES PARA REALIZAR LAS OPERACIONES DE CREACIÓN, LECTURA Y ELIMINACIÓN DE COMENTARIOS. SI LOS DATOS SON INVÁLIDOS O EL COMENTARIO NO EXISTE, RESPONDE CON LOS CÓDIGOS DE ERROR CORRESPONDIENTES.