-- Active: 1700627637371@@127.0.0.1@3306@db_makys_shop
CREATE TABLE roles(
	id_rol INT AUTO_INCREMENT,
	nombre VARCHAR(50) NOT NULL,
	PRIMARY KEY(id_rol)
);

CREATE TABLE usuarios(
	id_usuario INT AUTO_INCREMENT,
	id_rol INT NOT NULL,
	documento VARCHAR(50) NULL,
	nombres VARCHAR(50) NULL,
	apellidos VARCHAR(150) NULL,
	usuario VARCHAR(20) NULL,
	email VARCHAR(50) NOT NULL,
	telefono INT NULL,
	password VARCHAR(255) NOT NULL,
	estado INT NOT NULL DEFAULT 1,
	fecha_registro DATE NOT NULL,
	PRIMARY KEY(id_usuario),
	Foreign Key (id_rol) REFERENCES roles(id_rol)
);

CREATE TABLE marcas(
	id_marca INT AUTO_INCREMENT,
	nombre VARCHAR(50) NOT NULL,
	estado INT NOT NULL DEFAULT 1,
	fecha_registro DATE NOT NULL,
	PRIMARY KEY(id_marca)
);

CREATE TABLE categorias(
	id_categoria INT AUTO_INCREMENT,
	nombre VARCHAR(50) NOT NULL,
	estado INT NOT NULL DEFAULT 1,
	fecha_registro DATE NOT NULL,
	PRIMARY KEY(id_categoria)
);

CREATE TABLE generos(
	id_genero INT AUTO_INCREMENT,
	nombre VARCHAR(50) NOT NULL,
	estado INT NOT NULL DEFAULT 1,
	fecha_registro DATE NOT NULL,
	PRIMARY KEY(id_genero)
);

CREATE TABLE etapas(
	id_etapa INT AUTO_INCREMENT,
	nombre VARCHAR(50) NOT NULL,
	estado INT NOT NULL DEFAULT 1,
	fecha_registro DATE NOT NULL,
	PRIMARY KEY(id_etapa)
);

CREATE TABLE productos(
	id_producto INT AUTO_INCREMENT,
	codigo VARCHAR(120) NOT NULL,
	nombre VARCHAR(120) NOT NULL,
	precio DECIMAL(12,2) NOT NULL,
	cantidad INT NOT NULL,
	id_marca INT NOT NULL,
	id_categoria INT NOT NULL,
	imagen VARCHAR(255) DEFAULT NULL,
	descripcion TEXT DEFAULT NULL,
	id_usuario INT NOT NULL,
	id_genero INT NOT NULL,
	id_etapa INT NOT NULL,
	estado INT NOT NULL DEFAULT 1,
	fecha_registro DATE NOT NULL,
	PRIMARY KEY(id_producto),
	Foreign Key (id_marca) REFERENCES marcas(id_marca),
	Foreign Key (id_categoria) REFERENCES categorias(id_categoria),
	Foreign Key (id_usuario) REFERENCES usuarios(id_usuario),
	Foreign Key (id_genero) REFERENCES generos(id_genero),
	Foreign Key (id_etapa) REFERENCES etapas(id_etapa)
);

CREATE TABLE producto_tallas(
	id_producto_talla INT AUTO_INCREMENT,
	id_producto INT NOT NULL,
	talla VARCHAR(50) NOT NULL,
	estado INT NOT NULL DEFAULT 1,
	fecha_registro DATE NOT NULL,
	PRIMARY KEY(id_producto_talla),
	Foreign Key (id_producto) REFERENCES productos(id_producto)
);

CREATE TABLE producto_colores(
	id_producto_color INT AUTO_INCREMENT,
	id_producto INT NOT NULL,
	codigo VARCHAR(50) NOT NULL,
	color VARCHAR(50) NOT NULL,
	estado INT NOT NULL DEFAULT 1,
	fecha_registro DATE NOT NULL,
	PRIMARY KEY(id_producto_color),
	Foreign Key (id_producto) REFERENCES productos(id_producto)
);