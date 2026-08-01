const db = require("../config/db");

const getAll = async () => {
  console.log("entrando a getAll");

  try {

    const products = await db.query("SELECT * FROM products");

    console.log("consulta terminada")
    console.log("Resultado sql:", products);

    return products[0];
  } catch (error) {
    console.log("Error SQL:")
    console.log(error)
    throw error
  }
};

module.exports = {
  getAll,
};
