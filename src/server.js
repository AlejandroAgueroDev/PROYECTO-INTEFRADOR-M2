import "dotenv/config.js";
import app from "./app.js";
import { seedAdminUser } from "./services/authServices.js";

const PORT = process.env.PORT ;

app.listen(PORT, async () => {
  console.log(`🚀 MiniBlog API corriendo en puerto ${PORT}`);
  console.log(`🤖 Se entro en modo: ${process.env.NODE_ENV || "development"}`);

  // Crear usuario admin si no existe
  try {
    await seedAdminUser();
  } catch (err) {
    console.error('❌ Error al crear usuario admin:', err.message);
  }
});

//? ESTE ARCHIVO ES EL PUNTO DE ENTRADA PRINCIPAL DE LA APLICACIÓN. INICIA EL SERVIDOR EXPRESS EN EL PUERTO CONFIGURADO, IMPRIME UN MENSAJE DE INICIO EN LA CONSOLA Y LLAMA A LA FUNCIÓN PARA SEMBRAR UN USUARIO ADMINISTRADOR EN LA BASE DE DATOS SI NO EXISTE. ESTA CONFIGURACIÓN ASEGURA QUE EL SERVIDOR ESTÉ LISTO PARA RECIBIR SOLICITUDES Y QUE HAYA UN USUARIO ADMIN DISPONIBLE PARA REALIZAR OPERACIONES DE ADMINISTRACIÓN DESDE EL INICIO. SI HAY UN ERROR AL CREAR EL USUARIO ADMIN, SE REGISTRA EN LA CONSOLA PARA SU REVISIÓN.