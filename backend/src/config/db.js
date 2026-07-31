const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "inventory",
});

connection.connect((error, result) => {
  if (error) {
    console.log("Error en la conexion:", error);
    return;
  }

  console.log("Conectado a MySql");
});

module.exports = connection;
