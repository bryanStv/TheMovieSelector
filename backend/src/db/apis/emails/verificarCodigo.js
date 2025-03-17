const express = require("express");
const db = require("../../connection.js");
const { getAuthorization } = require("../../auth/getAuthoritation.js");
const router = express.Router();

router.post("/mail/verifyCode", async(req, res) => {
    let conn = await db.getConnection();
    const token = req.headers.authorization;
    const { code } = req.body;

    const {id} = await getAuthorization(token);

    if (!id) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
    }

    try {
        const query = `
        SELECT * FROM codigos_verificacion 
        WHERE user_id = ? AND code = ? AND expiration > CURRENT_TIMESTAMP
        `;

        const [rows] = await conn.query(query, [id, code]);

        if (rows.length === 0) {
        return res
            .status(400)
            .json({ success: false, message: "Código inválido o expirado" });
        }

        await conn.query(
        "DELETE FROM codigos_verificacion WHERE user_id = ?",
        [id]
        );

        return res
        .status(200)
        .json({
            success: true,
            message: "Código verificado correctamente",
        });
    } catch (e) {
        console.error(e);
        return res
          .status(500)
          .json({ success: false, message: "Error interno del servidor" });
    } finally {
        conn.release();
    }
})

module.exports = router;