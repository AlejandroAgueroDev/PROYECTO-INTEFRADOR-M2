import { getCommentsByPostId, createComment, deleteComment } from '../services/commentsServices.js';

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
    const { post_id, author_id, content } = req.body;

    if (!post_id) return res.status(400).json({ error: 'post_id es requerido' });
    if (!author_id) return res.status(400).json({ error: 'author_id es requerido' });
    if (!content || !content.trim()) return res.status(400).json({ error: 'content es requerido' });

    const comment = await createComment({ post_id, author_id, content: content.trim() });
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