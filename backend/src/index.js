const express = require("express");
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.send("¡Bienvenido a mi API con Express!");
});

// Ruta de ejemplo
app.get("/api/saludo", (req, res) => {
  res.json({ mensaje: "Hola desde la API" });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
