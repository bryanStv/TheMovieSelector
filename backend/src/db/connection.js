const mysql = require("mysql2/promise");
const dotenv = require("dotenv")
dotenv.config()

/*const connection = mysql.createPool({
  host: process.env.HOST,
  port: process.env.DBPORT,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
});*/

let pool;
const getConnection = async () => {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: process.env.HOST,
      port: process.env.DBPORT,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: process.env.DBNAME,
      timezone: "Z",
    });
  }

  return await pool.getConnection();
};

//const getConnection = () => connection;

module.exports = {
  getConnection
}

/*const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3300,
  user: "root",
  password: "1234",
  database: "themovieselector",
});

// Conectar
connection.connect((err) => {
  if (err) {
    console.error("Error al conectar a MySQL:", err);
    return;
  }
  console.log("Conectado a MySQL en Docker en el puerto 3300");
});

module.exports = connection;*/
