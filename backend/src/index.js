const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv")
const cors = require("cors")
const cookieParser = require("cookie-parser");

//Configuración inicial
dotenv.config()
const app = express()
const port = process.env.PORT || 3000
app.set("port", port)
app.listen(app.get("port"))

/*res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");*/

console.log("Escuchando en puerto "+app.get("port"))

//Middlewares
app.use(morgan("dev"))
app.use(express.json()) //Parsear json
/*app.use(
  cors({
    origin: "http://localhost:5173",
    //origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);*/
app.use(cors());
app.use(cookieParser())

//APIS IMPORTS
//Usuarios
const loginRoute = require("./db/apis/user/login.js")
const registerRoute = require("./db/apis/user/register.js")
const changePassRoute = require("./db/apis/user/changePassword.js")
const usersRoute = require("./db/apis/user/users.js")
const getUserByToken = require("./db/auth/getUserByToken.js")

//Follows
const addFollowRoute = require("./db/apis/follows/addFollow.js")
const removeFollowRoute = require("./db/apis/follows/removeFollow.js")
const isFollowedRoute = require("./db/apis/follows/isFollowed.js")

//Notificaciones
const enviarNotificacionRoute = require("./db/apis/notificaciones/enviarNotificacion.js")
const recibirNotificacionRoute = require("./db/apis/notificaciones/recibirNotificacion.js")
const notificacionesLeidasRoute = require("./db/apis/notificaciones/notificacionesLeidas.js")
const cambiarEstadoNotificacionRoute = require("./db/apis/notificaciones/cambiarEstadoNotificacion.js")

//APIS ROUTES
const rutaRaiz = "/api"
app.use(rutaRaiz, loginRoute)
app.use(rutaRaiz, registerRoute)
app.use(rutaRaiz, changePassRoute)
app.use(rutaRaiz, usersRoute)
app.use(rutaRaiz, getUserByToken)
app.use(rutaRaiz, addFollowRoute)
app.use(rutaRaiz, isFollowedRoute)
app.use(rutaRaiz, removeFollowRoute)
app.use(rutaRaiz, enviarNotificacionRoute)
app.use(rutaRaiz, recibirNotificacionRoute)
app.use(rutaRaiz, notificacionesLeidasRoute)
app.use(rutaRaiz, cambiarEstadoNotificacionRoute)

//Rutas
/*app.get("/users", async (req, res) => {
    const conn = await db.getConnection()
    const resultado = await conn.query("SELECT * FROM usuarios")

    if(req.body.length <= 0){
        res.status(404).json({message: "No hay usuarios"})
    }

    res.json(resultado)
})*/

/*app.post("/user", async(req,res) => {
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
        usuario: usuario,
        });
    } catch (error) {
      console.error("Error al crear usuario:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
})*/

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
});*/

/*app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout exitoso" });
});

app.get("/session", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const usuarioData = jwt.verify(token, process.env.JWT_SECRET);
    res.json(usuarioData);
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
});*/


/*app.post("/recover-password", async (req, res) => {
  try {
    const { usuario } = req.body;

    if(!usuario){
      return res.status(400).json({message: "El campo usuario es obligatorio"});
    }

    const conn = db.getConnection()

    const [usuarioBD] = await conn.query(
      "SELECT * FROM usuarios WHERE usuario = ?",
      [usuario]
    );

    if(usuarioBD.length === 0){
      return res.status(400)
    }


})*/


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
