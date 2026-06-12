# MiniBlog API 🚀

API REST construida con **Node.js + Express + PostgreSQL** para gestionar autores y publicaciones. Proyecto integrador para DevSpark.

---

## Estructura del proyecto

```
miniblog-api/
├── src/
│   ├── app.js              # Express app (exportable para tests)
│   ├── server.js           # Entry point (escucha en puerto)
│   ├── db/
│   │   └── pool.js         # Conexión PostgreSQL (pg.Pool)
│   ├── routes/
│   │   ├── authors.js      # Rutas /authors
│   │   ├── posts.js        # Rutas /posts
│   │   └── comments.js     # Rutas /comments (extra credit)
│   ├── services/
│   │   ├── authorsService.js   # Queries SQL de autores
│   │   ├── postsService.js     # Queries SQL de posts
│   │   └── commentsService.js  # Queries SQL de comentarios
│   └── middlewares/
│       ├── errorHandler.js # Middleware global de errores
│       └── notFound.js     # 404 handler
├── scripts/
│   ├── setup.sql           # Crea las tablas
│   └── seed.sql            # Inserta datos de ejemplo
├── tests/
│   ├── authors.test.js
│   └── posts.test.js
├── docs/
│   └── openapi.yaml        # Documentación OpenAPI 3.0
├── .env.example
├── .gitignore
└── package.json
```

---

## Requisitos

- Node.js >= 18
- PostgreSQL >= 14
- npm >= 9

---

## Ejecución local

### 1. Clonar e instalar dependencias

```bash
git clone https://github.com/tu-usuario/miniblog-api.git
cd miniblog-api
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
# Editar .env con tus credenciales de PostgreSQL
```

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/miniblog
NODE_ENV=development
PORT=3000
```

### 3. Crear la base de datos

```bash
createdb miniblog
# o desde psql: CREATE DATABASE miniblog;
```

### 4. Ejecutar el script de setup

```bash
psql $DATABASE_URL -f scripts/setup.sql
```

### 5. (Opcional) Cargar datos de ejemplo

```bash
psql $DATABASE_URL -f scripts/seed.sql
```

### 6. Iniciar el servidor

```bash
npm run dev    # con hot reload (nodemon)
npm start      # sin hot reload
```

La API estará disponible en `http://localhost:3000`.

---

## Endpoints

| Método | Ruta                        | Descripción                          |
|--------|-----------------------------|--------------------------------------|
| GET    | /health                     | Health check                         |
| GET    | /authors                    | Listar todos los autores             |
| GET    | /authors/:id                | Obtener autor por ID                 |
| POST   | /authors                    | Crear autor                          |
| PUT    | /authors/:id                | Actualizar autor                     |
| DELETE | /authors/:id                | Eliminar autor                       |
| GET    | /posts                      | Listar todos los posts               |
| GET    | /posts/:id                  | Obtener post por ID                  |
| GET    | /posts/author/:authorId     | Posts de un autor (con datos autor)  |
| POST   | /posts                      | Crear post                           |
| PUT    | /posts/:id                  | Actualizar post                      |
| DELETE | /posts/:id                  | Eliminar post                        |
| GET    | /comments/post/:postId      | Comentarios de un post               |
| POST   | /comments                   | Crear comentario                     |
| DELETE | /comments/:id               | Eliminar comentario                  |

---

## Tests

Los tests usan **Vitest + Supertest** con mocks del pool de base de datos (no requieren conexión real).

```bash
npm test               # ejecutar tests
npm run test:coverage  # con reporte de cobertura
```

---

## Documentación OpenAPI

El archivo `docs/openapi.yaml` contiene la especificación completa.

### Visualizar con Swagger UI (local)

```bash
npx @redocly/cli preview-docs docs/openapi.yaml
```

O importar el archivo en [https://editor.swagger.io](https://editor.swagger.io).

---

## Deploy en Railway

### Pasos

1. Crear cuenta en [Railway](https://railway.app) y conectar el repo de GitHub.
2. Crear un nuevo proyecto → **"Deploy from GitHub repo"**.
3. Agregar un plugin de **PostgreSQL** al proyecto.
4. En la sección **Variables** del servicio Node, agregar:

| Variable       | Valor                                          |
|----------------|------------------------------------------------|
| `DATABASE_URL` | `${{Postgres.DATABASE_URL}}` (internal URL)    |
| `NODE_ENV`     | `production`                                   |
| `PORT`         | Railway lo inyecta automáticamente             |

5. Railway detectará el `package.json` y usará `npm start` como comando de inicio.
6. Correr el script de setup desde la terminal de Railway o desde tu máquina apuntando a la URL pública:

```bash
psql <DATABASE_PUBLIC_URL> -f scripts/setup.sql
psql <DATABASE_PUBLIC_URL> -f scripts/seed.sql
```

7. La app quedará disponible en la URL pública generada por Railway (ej. `https://miniblog-api.up.railway.app`).

---

## Variables de entorno

| Variable       | Descripción                         | Requerida |
|----------------|-------------------------------------|-----------|
| `DATABASE_URL` | Connection string de PostgreSQL     | ✅        |
| `NODE_ENV`     | `development` / `production` / `test` | ✅      |
| `PORT`         | Puerto del servidor (default: 3000) | ❌        |

> ⚠️ **Nunca subas el archivo `.env` a GitHub.** Solo se versiona `.env.example`.

---

## Registro de uso de IA

Durante el desarrollo se utilizó IA (Claude) como herramienta de apoyo para:

- Generación de la estructura inicial del proyecto y boilerplate.
- Revisión de consultas SQL parametrizadas y manejo de errores PostgreSQL.
- Redacción de tests con Jest/Supertest usando mocks del pool.
- Generación del archivo OpenAPI YAML.

Todos los fragmentos generados fueron revisados, adaptados y comprendidos antes de ser integrados al proyecto.