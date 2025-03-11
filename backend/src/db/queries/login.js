const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../connection"); // Asegúrate de importar la conexión a la base de datos

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;

    if (!usuario || !contraseña) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const conn = await db.getConnection();

    const [usuarioBD] = await conn.query(
      "SELECT * FROM usuarios WHERE usuario = ?",
      [usuario]
    );

    if (usuarioBD.length === 0) {
      return res
        .status(400)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    const match = await bcrypt.compare(contraseña, usuarioBD[0].contraseña);

    if (!match) {
      return res
        .status(400)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    res.clearCookie("token");

    const usuarioData = {
      id: usuarioBD[0].id,
      nombre: usuarioBD[0].usuario,
      email: usuarioBD[0].email,
      iat: Math.floor(Date.now() / 1000),
    };

    const token = jwt.sign(usuarioData, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Token generado:", token);

    return res.status(200).json({ token, usuario: usuarioData });
  } catch (error) {
    console.error("Error al hacer login:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Exportamos el router
module.exports = router;

/*app.post("/login", async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;

    if (!usuario || !contraseña) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const conn = await db.getConnection();

    const [usuarioBD] = await conn.query(
      "SELECT * FROM usuarios WHERE usuario = ?",
      [usuario]
    );

    if (usuarioBD.length === 0) {
      return res
        .status(400)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    // Comparar la contraseña proporcionada con la encriptada en la base de datos
    const match = await bcrypt.compare(contraseña, usuarioBD[0].contraseña);

    if (!match) {
      return res
        .status(400)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    const usuarioData = {
      id: usuarioBD[0].id,
      nombre: usuarioBD[0].usuario,
      email: usuarioBD[0].email,
    };

    const token = jwt.sign(usuarioData, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });


    // Guardar el token en una cookie segura
    /*res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
      maxAge: 3600000, // 1 hora en milisegundos
    });*/

//console.log("JWT_SECRET:", process.env.JWT_SECRET);
/*console.log("Token: "+token)

    return res.status(200).json(
      token
    );
  } catch (error) {
    console.error("Error al hacer login:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = { login }*/
