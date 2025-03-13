const express = require("express");
const db = require("../../connection");
const {getAuthorization} = require("../../auth/getAuthoritation.js");

const router = express.Router();

router.get("/receive-messages", async (req, res) => {
  const conn = await db.getConnection();
  const token = req.headers.authorization;
  const { id } = await getAuthorization(token);

  try {
    if (!id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    /*const query = `
      SELECT emisor_id, mensaje, fecha, estado 
      FROM notificaciones 
      WHERE receptor_id = ?
      ORDER BY fecha DESC
    `;*/

    const query = `
        SELECT n.emisor_id, u.usuario AS nombre_emisor, n.mensaje, n.fecha, n.estado
        FROM notificaciones n
        JOIN usuarios u ON n.emisor_id = u.id
        WHERE n.receptor_id = ?
        ORDER BY n.fecha DESC
    `;

    const [result] = await conn.execute(query, [id]);

    res.status(200).json({
      message: "Notificaciones recibidas con éxito",
      notificaciones: result,
    });
  } catch (error) {
    console.error("Error al obtener notificaciones:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  } finally {
    conn.release();
  }
});

module.exports = router;