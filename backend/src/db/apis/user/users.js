const express = require("express");
const db = require("../../connection");

const router = express.Router();

router.get("/users", async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();

    const resultado = await conn.query("SELECT * FROM usuarios");

    if (resultado.length <= 0) {
      return res.status(404).json({ message: "No hay usuarios" });
    }

    return res.json(resultado);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  } finally {
    if (conn) {
      conn.release();
    }
  }
});

module.exports = router;

/*router.get("/users", async (req, res) => {
    const conn = await db.getConnection()
    const resultado = await conn.query("SELECT * FROM usuarios")

    if(req.body.length <= 0){
        res.status(404).json({message: "No hay usuarios"})
    }

    res.json(resultado)
})

module.exports = router*/