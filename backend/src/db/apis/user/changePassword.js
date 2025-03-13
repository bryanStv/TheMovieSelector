const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../../connection");
const authJWT = require("../../../middlewares/tokenValidation.js");
const authToken = require("../../auth/getUserByToken.js");

const router = express.Router();

router.patch("/change-password", async (req, res) => {
  let conn;
  try {
    const { usuario, oldPassword, newPassword } = req.body;
    const token = JSON.stringify(req.body.token);


    //console.log(usuario + " " + oldPassword + " " + newPassword);

    if (!usuario || !oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    conn = await db.getConnection();

    const [rows] = await conn.query(
      "SELECT * FROM usuarios WHERE usuario = ?",
      [usuario]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = rows[0];

    //console.log("Anterior: "+oldPassword, user.contraseña)
    //const oldHashPassword = await bcrypt.hash(String(oldPassword),10);
    //console.log("Siguiente: " + oldHashPassword, user.contraseña);
    // Verificar si la contraseña actual es correcta
    const isMatch = await bcrypt.compare(oldPassword, user.contraseña);
    //console.log("Bcrypt: "+await bcrypt.compare(oldPassword, user.contraseña))
    if (!isMatch) {
      //console.log("Contraseña incorrecta ->" + oldPassword + " no coincide con "+user.contraseña);
      return res.status(401).json({ message: "Contraseña actual incorrecta" });
    }

    // Encriptar la nueva contraseña
    const hashNewPassword = await bcrypt.hash(String(newPassword), 10);

    // Actualizar la contraseña en la base de datos
    await conn.query("UPDATE usuarios SET contraseña = ? WHERE usuario = ?", [
      hashNewPassword,
      usuario,
    ]);

    res.status(200).json({ message: "Contraseña actualizada con éxito" });
  } catch (error) {
    console.error("Error al cambiar contraseña:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }finally{
    await conn.release();
  }
});

module.exports = router;
