-- ===========================================
--  BOOKSTAGRAM - Base de datos PostgreSQL
-- ===========================================

CREATE EXTENSION IF NOT EXISTS plpgsql;

-- ========================
-- Tabla: usuarios
-- ========================
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    bio VARCHAR(500),
    avatar_url VARCHAR(500),
    xp INT NOT NULL DEFAULT 0,
    seguidores INT NOT NULL DEFAULT 0,
    seguidos INT NOT NULL DEFAULT 0,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- Tabla: libros
-- ========================
CREATE TABLE libros (
    id_libro SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    portada_url VARCHAR(500),
    categoria VARCHAR(100),
    descripcion TEXT,
    fecha_publicacion DATE
);

CREATE INDEX idx_libro_autor ON libros(autor);
CREATE INDEX idx_libro_categoria ON libros(categoria);

-- ========================
-- Tabla: conversacion
-- ========================
CREATE TABLE conversacion (
    id_conversacion SERIAL PRIMARY KEY,
    id_usuario1 INT NOT NULL REFERENCES usuarios(id_usuario)
        ON UPDATE CASCADE ON DELETE CASCADE,
    id_usuario2 INT NOT NULL REFERENCES usuarios(id_usuario)
        ON UPDATE CASCADE ON DELETE CASCADE,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_conversacion_par UNIQUE (id_usuario1, id_usuario2)
);

-- ========================
-- Tabla: mensaje
-- ========================
CREATE TABLE mensaje (
    id_mensaje SERIAL PRIMARY KEY,
    id_conversacion INT NOT NULL REFERENCES conversacion(id_conversacion)
        ON UPDATE CASCADE ON DELETE CASCADE,
    id_usuario_emisor INT NOT NULL REFERENCES usuarios(id_usuario)
        ON UPDATE CASCADE ON DELETE CASCADE,
    texto TEXT NOT NULL,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- Tabla: usuariolibro
-- ========================
CREATE TABLE usuariolibro (
    id_usuario_libro SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario)
        ON UPDATE CASCADE ON DELETE CASCADE,
    id_libro INT NOT NULL REFERENCES libros(id_libro)
        ON UPDATE CASCADE ON DELETE CASCADE,
    estado VARCHAR(50) NOT NULL,
    fecha_inicio DATE,
    fecha_fin DATE,
    CONSTRAINT uk_usuario_libro UNIQUE (id_usuario, id_libro)
);

-- ========================
-- Tabla: progresolibro
-- ========================
CREATE TABLE progresolibro (
    id_progreso SERIAL PRIMARY KEY,
    id_usuario_libro INT NOT NULL REFERENCES usuariolibro(id_usuario_libro)
        ON UPDATE CASCADE ON DELETE CASCADE,
    porcentaje INT,
    capitulos_leidos INT,
    fecha_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- Tabla: opinion
-- ========================
CREATE TABLE opinion (
    id_opinion SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario)
        ON UPDATE CASCADE ON DELETE CASCADE,
    id_libro INT NOT NULL REFERENCES libros(id_libro)
        ON UPDATE CASCADE ON DELETE CASCADE,
    texto TEXT,
    puntuacion INT,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_opinion_usuario_libro UNIQUE (id_usuario, id_libro)
);

-- ========================
-- Tabla: opinionlike
-- ========================
CREATE TABLE opinionlike (
    id_like SERIAL PRIMARY KEY,
    id_opinion INT NOT NULL REFERENCES opinion(id_opinion)
        ON UPDATE CASCADE ON DELETE CASCADE,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario)
        ON UPDATE CASCADE ON DELETE CASCADE,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_like_opinion_usuario UNIQUE (id_opinion, id_usuario)
);

