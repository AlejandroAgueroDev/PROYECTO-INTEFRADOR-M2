-- ============================================================
-- MiniBlog API — Setup Script
-- Ejecutar: psql $DATABASE_URL -f scripts/setup.sql
-- ============================================================

-- Eliminar tablas si existen (orden inverso por FKs)
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS authors CASCADE;

-- ── Tabla: authors ────────────────────────────────────────────
CREATE TABLE authors (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(150)  UNIQUE NOT NULL,
  bio        TEXT,
  created_at TIMESTAMPTZ   DEFAULT NOW()
);

CREATE INDEX idx_authors_email ON authors(email);

-- ── Tabla: posts ─────────────────────────────────────────────
CREATE TABLE posts (
  id         SERIAL PRIMARY KEY,
  title      VARCHAR(200)  NOT NULL,
  content    TEXT          NOT NULL,
  author_id  INTEGER       NOT NULL REFERENCES authors(id) ON DELETE CASCADE,
  published  BOOLEAN       DEFAULT FALSE,
  created_at TIMESTAMPTZ   DEFAULT NOW()
);

CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_published  ON posts(published);

-- ── Tabla: comments (extra credit) ───────────────────────────
CREATE TABLE comments (
  id         SERIAL PRIMARY KEY,
  content    TEXT          NOT NULL,
  post_id    INTEGER       NOT NULL REFERENCES posts(id)   ON DELETE CASCADE,
  author_id  INTEGER       NOT NULL REFERENCES authors(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ   DEFAULT NOW()
);

CREATE INDEX idx_comments_post_id ON comments(post_id);

-- ── Tabla: users (autenticación) ─────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id         SERIAL PRIMARY KEY,
  email      VARCHAR(150) UNIQUE NOT NULL,
  password   VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ  DEFAULT NOW()
);