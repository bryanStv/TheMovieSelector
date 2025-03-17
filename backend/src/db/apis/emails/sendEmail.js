const express = require("express");
const db = require("../../connection.js");
const sgMail = require("../../../services/sendgrid.js");
const { getAuthorization } = require("../../auth/getAuthoritation.js");
const crypto = require("crypto");
const router = express.Router();

router.post("/mail/recoverPassword", async(req, res) => {

    let conn = await db.getConnection();
    const token = req.headers.authorization;
    const {to, subject, text, html, sandboxMode = false } = req.body;

    try {
        const { id, email, usuario } = await getAuthorization(token);

        if (!id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const codigoVerificacion = await generarCodigoVerificacion(conn,id);


        const mensaje = {
            to,
            from: "bryan.oyola@aticsoft.com",
            subject,
            text,
            html,
            mail_settings: {
                sandbox_mode: {
                    enable: sandboxMode
                }
            }
        }

        try{
            mensaje.to = email;
            mensaje.subject = `Recuperar la contraseña para el usuario ${usuario}`
            mensaje.text = `Recuperar contraseña para usuario ${usuario}`
            mensaje.html = `
            <strong>Hola ${usuario},</strong>
            para recuperar tu contraseña, necesitas escribir este código.
            <div style="border: 2px solid black; padding: 10px;">
                código de verificación: <strong>${codigoVerificacion}</strong>
            </div>
            `;

            await sgMail.send(mensaje);
        }catch(err){
            res.status(err.code).send(err.message);
        }

        return res.status(201).json({
          success: true,
          codigo: codigoVerificacion,
          simulatedEmail: mensaje,
        });

    }catch(e){

    }finally{
        conn.release();
    }

})

async function generarCodigoVerificacion(conn,id) { // Generar códido de 6 caracteres

    const codigo = crypto.randomBytes(3).toString("hex");


    const query = `
        INSERT INTO codigos_verificacion (user_id, code, expiration)
        VALUES (?, ?, CURRENT_TIMESTAMP + INTERVAL 15 MINUTE)
        ON DUPLICATE KEY UPDATE
            code = ?, expiration = CURRENT_TIMESTAMP + INTERVAL 15 MINUTE
    `;

    await conn.query(query, [id, codigo, codigo]);

    return codigo;
}

module.exports = router;