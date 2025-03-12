const express = require("express");
const db = require("../../connection");

const router = express.Router();

router.post("/remove-follow", async (req, res) => {
  const conn = await db.getConnection();

  const { usuario_id, seguido_id } = req.body;

  if (!usuario_id || !seguido_id) {
    return res.status(400).json({ message: "Faltan parámetros" });
  }

  try {
    // Comprobamos si existe la relación de seguimiento entre los usuarios
    const [rows] = await conn.execute(
      "SELECT * FROM seguidores WHERE usuario_id = ? AND seguido_id = ?",
      [usuario_id, seguido_id]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "No sigues a este usuario" });
    }

    await conn.execute(
      "DELETE FROM seguidores WHERE usuario_id = ? AND seguido_id = ?",
      [usuario_id, seguido_id]
    );

    return res
      .status(200)
      .json({ message: "Seguimiento eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al eliminar el seguimiento" });
  } finally {
    conn.release();
  }
});

module.exports = router;
