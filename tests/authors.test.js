import { vi, describe, it, expect } from 'vitest';
import request from 'supertest';

// Mock del middleware de autenticación para evitar necesidad de token
vi.mock('../src/middlewares/authMiddleware', () => ({
  default: (req, res, next) => next(),
}));

// Mock de servicios para respuestas deterministas
vi.mock('../src/services/authorsServices', () => ({
  getAllAuthors: async () => [
    { id: 1, name: 'Autor Uno', email: 'uno@example.com', bio: 'Bio 1' },
  ],
  getAuthorById: async (id) => (id === '1' ? { id: 1, name: 'Autor Uno', email: 'uno@example.com' } : null),
  createAuthor: async (data) => ({ id: 2, ...data }),
  updateAuthor: async (id, data) => (id === '1' ? { id: 1, ...data } : null),
  deleteAuthor: async (id) => (id === '1' ? true : false),
}));

import app from '../src/app.js';

describe('Autores - endpoints', () => {
  it('GET /authors devuelve lista de autores', async () => {
    const res = await request(app).get('/authors');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('name');
  });

  it('POST /authors valida nombre requerido', async () => {
    const res = await request(app).post('/authors').send({ email: 'sin-nombre@example.com' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'nombre es requerido');
  });

  it('POST /authors crea autor correctamente', async () => {
    const nuevo = { name: 'Nuevo Autor', email: 'nuevo@example.com', bio: 'Bio nueva' };
    const res = await request(app).post('/authors').send(nuevo);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(nuevo.name);
  });
});
