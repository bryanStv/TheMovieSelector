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
```

`conexión mediante DBeaver` : jdbc:mysql://localhost:3300?useSSL=false&allowPublicKeyRetrieval=true