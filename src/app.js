import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

//todo RUTAS
import authRouter from "./routes/auth.js";
import authorsRouter from "./routes/authors.js";
import postsRouter from "./routes/posts.js";
import commentsRouter from "./routes/comments.js";

//todo MIDDLEWARES
import authMiddleware from "./middlewares/authMiddleware.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

const app = express();
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

// ── Middlewares globales ──────────────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
);
app.use(express.json({ limit: "100kb" }));
app.use(apiLimiter);
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  next();
});

// ── Health check (público) ────────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Rutas públicas ────────────────────────────────────────────────────────────
app.use("/auth/login", authLimiter);
app.use("/auth", authRouter);

// ── Rutas protegidas ──────────────────────────────────────────────────────────
app.use("/authors", authMiddleware, authorsRouter);
app.use("/posts", authMiddleware, postsRouter);
app.use("/comments", authMiddleware, commentsRouter);

// ── Manejo de errores (siempre al final) ──────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;

//? ESTE ARCHIVO ES EL PUNTO DE ENTRADA PRINCIPAL DE LA APLICACIÓN. CONFIGURA EL SERVIDOR EXPRESS, INCLUYE LOS MIDDLEWARES GLOBALES COMO CORS Y JSON PARSER, DEFINE LAS RUTAS PÚBLICAS Y PROTEGIDAS, Y MANEJA LOS ERRORES. LAS RUTAS PÚBLICAS SON AQUELLAS QUE NO REQUIEREN AUTENTICACIÓN (COMO LA RUTA DE HEALTH CHECK Y LAS RUTAS DE AUTENTICACIÓN), MIENTRAS QUE LAS RUTAS PROTEGIDAS REQUIEREN UN TOKEN VÁLIDO PARA ACCEDER A LOS RECURSOS RELACIONADOS CON AUTORES, POSTS Y COMENTARIOS. LOS MIDDLEWARES DE NOT FOUND Y ERROR HANDLER SE COLOCAN AL FINAL PARA ASEGURAR QUE SE EJECUTEN SOLO CUANDO NINGUNA OTRA RUTA HAYA COINCIDIDO O HAYA OCURRIDO UN ERROR DURANTE EL PROCESAMIENTO DE LA SOLICITUD.
