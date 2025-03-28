# The Movie Selector

## Creación de la base de datos

```bash
docker run -p 3300:3306 --name themovieselector -e MYSQL_ROOT_PASSWORD=1234 -d mysql:lts
```

```sql
CREATE DATABASE themovieselector;
USE themovieselector;

-- Tabla de usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de películas favoritas
CREATE TABLE peliculas_favoritas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    pelicula_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de seguidores (para que los usuarios se sigan entre sí)
CREATE TABLE seguidores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    seguido_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (seguido_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    UNIQUE (usuario_id, seguido_id) -- Evita duplicaciones
);

-- Tabla de notificaciones
CREATE TABLE notificaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    emisor_id INT NOT NULL,  -- Usuario que envía la notificación
    receptor_id INT NOT NULL,  -- Usuario que recibe la notificación
    mensaje TEXT NOT NULL,  -- Mensaje de la notificación
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha en la que se crea la notificación
    estado ENUM('leído', 'no leído') DEFAULT 'no leído',  -- Estado de la notificación
    FOREIGN KEY (emisor_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (receptor_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de códigos de verificación
CREATE TABLE codigos_verificacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,               -- ID del usuario que solicita la verificación
    code VARCHAR(255) NOT NULL,          -- Código de verificación
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha y hora en que se generó el código
    expiration TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL 15 MINUTE), -- Expiración del código (15 minutos después)
    FOREIGN KEY (user_id) REFERENCES usuarios(id), -- Relación con la tabla usuarios
    UNIQUE (user_id) -- Asegura que solo haya un código por usuario
);

-- EVENTO PARA ELIMINAR EXPIRADOS CADA MIN
SET GLOBAL event_scheduler = ON;

SHOW VARIABLES LIKE 'event_scheduler';

CREATE EVENT eliminar_codigos_expirados
ON SCHEDULE EVERY 1 MINUTE
DO
BEGIN
    DELETE FROM codigos_verificacion WHERE expiration <= NOW();
END;
```

`conexión mediante DBeaver` : jdbc:mysql://localhost:3300?useSSL=false&allowPublicKeyRetrieval=true