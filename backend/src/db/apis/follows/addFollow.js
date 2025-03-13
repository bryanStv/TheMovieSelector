const express = require("express");
const db = require("../../connection");

const router = express.Router();

router.post("/add-follow", async (req, res) => {
    let conn = await db.getConnection();

    const { usuario_id, seguido_id } = req.body;

    if (!usuario_id || !seguido_id) {
      return res.status(400).json({ message: "Faltan parámetros" });
    }

    try {
      const [rows] = await conn.execute(
        "SELECT * FROM seguidores WHERE usuario_id = ? AND seguido_id = ?",
        [usuario_id, seguido_id]
      );

      if (rows.length > 0) {
        return res.status(400).json({ message: "Ya sigues a este usuario" });
      }

      await conn.execute(
        "INSERT INTO seguidores (usuario_id, seguido_id) VALUES (?, ?)",
        [usuario_id, seguido_id]
      );

      return res
        .status(200)
        .json({ message: "Seguimiento realizado exitosamente" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error al agregar el seguimiento" });
    } finally {
      conn.release();
    }
})

module.exports = router