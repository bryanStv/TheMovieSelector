const express = require("express");
const db = require("../../connection");

const router = express.Router();

router.get("/is-followed", async (req, res) => {
  const conn = await db.getConnection();

  const { usuario_id, seguido_id } = req.query;

  if (!usuario_id || !seguido_id) {
    return res.status(400).json({ message: "Faltan parámetros" });
  }

  try {
    const [rows] = await conn.execute(
      "SELECT * FROM seguidores WHERE usuario_id = ? AND seguido_id = ?",
      [usuario_id, seguido_id]
    );

    const isFollowed = rows.length > 0;

    return res.status(200).json({ isFollowed });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al verificar el seguimiento" });
  } finally {
    conn.release();
  }
});


module.exports = router