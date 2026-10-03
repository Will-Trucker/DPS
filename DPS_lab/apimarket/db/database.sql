CREATE DATABASE IF NOT EXISTS market;
USE market;

-- Tabla de usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    clave VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de productos
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio_costo DECIMAL(10, 2) NOT NULL,
    precio_venta DECIMAL(10, 2) NOT NULL,
    cantidad INT NOT NULL,
    fotografia VARCHAR(255), -- Aquí puedes almacenar la URL o ruta de la fotografía
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Ejemplo de inserción de datos
INSERT INTO usuarios (nombre, correo, contraseña)
VALUES 
('Ricardo', 'ricardo.andrade@example.com', '123456'),
('Juan', 'juan.perez@example.com', '654321');

-- Inserción de datos de ejemplo en la tabla productos
INSERT INTO productos (nombre, descripcion, precio_costo, precio_venta, cantidad, fotografia)
VALUES 
('manzana verde', 'manzana de china', 10.50, 15.00, 100, 'https://static.vecteezy.com/system/resources/thumbnails/012/086/172/small/green-apple-with-green-leaf-isolated-on-white-background-vector.jpg')