import pool from "../db/connection.js";

const getAllAuthors = async () => {
  const { rows } = await pool.query(
    "SELECT id, name, email, bio, created_at FROM authors ORDER BY created_at DESC",
  );
  return rows;
};

const getAuthorById = async (id) => {
  const { rows } = await pool.query(
    "SELECT id, name, email, bio, created_at FROM authors WHERE id = $1",
    [id],
  );
  return rows[0] || null;
};

const createAuthor = async ({ name, email, bio }) => {
  const { rows } = await pool.query(
    "INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *",
    [name, email, bio || null],
  );
  return rows[0];
};

const updateAuthor = async (id, { name, email, bio }) => {
  const { rows } = await pool.query(
    `UPDATE authors
     SET name = COALESCE($1, name),
         email = COALESCE($2, email),
         bio = COALESCE($3, bio)
     WHERE id = $4
     RETURNING *`,
    [name, email, bio, id],
  );
  return rows[0] || null;
};

const deleteAuthor = async (id) => {
  const { rowCount } = await pool.query("DELETE FROM authors WHERE id = $1", [
    id,
  ]);
  return rowCount > 0;
};

export {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};

//? ESTE MÓDULO SE ENCARGA DE REALIZAR LAS OPERACIONES DE BASE DE DATOS RELACIONADAS CON LOS AUTORES. INCLUYE FUNCIONES PARA OBTENER TODOS LOS AUTORES, OBTENER UN AUTOR POR ID, CREAR UN NUEVO AUTOR, ACTUALIZAR UN AUTOR EXISTENTE Y ELIMINAR UN AUTOR. CADA FUNCIÓN UTILIZA CONSULTAS SQL PREPARADAS PARA INTERACTUAR CON LA BASE DE DATOS A TRAVÉS DEL POOL DE CONEXIONES CONFIGURADO EN EL ARCHIVO DE CONEXIÓN. LAS FUNCIONES DEVUELVEN LOS RESULTADOS O INDICAN SI LA OPERACIÓN FUE EXITOSA, Y MANEJAN CASOS EN LOS QUE NO SE ENCUENTRA EL AUTOR O HAY ERRORES DE VALIDACIÓN.