# 📚 Documentación - MiniBlog API

## 📋 Tabla de Contenidos
1. [Descripción General](#descripción-general)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Explicación de Carpetas](#explicación-de-carpetas)
4. [Explicación de Archivos](#explicación-de-archivos)
5. [Cómo Ejecutar](#cómo-ejecutar)

---

## 📖 Descripción General

**MiniBlog API** es una aplicación backend (servidor) construida con **Node.js** y **Express**. Es una API REST que permite:
- 👤 Registrarse e iniciar sesión de usuarios
- ✍️ Crear, leer, actualizar y eliminar posts (artículos/publicaciones)
- 👥 Gestionar autores (usuarios)
- 💬 Agregar comentarios en los posts

La aplicación utiliza una base de datos **PostgreSQL** para almacenar la información y **JWT (JSON Web Tokens)** para autenticar usuarios de forma segura.

---

## 📁 Estructura del Proyecto

```
PROYECTO-INTEGRADOR/
├── src/                          # Código fuente principal
│   ├── app.js                   # Configuración de Express
│   ├── server.js                # Inicio del servidor
│   ├── controllers/             # Controladores (lógica de las rutas)
│   ├── db/                      # Conexión a base de datos
│   ├── middlewares/             # Funciones intermedias
│   ├── routes/                  # Definición de rutas
│   └── services/                # Lógica de negocio
├── tests/                        # Pruebas automatizadas
├── docs/                         # Documentación adicional
├── scripts/                      # Scripts de configuración
├── package.json                 # Dependencias y scripts
├── pnpm-lock.yaml              # Lock file de dependencias
├── pnpm-workspace.yaml         # Configuración del workspace
├── vitest.config.js            # Configuración de pruebas
└── README.md                    # Información general
```

---

## 🗂️ Explicación de Carpetas

### 📂 `src/` - Código Fuente Principal
Contiene todo el código de la aplicación:
- Configuración del servidor
- Lógica de rutas, controladores y servicios
- Middlewares y conexión a base de datos

### 📂 `src/controllers/`
**¿Qué es?** Controladores que manejan las solicitudes HTTP
**Para qué sirve?** Reciben las peticiones del cliente y coordinan la respuesta
- `authController.js` → Controla el login y registro
- `authorsController.js` → Gestiona usuarios/autores
- `postsController.js` → Gestiona posts/artículos
- `commentsController.js` → Gestiona comentarios

### 📂 `src/routes/`
**¿Qué es?** Definición de las rutas de la API
**Para qué sirve?** Define qué URL aceptan qué métodos HTTP (GET, POST, PUT, DELETE)
- `auth.js` → Rutas de login/registro
- `authors.js` → Rutas de usuarios
- `posts.js` → Rutas de artículos
- `comments.js` → Rutas de comentarios

### 📂 `src/services/`
**¿Qué es?** Lógica de negocio (la inteligencia de la aplicación)
**Para qué sirve?** Realiza operaciones complejas como validar datos, cifrar contraseñas, consultar la base de datos
- `authServices.js` → Lógica de autenticación
- `authorsServices.js` → Lógica de usuarios
- `postsServices.js` → Lógica de posts
- `commentsServices.js` → Lógica de comentarios

### 📂 `src/middlewares/`
**¿Qué es?** Funciones intermedias que procesan solicitudes
**Para qué sirve?** Validar tokens, manejar errores, verificar permisos
- `authMiddleware.js` → Verifica que el usuario esté autenticado
- `errorHandler.js` → Maneja errores de la aplicación
- `notFound.js` → Responde cuando no se encuentra una ruta

### 📂 `src/db/`
**¿Qué es?** Conexión a la base de datos
**Para qué sirve?** Establece la comunicación con PostgreSQL
- `connection.js` → Configuración de conexión a la BD

### 📂 `tests/`
**¿Qué es?** Pruebas automatizadas
**Para qué sirve?** Verifican que el código funcione correctamente
- `authors.test.js` → Pruebas del módulo de autores
- `post.test.js` → Pruebas del módulo de posts

### 📂 `docs/`
**¿Qué es?** Documentación técnica
**Para qué sirve?** Contiene especificaciones de la API
- `openapi.yaml` → Especificación OpenAPI (documentación de endpoints)

### 📂 `scripts/`
**¿Qué es?** Scripts SQL para la base de datos
**Para qué sirve?** Crean las tablas e insertan datos iniciales
- `setup.sql` → Crea la estructura de las tablas
- `seedData.sql` → Inserta datos de ejemplo

---

## 📄 Explicación de Archivos

### 🔧 Archivos de Configuración

#### **`package.json`**
```
¿Qué es?     Archivo de configuración del proyecto Node.js
Para qué?    Define dependencias, scripts y configuración
Contiene:    - Nombre y versión del proyecto
             - Librerías necesarias (Express, PostgreSQL, JWT, etc.)
             - Scripts para ejecutar la app (npm start, npm run dev)
             - Configuración de pruebas
```

#### **`pnpm-workspace.yaml`**
```
¿Qué es?     Configuración del gestor de paquetes
Para qué?    Permite gestionar múltiples proyectos (monorepo)
```

#### **`vitest.config.js`**
```
¿Qué es?     Configuración de las pruebas
Para qué?    Define cómo se ejecutan y validan los tests
```

---

### 🚀 Archivos Principales

#### **`src/server.js`**
```
¿Qué es?     Punto de entrada de la aplicación
Para qué?    - Inicia el servidor en un puerto
             - Crea el usuario administrador si no existe
             - Muestra mensajes en la consola
Orden:       1️⃣ Este archivo se ejecuta primero
```

#### **`src/app.js`**
```
¿Qué es?     Configuración de Express
Para qué?    - Importa middlewares globales (CORS, JSON parser)
             - Define todas las rutas de la API
             - Configura el manejo de errores
             - Separa rutas públicas (sin autenticación) de protegidas
Orden:       2️⃣ Se importa desde server.js
```

---

### 🛣️ Archivos de Rutas (`src/routes/`)

#### **`auth.js`**
```
Rutas que maneja:
- POST /auth/register    → Crear nueva cuenta
- POST /auth/login       → Iniciar sesión
```

#### **`authors.js`**
```
Rutas que maneja:
- GET /authors           → Obtener lista de autores
- GET /authors/:id       → Obtener un autor específico
- PUT /authors/:id       → Actualizar información de un autor
- DELETE /authors/:id    → Eliminar un autor
```

#### **`posts.js`**
```
Rutas que maneja:
- GET /posts             → Obtener todos los posts
- GET /posts/:id         → Obtener un post específico
- POST /posts            → Crear un nuevo post
- PUT /posts/:id         → Actualizar un post
- DELETE /posts/:id      → Eliminar un post
```

#### **`comments.js`**
```
Rutas que maneja:
- GET /comments          → Obtener todos los comentarios
- POST /comments         → Crear un comentario
- PUT /comments/:id      → Actualizar un comentario
- DELETE /comments/:id   → Eliminar un comentario
```

---

### 🎮 Archivos de Controladores (`src/controllers/`)

#### **`authController.js`**
```
Funciones que contiene:
- register()  → Procesa el registro de nuevos usuarios
- login()     → Verifica credenciales y genera token JWT
```

#### **`authorsController.js`**
```
Funciones que contiene:
- getAllAuthors()     → Obtiene todos los autores
- getAuthorById()     → Obtiene un autor por ID
- updateAuthor()      → Actualiza datos de un autor
- deleteAuthor()      → Elimina un autor
```

#### **`postsController.js`**
```
Funciones que contiene:
- getAllPosts()       → Obtiene todos los posts
- getPostById()       → Obtiene un post específico
- createPost()        → Crea un nuevo post
- updatePost()        → Actualiza un post
- deletePost()        → Elimina un post
```

#### **`commentsController.js`**
```
Funciones que contiene:
- getAllComments()    → Obtiene todos los comentarios
- getCommentById()    → Obtiene un comentario específico
- createComment()     → Crea un nuevo comentario
- updateComment()     → Actualiza un comentario
- deleteComment()     → Elimina un comentario
```

---

### 💼 Archivos de Servicios (`src/services/`)

#### **`authServices.js`**
```
Funciones que contiene:
- registerUser()      → Crea un nuevo usuario en BD
- loginUser()         → Busca usuario y genera token
- seedAdminUser()     → Crea un admin si no existe
```

#### **`authorsServices.js`**
```
Funciones que contiene:
- Consultas a BD para obtener, actualizar o eliminar autores
- Validaciones de datos antes de guardar
```

#### **`postsServices.js`**
```
Funciones que contiene:
- Consultas a BD para posts
- Validaciones y lógica de negocio
```

#### **`commentsServices.js`**
```
Funciones que contiene:
- Consultas a BD para comentarios
- Validaciones antes de guardar
```

---

### 🔐 Archivos de Middlewares (`src/middlewares/`)

#### **`authMiddleware.js`**
```
¿Qué hace?
- Valida que la solicitud tenga un token JWT válido
- Si es válido → permite continuar
- Si es inválido/falta → rechaza la solicitud
Protege:  Rutas de autores, posts y comentarios
```

#### **`errorHandler.js`**
```
¿Qué hace?
- Captura errores que ocurren en la aplicación
- Los formatea de manera legible
- Envía respuestas de error al cliente
```

#### **`notFound.js`**
```
¿Qué hace?
- Se ejecuta cuando ninguna ruta coincide
- Responde con error 404 (no encontrado)
```

---

### 💾 Archivos de Base de Datos

#### **`src/db/connection.js`**
```
¿Qué hace?
- Crea conexión a PostgreSQL
- Exporta un pool para hacer consultas
- Configurado con variables de entorno
```

---

## 🚀 Cómo Ejecutar

### Instalación
```bash
# Instalar dependencias
pnpm install
```

### Desarrollo
```bash
# Ejecutar con recarga automática
pnpm run dev
```

### Producción
```bash
# Ejecutar normalmente
pnpm start
```

### Pruebas
```bash
# Ejecutar todas las pruebas
pnpm test

# Ver cobertura de pruebas
pnpm run test:coverage
```

---

## 📊 Flujo de una Solicitud

1. **Cliente** envía solicitud (ej: POST /auth/login)
2. **app.js** recibe la solicitud y aplica middlewares
3. **authMiddleware.js** valida el token (si es protegida)
4. **routes/auth.js** direcciona a la acción correcta
5. **authController.js** procesa la lógica
6. **authServices.js** ejecuta operaciones en BD
7. **connection.js** accede a la base de datos
8. Respuesta regresa al cliente

---

## 🔑 Tecnologías Usadas

| Tecnología | Uso |
|-----------|-----|
| **Node.js** | Runtime de JavaScript en servidor |
| **Express** | Framework web para crear rutas |
| **PostgreSQL** | Base de datos relacional |
| **JWT** | Autenticación segura de usuarios |
| **bcryptjs** | Cifrado de contraseñas |
| **CORS** | Permite solicitudes desde otros dominios |
| **Vitest** | Framework para pruebas |
| **pnpm** | Gestor de dependencias |

---

## ✅ Resumen Rápido

| Carpeta | Responsabilidad |
|---------|-----------------|
| `routes/` | Define URLs de la API |
| `controllers/` | Procesa solicitudes |
| `services/` | Lógica de negocio y BD |
| `middlewares/` | Valida y filtra solicitudes |
| `db/` | Conecta a la base de datos |
| `tests/` | Verifica que todo funciona |

¡Tu proyecto está bien organizado y listo para usar! 🎉
