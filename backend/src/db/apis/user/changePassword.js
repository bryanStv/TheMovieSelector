const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../../connection");

const router = express.Router();

router.patch("/change-password", async (req, res) => {
  try {
    const { usuario, oldPassword, newPassword } = req.body;

    if (!usuario || !oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const conn = await db.getConnection();

    const [rows] = await conn.query(
      "SELECT * FROM usuarios WHERE usuario = ?",
      [usuario]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = rows[0];

    // Verificar si la contraseña actual es correcta
    const isMatch = await bcrypt.compare(oldPassword, user.contraseña);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña actual incorrecta" });
    }

    // Encriptar la nueva contraseña
    const hashNewPassword = await bcrypt.hash(String(newPassword), 10);

    // Actualizar la contraseña en la base de datos
    await conn.query("UPDATE usuarios SET contraseña = ? WHERE usuario = ?", [
      hashNewPassword,
      usuario,
    ]);

    res.status(200).json({ message: "Contraseña actualizada con éxito" });
  } catch (error) {
    console.error("Error al cambiar contraseña:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
