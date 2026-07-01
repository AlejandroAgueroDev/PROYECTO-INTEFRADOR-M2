import {
  getAllPosts,
  getPostById,
  getPostsByAuthorId,
  createPost,
  updatePost,
  deletePost,
} from "../services/postsServices.js";
import { postCreateSchema, postUpdateSchema, parseWithSchema } from "../utils/validation.js";

const getAll = async (req, res, next) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const post = await getPostById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post no encontrado" });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

const getByAuthorId = async (req, res, next) => {
  try {
    const posts = await getPostsByAuthorId(req.params.authorId);
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const parsed = parseWithSchema(postCreateSchema, req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error });
    }

    const { title, content, author_id, published } = parsed.data;

    const post = await createPost({
      title,
      content,
      author_id,
      published,
    });
    res.status(201).json(post);
  } catch (err) {
    if (err.code === "23503")
      return res.status(400).json({ error: "author_id no existe" });
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const parsed = parseWithSchema(postUpdateSchema, req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error });
    }

    const { title, content, author_id, published } = parsed.data;

    const post = await updatePost(req.params.id, {
      title,
      content,
      author_id,
      published,
    });
    if (!post) return res.status(404).json({ error: "Post no encontrado" });
    res.json(post);
  } catch (err) {
    if (err.code === "23503")
      return res.status(400).json({ error: "author_id no existe" });
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const deleted = await deletePost(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Post no encontrado" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export { getAll, getById, getByAuthorId, create, update, remove };

//? ESTE CONTROLADOR SE ENCARGA DE RECIBIR LAS SOLICITUDES RELACIONADAS CON LOS POSTS, VALIDAR LOS DATOS Y LLAMAR A LOS SERVICIOS CORRESPONDIENTES PARA REALIZAR LAS OPERACIONES DE CREACIÓN, LECTURA, ACTUALIZACIÓN Y ELIMINACIÓN DE POSTS. SI LOS DATOS SON INVÁLIDOS O EL POST NO EXISTE, RESPONDE CON LOS CÓDIGOS DE ERROR CORRESPONDIENTES.