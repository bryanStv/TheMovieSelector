const express = require("express");
const db = require("../../connection");
const authJWT = require("../../../middlewares/tokenValidation.js");
const authToken = require("../../auth/getUserByToken.js");
const {getAuthorization} = require("../../auth/getAuthoritation.js");

const router = express.Router();

router.post("/send-notification", async (req, res) => {
    try {
        const token = req.header("Authorization");
        const { receptor_id, mensaje } = req.body;
        const conn = await db.getConnection();
        
        console.log("Token recibido en /send-notification:", token);

        const { id, usuario } = await getAuthorization(token)

        console.log("Usuario final(id): "+id+" user:"+usuario);

        const query =
          "INSERT INTO notificaciones (emisor_id,receptor_id, mensaje) VALUES (?, ?, ?)";
        const values = [id, receptor_id , mensaje];

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
