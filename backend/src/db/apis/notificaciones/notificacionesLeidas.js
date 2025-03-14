const express = require("express");
const db = require("../../connection");
const { getAuthorization } = require("../../auth/getAuthoritation.js");

const router = express.Router();

router.get("/notifications/unread", async (req, res) => {
  let conn = await db.getConnection();
  const token = req.headers.authorization;

  try {
    const { id: userId } = await getAuthorization(token);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const query = `
      SELECT COUNT(*) AS unreadCount FROM notificaciones 
      WHERE receptor_id = ? AND estado = 'no leído'
    `;

    const [result] = await conn.execute(query, [userId]);

    if (result.length === 0 || result[0].unreadCount === 0) {
      return res.status(200).json({ tieneNoLeidos: false });
    }

    res.status(200).json({ tieneNoLeidos: true });
  } catch (error) {
    console.error("Error al comprobar notificaciones no leídas:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  } finally {
    conn.release();
  }
});

module.exports = router;