import { vi, describe, it, expect } from 'vitest';
import request from 'supertest';

// Mock del middleware de autenticación para evitar necesidad de token
vi.mock('../src/middlewares/authMiddleware', () => ({
  default: (req, res, next) => next(),
}));

// Mock de servicios de posts
vi.mock('../src/services/postsServices', () => ({
  getAllPosts: async () => [
    { id: 1, title: 'Post Uno', content: 'Contenido', author_id: 1 },
  ],
  getPostById: async (id) => (id === '1' ? { id: 1, title: 'Post Uno', content: 'Contenido' } : null),
  getPostsByAuthorId: async (authorId) => (authorId === '1' ? [{ id: 1, title: 'Post Uno' }] : []),
  createPost: async (data) => ({ id: 2, ...data }),
  updatePost: async (id, data) => (id === '1' ? { id: 1, ...data } : null),
  deletePost: async (id) => (id === '1' ? true : false),
}));

import app from '../src/app.js';

describe('Posts - endpoints', () => {
  it('GET /posts devuelve lista de posts', async () => {
    const res = await request(app).get('/posts');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('title');
  });

  it('POST /posts valida title requerido', async () => {
    const res = await request(app).post('/posts').send({ content: 'sin título', author_id: 1 });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'title es requerido');
  });

  it('POST /posts crea post correctamente', async () => {
    const nuevo = { title: 'Nuevo Post', content: 'Contenido', author_id: 1 };
    const res = await request(app).post('/posts').send(nuevo);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe(nuevo.title);
  });
});
