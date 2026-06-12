import {
  getAllPosts,
  getPostById,
  getPostsByAuthorId,
  createPost,
  updatePost,
  deletePost,
} from "../services/postsServices.js";

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
    const { title, content, author_id, published } = req.body;

    if (!title || !title.trim())
      return res.status(400).json({ error: "title es requerido" });
    if (!content || !content.trim())
      return res.status(400).json({ error: "content es requerido" });
    if (!author_id)
      return res.status(400).json({ error: "author_id es requerido" });

    const post = await createPost({
      title: title.trim(),
      content: content.trim(),
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
    const { title, content, author_id, published } = req.body;

    if (title !== undefined && !title.trim())
      return res.status(400).json({ error: "title no puede estar vacio" });
    if (content !== undefined && !content.trim())
      return res.status(400).json({ error: "content no puede estar vacio" });

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