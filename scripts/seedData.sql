-- ============================================================
-- MiniBlog API — Seed Script
-- Ejecutar: psql $DATABASE_URL -f scripts/seedData.sql
-- ============================================================
INSERT INTO authors (name, email, bio)
VALUES (
        'Ana García',
        'ana@example.com',
        'Desarrolladora full-stack apasionada por Node.js'
    ),
    (
        'Carlos Ruiz',
        'carlos@example.com',
        'Escritor técnico especializado en bases de datos'
    ),
    (
        'María López',
        'maria@example.com',
        'Ingeniera de software con foco en APIs REST'
    );
INSERT INTO posts (title, content, author_id, published)
VALUES (
        'Introducción a Node.js',
        'Node.js es un runtime de JavaScript construido sobre V8...',
        1,
        true
    ),
    (
        'PostgreSQL vs MySQL',
        'Ambas bases de datos tienen ventajas; la elección depende...',
        2,
        true
    ),
    (
        'APIs RESTful desde cero',
        'REST es un estilo arquitectónico que define restricciones...',
        1,
        true
    ),
    (
        'Manejo de errores en Express',
        'El manejo apropiado de errores mejora la experiencia...',
        3,
        false
    ),
    (
        'Async/Await explicado',
        'Las promesas y async/await simplifican el código asíncrono...',
        1,
        false
    );
INSERT INTO comments (content, post_id, author_id)
VALUES ('Excelente artículo, muy claro.', 1, 2),
    ('Me ayudó mucho para empezar.', 1, 3),
    ('Buen análisis comparativo.', 2, 1),
    ('Esperando la segunda parte!', 3, 2);