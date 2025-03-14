const express = require("express");
const db = require("../../connection");
const { getAuthorization } = require("../../auth/getAuthoritation.js");

const router = express.Router();

router.patch("/notifications/status/:id", async (req, res) => {
  let conn = await db.getConnection();
  const token = req.headers.authorization;
  const { id: userId } = await getAuthorization(token);
  const notificationId = req.params.id;
  const { estado } = req.body;

  try {
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!["leído", "no leído"].includes(estado)) {
      return res.status(400).json({ message: "Estado inválido" });
    }

    const query = `
      UPDATE notificaciones 
      SET estado = ? 
      WHERE id = ? AND receptor_id = ?
    `;

    const [result] = await conn.execute(query, [
      estado,
      notificationId,
      userId,
    ]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({
          message: "Notificación no encontrada o sin permiso para modificarla",
        });
    }

    res.status(200).json({ message: "Estado de la notificación actualizado" });
  } catch (error) {
    console.error("Error al actualizar el estado de la notificación:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  } finally {
    conn.release();
  }
});

module.exports = router;