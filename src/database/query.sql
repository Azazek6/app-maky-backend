-- Active: 1700627637371@@127.0.0.1@3306@db_makys_shop
CREATE DATABASE IF NOT EXISTS sb_makys_shop;

CREATE TABLE roles(
	id_rol INT AUTO_INCREMENT,
	nombre VARCHAR(50) NOT NULL,
	PRIMARY KEY(id_rol)
);

INSERT INTO roles(nombre) VALUES('CLIENTE');
INSERT INTO roles(nombre) VALUES('USUARIO_PANEL');

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

INSERT INTO usuarios(id_rol,documento,nombres,apellidos,usuario,email,telefono,password,estado,fecha_registro) VALUES(2,40156898,'ESMERALDA','GOMEZ',40156898,'esmeralda@gmail.com',965487568,'$2a$10$lfwsHNlPQPZSMmBMR5EA/ut/EGlu7JOtRPKoqJX5cg4Kabt4sp8Ry',1,'2023-11-29');

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

CREATE TABLE producto_imagenes(
	id_producto_imagen INT AUTO_INCREMENT,
	id_producto INT NOT NULL,
	imagen VARCHAR(120) NOT NULL,
	PRIMARY KEY(id_producto_imagen),
	Foreign Key (id_producto) REFERENCES productos(id_producto)
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

CREATE TABLE ordenes(
	id_orden INT AUTO_INCREMENT,
	id_usuario INT NOT NULL,
	imagen_compra VARCHAR(255) NULL,
	monto_total DECIMAL(12,2) NOT NULL,
	tipo_envio VARCHAR(50) NOT NULL,
	distrito VARCHAR(50) NOT NULL,
	provincia VARCHAR(50) NOT NULL,
	calle_numero VARCHAR(50) NOT NULL,
	oficina VARCHAR(50) NULL,
	codigo_postal VARCHAR(50) NULL,
	detalles_orden TEXT NULL,
	correo VARCHAR(50) NOT NULL,
	nombres VARCHAR(50) NOT NULL,
	apellidos VARCHAR(50) NOT NULL,
	telefono VARCHAR(50) NOT NULL,
	tipo_compra VARCHAR(50) NOT NULL,
	documento VARCHAR(50) NOT NULL,
	razon_social VARCHAR(200) NULL,
	medio_pago VARCHAR(50) NOT NULL,
	estado VARCHAR(50) DEFAULT 'PENDIENTE',
	fecha_registro DATETIME NOT NULL,
	PRIMARY KEY(id_orden),
	Foreign Key (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE orden_detalles(
	id_orden_detalle INT AUTO_INCREMENT,
	id_orden INT NOT NULL,
	id_producto INT NOT NULL,
	cantidad INT NOT NULL,
	precio_unidad DECIMAL(12,2) NOT NULL,
	total DECIMAL(12,2) NOT NULL,
	PRIMARY KEY(id_orden_detalle),
	Foreign Key (id_orden) REFERENCES ordenes(id_orden),
	Foreign Key (id_producto) REFERENCES productos(id_producto)
);

CREATE TABLE clientes(
	id_cliente INT AUTO_INCREMENT,
	tipo_documento VARCHAR(20) NOT NULL,
	documento VARCHAR(50) NOT NULL,
	nombres VARCHAR(50) NOT NULL,
	apellidos VARCHAR(150) NULL,
	email VARCHAR(150) NULL,
	telefono INT NULL,
	fecha_registro DATE NOT NULL,
	PRIMARY KEY(id_cliente)
);

CREATE TABLE ventas(
	id_venta INT AUTO_INCREMENT,
	id_orden INT NULL,
	id_usuario INT NOT NULL,
	id_cliente INT NOT NULL,
	tipo_comprobante VARCHAR(50) NOT NULL,
	tipo_pago VARCHAR(50) NOT NULL,
	total DECIMAL(12,2) NOT NULL,
	observaciones TEXT NULL,
	fecha_registro DATE NOT NULL,
	estado VARCHAR(50) NULL DEFAULT 'EMITIDO',
	PRIMARY KEY (id_venta),
	Foreign Key (id_orden) REFERENCES ordenes(id_orden),
	Foreign Key (id_usuario) REFERENCES usuarios(id_usuario),
	Foreign Key (id_cliente) REFERENCES clientes(id_cliente)
);

CREATE TABLE detalle_ventas(
	id_detalle_venta INT NOT NULL AUTO_INCREMENT,
	id_venta INT NOT NULL,
	id_producto INT NOT NULL,
	precio DECIMAL(12,2) NOT NULL,
	cantidad INT NOT NULL,
	importe_total DECIMAL(12,2) NOT NULL,
	descuento DECIMAL(12,2) NOT NULL,
	PRIMARY KEY(id_detalle_venta),
	Foreign Key (id_venta) REFERENCES ventas(id_venta),
	Foreign Key (id_producto) REFERENCES productos(id_producto)
);
