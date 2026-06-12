import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

pool.on("error", (err) => {
  console.error("Error inesperado en el cliente inactivo", err);
  process.exit(-1);
});

export default pool;

//? ESTE MÓDULO SE ENCARGA DE CONFIGURAR Y EXPORTAR UNA CONEXIÓN A LA BASE DE DATOS POSTGRESQL UTILIZANDO EL PAQUETE 'pg'. LA CONFIGURACIÓN SE REALIZA A TRAVÉS DE UNA URL DE CONEXIÓN O VARIABLES DE ENTORNO, Y SE MANEJA UN EVENTO DE ERROR PARA LOS CLIENTES INACTIVOS. ESTE POOL DE CONEXIONES SE UTILIZA EN LOS SERVICIOS PARA REALIZAR CONSULTAS A LA BASE DE DATOS.