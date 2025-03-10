const express = require("express")
const morgan = require("morgan")
const db = require("./db/connection.js")
const dotenv = require("dotenv")
const cors = require("cors")
const bcrypt = require("bcrypt");

//Configuración inicial
dotenv.config()
const app = express()
const port = process.env.PORT || 3000
app.set("port", port)
app.listen(app.get("port"))

console.log("Escuchando en puerto "+app.get("port"))

//Middlewares
app.use(morgan("dev"))
app.use(express.json()); //Parsear json
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

//Rutas
app.get("/users", async (req, res) => {
    const conn = await db.getConnection()
    const resultado = await conn.query("SELECT * FROM usuarios")

    if(req.body.length <= 0){
        res.status(404).json({message: "No hay usuarios"})
    }

    res.json(resultado)
})

app.post("/user", async(req,res) => {
    try {
        const { usuario, contraseña, email } = req.body;

        const contraseñaString = String(contraseña);

        if (!usuario || !contraseña || !email) {
        return res
            .status(400)
            .json({ message: "Todos los campos son obligatorios" });
        }

        const conn = await db.getConnection();
        const [usuarioYaEnBD] = await conn.query(
        "SELECT * FROM usuarios WHERE usuario = ? OR email = ?",
        [usuario, email]
        );

        if(usuarioYaEnBD.length > 0){
            return res.status(400).json({message: "El usuario ya existe"})
        }

        // Encriptar la contraseña
        const hashPassword = await bcrypt.hash(contraseñaString, 10);

        const query =
        "INSERT INTO usuarios (usuario, contraseña, email) VALUES (?, ?, ?)";
        const values = [usuario, hashPassword, email];

        const [result] = await conn.execute(query, values);

        res.status(201).json({
        message: "Usuario creado con éxito",
        userId: result.insertId,
        });
    } catch (error) {
      console.error("Error al crear usuario:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
})

app.post("/login", async (req, res) => {
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
      email: usuarioBD[0].email
    };

    return res.status(200).json(usuarioData);
  } catch (error) {
    console.error("Error al hacer login:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});


// Ruta principal
/*app.get("/", (req, res) => {
  res.send("¡Bienvenido a mi API con Express!");
});

// Ruta de ejemplo
app.get("/api/saludo", (req, res) => {
  res.json({ mensaje: "Hola desde la API" });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});*/
