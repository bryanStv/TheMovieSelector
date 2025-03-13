const mysql = require("mysql2/promise");
const dotenv = require("dotenv")
dotenv.config()

let pool;
const getConnection = async () => {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 100,
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

module.exports = {
  getConnection
}
