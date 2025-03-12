const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../../connection");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { usuario, contraseña, email } = req.body;

    const contraseñaString = String(contraseña);

    if (!usuario || !contraseña || !email) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const conn = await db.getConnection();
    const [usuarioYaEnBD] = await conn.query(
      "SELECT * FROM usuarios WHERE usuario = ? OR email = ?",
      [usuario, email]
    );

    if (usuarioYaEnBD.length > 0) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Encriptar la contraseña
    const hashPassword = await bcrypt.hash(contraseñaString, 10);

    const query =
      "INSERT INTO usuarios (usuario, contraseña, email) VALUES (?, ?, ?)";
    const values = [usuario, hashPassword, email];

    const [result] = await conn.execute(query, values);

    res.status(201).json({
      message: "Usuario creado con éxito",
      userId: result.insertId,
      usuario: usuario,
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router