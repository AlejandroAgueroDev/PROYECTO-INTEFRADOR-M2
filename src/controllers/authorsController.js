import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../services/authorsServices.js";

const getAll = async (req, res, next) => {
  try {
    const authors = await getAllAuthors();
    res.json(authors);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const author = await getAuthorById(req.params.id);
    if (!author) return res.status(404).json({ error: "Author not found" });
    res.json(author);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;

    if (!name || !name.trim())
      return res.status(400).json({ error: "nombre es requerido" });
    if (!email || !email.trim())
      return res.status(400).json({ error: "email es requerido" });

    const author = await createAuthor({
      name: name.trim(),
      email: email.trim(),
      bio,
    });
    res.status(201).json(author);
  } catch (err) {
    if (err.code === "23505")
      return res.status(400).json({ error: "Email ya esta en uso" });
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;

    if (name !== undefined && !name.trim())
      return res.status(400).json({ error: "El nombre no puede estar vacio" });
    if (email !== undefined && !email.trim())
      return res.status(400).json({ error: "El email no puede estar vacio" });

    const author = await updateAuthor(req.params.id, {
      name,
      email,
      bio,
    });
    if (!author) return res.status(404).json({ error: "Autor no encontrado" });
    res.json(author);
  } catch (err) {
    if (err.code === "23505")
      return res.status(400).json({ error: "Email ya esta en uso" });
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const deleted = await deleteAuthor(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Autor no encontrado" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export { getAll, getById, create, update, remove };

//? ESTE CONTROLADOR SE ENCARGA DE RECIBIR LAS SOLICITUDES RELACIONADAS CON LOS AUTORES, VALIDAR LOS DATOS Y LLAMAR A LOS SERVICIOS CORRESPONDIENTES PARA REALIZAR LAS OPERACIONES DE CREACIÓN, LECTURA, ACTUALIZACIÓN Y ELIMINACIÓN DE AUTORES. SI LOS DATOS SON INVÁLIDOS O EL AUTOR NO EXISTE, RESPONDE CON LOS CÓDIGOS DE ERROR CORRESPONDIENTES.