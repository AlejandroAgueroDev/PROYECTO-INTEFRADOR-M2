import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db/connection.js";

const seedAdminUser = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  const { rows } = await pool.query("SELECT id FROM users WHERE email = $1", [
    email,
  ]);

  if (rows.length > 0) {
    console.log(`👤 Usuario admin ya existe: ${email}`);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
    email,
    hashedPassword,
  ]);
  console.log(`✅ Usuario admin creado: ${email}`);
};

const login = async (email, password) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  const user = rows[0];

  if (!user) return null;

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return null;

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "8h" },
  );

  return token;
};

export { seedAdminUser, login };

//? ESTE MÓDULO SE ENCARGA DE REALIZAR LAS OPERACIONES DE AUTENTICACIÓN. INCLUYE UNA FUNCIÓN PARA SEMBRAR UN USUARIO ADMINISTRADOR EN LA BASE DE DATOS SI NO EXISTE, Y UNA FUNCIÓN PARA INICIAR SESIÓN QUE VERIFICA LAS CREDENCIALES DEL USUARIO Y GENERA UN TOKEN JWT SI SON VÁLIDAS. LA FUNCIÓN DE SEMBRADO DEBE SER LLAMADA AL INICIO DE LA APLICACIÓN PARA ASEGURAR QUE EL USUARIO ADMIN ESTÉ DISPONIBLE. LA FUNCIÓN DE LOGIN SE UTILIZA EN EL CONTROLADOR DE AUTENTICACIÓN PARA PROCESAR LAS SOLICITUDES DE INICIO DE SESIÓN.