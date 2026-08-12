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

const creatProduct = async (product) => {
  try {
    const sql = `
      INSERT INTO products
      (name, price, stock, image, category_id, status)
      VALUES (?,?,?,?,?,?)
    `;

    const [result] = await db.query(sql, [
      product.name,
      product.price,
      product.stock,
      product.image,
      product.category_id,
      product.status
    ])

    console.log('Producto creado:', result)
    return result

  } catch (error) {
    throw error
  }
}

module.exports = {
  getAll,
  creatProduct,
};
