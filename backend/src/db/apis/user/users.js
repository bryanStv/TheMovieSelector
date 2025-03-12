const express = require("express");
const db = require("../../connection");

const router = express.Router();

router.get("/users", async (req, res) => {
    const conn = await db.getConnection()
    const resultado = await conn.query("SELECT * FROM usuarios")

    if(req.body.length <= 0){
        res.status(404).json({message: "No hay usuarios"})
    }

    res.json(resultado)
})

module.exports = router