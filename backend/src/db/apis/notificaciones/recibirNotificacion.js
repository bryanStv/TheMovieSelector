const express = require("express");
const db = require("../../connection");
const {getAuthorization} = require("../../auth/getAuthoritation.js");

const router = express.Router();

router.get("/receive-messages", async (req, res) => {
  const conn = await db.getConnection();
  const token = req.headers.authorization;
  const { id } = await getAuthorization(token);

  try {
    
    if(!id){
        return res.status(401).json({ message: "Unauthorized" });
    }

    const query =
      "SELECT FROM notificaciones (emisor_id,mensaje,fecha, estado) WHERE ()";
    const values = [id, receptor_id, mensaje];

    const [result] = await conn.execute(query, values);

    res.status(200).json({
      message: "Mensaje enviado con exito",
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;