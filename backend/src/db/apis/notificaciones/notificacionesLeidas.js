const express = require("express");
const db = require("../../connection");
const { getAuthorization } = require("../../auth/getAuthoritation.js");

const router = express.Router();

router.get("/notifications/status/:id", async (req, res) => {
  let conn = await db.getConnection();
  const token = req.headers.authorization;
  const { id: userId } = await getAuthorization(token);
  const notificationId = req.params.id;

  try {
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const query = `
      SELECT estado FROM notificaciones 
      WHERE id = ? AND receptor_id = ?
    `;

    const [result] = await conn.execute(query, [notificationId, userId]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Notificación no encontrada" });
    }

    res.status(200).json({ estado: result[0].estado });
  } catch (error) {
    console.error("Error al verificar el estado de la notificación:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  } finally {
    conn.release();
  }
});

module.exports = router;