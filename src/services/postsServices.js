import pool from "../db/connection.js";

const getAllPosts = async () => {
  const { rows } = await pool.query(
    `SELECT p.id, p.title, p.content, p.published, p.created_at,
            p.author_id,
            a.name AS author_name, a.email AS author_email
     FROM posts p
     JOIN authors a ON p.author_id = a.id
     ORDER BY p.created_at DESC`,
  );
  return rows;
};

const getPostById = async (id) => {
  const { rows } = await pool.query(
    `SELECT p.id, p.title, p.content, p.published, p.created_at,
            p.author_id,
            a.name AS author_name, a.email AS author_email, a.bio AS author_bio
     FROM posts p
     JOIN authors a ON p.author_id = a.id
     WHERE p.id = $1`,
    [id],
  );
  return rows[0] || null;
};

const getPostsByAuthorId = async (authorId) => {
  const { rows } = await pool.query(
    `SELECT p.id, p.title, p.content, p.published, p.created_at,
            a.id AS author_id, a.name AS author_name,
            a.email AS author_email, a.bio AS author_bio
     FROM posts p
     JOIN authors a ON p.author_id = a.id
     WHERE p.author_id = $1
     ORDER BY p.created_at DESC`,
    [authorId],
  );
  return rows;
};

const createPost = async ({ title, content, author_id, published }) => {
  const { rows } = await pool.query(
    `INSERT INTO posts (title, content, author_id, published)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [title, content, author_id, published ?? false],
  );
  return rows[0];
};

const updatePost = async (id, { title, content, author_id, published }) => {
  const { rows } = await pool.query(
    `UPDATE posts
     SET title     = COALESCE($1, title),
         content   = COALESCE($2, content),
         author_id = COALESCE($3, author_id),
         published = COALESCE($4, published)
     WHERE id = $5
     RETURNING *`,
    [title, content, author_id, published, id],
  );
  return rows[0] || null;
};

const deletePost = async (id) => {
  const { rowCount } = await pool.query("DELETE FROM posts WHERE id = $1", [
    id,
  ]);
  return rowCount > 0;
};

export {
  getAllPosts,
  getPostById,
  getPostsByAuthorId,
  createPost,
  updatePost,
  deletePost,
};

//? ESTE MÓDULO SE ENCARGA DE REALIZAR LAS OPERACIONES DE BASE DE DATOS RELACIONADAS CON LOS POSTS. INCLUYE FUNCIONES PARA OBTENER TODOS LOS POSTS, OBTENER UN POST POR ID, OBTENER LOS POSTS DE UN AUTOR POR SU ID, CREAR UN NUEVO POST, ACTUALIZAR UN POST EXISTENTE Y ELIMINAR UN POST. CADA FUNCIÓN UTILIZA CONSULTAS SQL PREPARADAS PARA INTERACTUAR CON LA BASE DE DATOS A TRAVÉS DEL POOL DE CONEXIONES CONFIGURADO EN EL ARCHIVO DE CONEXIÓN. LAS FUNCIONES DEVUELVEN LOS RESULTADOS O INDICAN SI LA OPERACIÓN FUE EXITOSA, Y MANEJAN CASOS EN LOS QUE NO SE ENCUENTRA EL POST O HAY ERRORES DE VALIDACIÓN. ES IMPORTANTE NOTAR QUE LAS FUNCIONES DE OBTENER POSTS INCLUYEN INFORMACIÓN DEL AUTOR MEDIANTE UNA JOIN CON LA TABLA DE AUTORES, LO QUE PERMITE DEVOLVER DATOS COMPLETOS EN UNA SOLA CONSULTA. LAS FUNCIONES DE CREACIÓN Y ACTUALIZACIÓN PERMITEN USAR COALESCE PARA MANTENER LOS VALORES EXISTENTES CUANDO NO SE PROPORCIONAN NUEVOS VALORES. LA FUNCIÓN DE ELIMINACIÓN DEVUELVE UN BOOLEANO INDICANDO SI LA OPERACIÓN FUE EXITOSA O NO.