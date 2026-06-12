import pool from "../db/connection.js";

const getCommentsByPostId = async (postId) => {
  const { rows } = await pool.query(
    `SELECT c.id, c.content, c.created_at,
            c.post_id,
            c.author_id,
            a.name AS author_name, a.email AS author_email
     FROM comments c
     JOIN authors a ON c.author_id = a.id
     WHERE c.post_id = $1
     ORDER BY c.created_at ASC`,
    [postId],
  );
  return rows;
};

const createComment = async ({ post_id, author_id, content }) => {
  const { rows } = await pool.query(
    `INSERT INTO comments (post_id, author_id, content)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [post_id, author_id, content],
  );
  return rows[0];
};

const deleteComment = async (id) => {
  const { rowCount } = await pool.query("DELETE FROM comments WHERE id = $1", [
    id,
  ]);
  return rowCount > 0;
};

export {
  getCommentsByPostId,
  createComment,
  deleteComment,
};

//? ESTE MÓDULO SE ENCARGA DE REALIZAR LAS OPERACIONES DE BASE DE DATOS RELACIONADAS CON LOS COMENTARIOS. INCLUYE FUNCIONES PARA OBTENER LOS COMENTARIOS DE UN POST POR SU ID, CREAR UN NUEVO COMENTARIO Y ELIMINAR UN COMENTARIO EXISTENTE. CADA FUNCIÓN UTILIZA CONSULTAS SQL PREPARADAS PARA INTERACTUAR CON LA BASE DE DATOS A TRAVÉS DEL POOL DE CONEXIONES CONFIGURADO EN EL ARCHIVO DE CONEXIÓN. LAS FUNCIONES DEVUELVEN LOS RESULTADOS O INDICAN SI LA OPERACIÓN FUE EXITOSA, Y MANEJAN CASOS EN LOS QUE NO SE ENCUENTRA EL COMENTARIO O HAY ERRORES DE VALIDACIÓN.