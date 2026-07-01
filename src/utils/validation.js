import { z } from "zod";

const emailSchema = z.string().trim().min(1, "email es requerido").email("email inválido");
const passwordSchema = z.string().min(1, "password es requerido");
const authorNameSchema = z.string().trim().min(1, "nombre es requerido");
const authorUpdateNameSchema = z.string().trim().min(1, "El nombre no puede estar vacio");

const sanitizeInput = (value) => {
  if (typeof value !== "string") return value;

  return value.replace(/[\u0000-\u001f\u007f]/g, "").trim();
};

const sanitizeObject = (input) => {
  if (Array.isArray(input)) {
    return input.map(sanitizeObject);
  }

  if (input && typeof input === "object") {
    return Object.fromEntries(
      Object.entries(input).map(([key, value]) => [key, sanitizeObject(value)]),
    );
  }

  return sanitizeInput(input);
};

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const authorCreateSchema = z.object({
  name: authorNameSchema,
  email: emailSchema,
  bio: z.string().trim().optional().nullable(),
});

const authorUpdateSchema = z.object({
  name: authorUpdateNameSchema.optional(),
  email: emailSchema.optional(),
  bio: z.string().trim().optional().nullable(),
});

const postCreateSchema = z.object({
  title: z.string().trim().min(1, "title es requerido"),
  content: z.string().trim().min(1, "content es requerido"),
  author_id: z.number().int().positive("author_id inválido"),
  published: z.boolean().optional(),
});

const postUpdateSchema = z.object({
  title: z.string().trim().min(1, "title no puede estar vacio").optional(),
  content: z.string().trim().min(1, "content no puede estar vacio").optional(),
  author_id: z.number().int().positive("author_id inválido").optional(),
  published: z.boolean().optional(),
});

const commentCreateSchema = z.object({
  post_id: z.number().int().positive("post_id inválido"),
  author_id: z.number().int().positive("author_id inválido"),
  content: z.string().trim().min(1, "content es requerido"),
});

const parseWithSchema = (schema, payload) => {
  const sanitizedPayload = sanitizeObject(payload);
  const result = schema.safeParse(sanitizedPayload);

  if (!result.success) {
    const issue = result.error.issues[0];
    return {
      success: false,
      error: issue?.message || "Datos inválidos",
    };
  }

  return { success: true, data: result.data };
};

export {
  emailSchema,
  passwordSchema,
  loginSchema,
  authorCreateSchema,
  authorUpdateSchema,
  postCreateSchema,
  postUpdateSchema,
  commentCreateSchema,
  parseWithSchema,
  sanitizeInput,
  sanitizeObject,
};
