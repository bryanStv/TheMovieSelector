const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../connection");

const router = express.Router();

router.get("/getUserByToken", async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  const token = req.headers.authorization;

  console.log("Token en getUserByToken: "+token)

  if (!token) {
    return res
      .status(401)
      .json({ message: "No autorizado, token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const conn = await db.getConnection();
    const [usuarioBD] = await conn.query(
      "SELECT id, usuario, email FROM usuarios WHERE id = ?",
      [decoded.id]
    );

    if (usuarioBD.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    //console.log(usuarioBD[0]);

    return res.status(200).json({ data: usuarioBD[0] });
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
});

module.exports = router;
