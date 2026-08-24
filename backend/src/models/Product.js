const db = require("../config/db");

const getAll = async () => {
  console.log("entrando a getAll");

  try {
    const products = await db.query("SELECT * FROM products");

    console.log("consulta terminada");
    console.log("Resultado sql:", products);

    return products[0];
  } catch (error) {
    console.log("Error SQL:");
    console.log(error);
    throw error;
  }
};

const getById = async (id) => {
  try {
    const sql = `
      SELECT * FROM products
      WHERE id = ?
    `;

    const [result] = await db.query(sql, [id]);

    return result[0];
  } catch (error) {
    console.log("Error al obtener producto por ID:", error);
    throw error;
  }
}

const creatProduct = async (product) => {
  try {
    const sql = `
      INSERT INTO products
      (name, price, stock, image, category_id)
      VALUES (?,?,?,?,?)
    `;

    const [result] = await db.query(sql, [
      product.name,
      product.price,
      product.stock,
      product.image,
      product.category_id,
    ]);

    console.log("Producto creado:", result);
    return result;
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (id, product) => {
  try {
    let sql, values;

    if (product.image) {
      sql = `
      UPDATE products
      SET 
      name = ?,
      price = ?,
      stock = ?,
      description = ?,
      image = ?,
      category_id = ?
      WHERE id = ?
    `;

      values = [
        product.name,
        product.price,
        product.stock,
        product.description,
        product.image,
        product.category_id,
        id,
      ];
    } else {
      sql = `
        UPDATE products
        SET 
          name = ?,
          price = ?,
          stock = ?,
          description = ?,
          category_id = ?
        WHERE id = ?
      `;

      values = [
        product.name,
        product.price,
        product.stock,
        product.description,
        product.category_id,
        id,
      ];
    }

    const [result] = await db.query(sql, values);

    return result;
  } catch (error) {
    console.log("Error al actualizar producto:", error);
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    const [result] = await db.query(`DELETE FROM products WHERE id = ?`, [id]);

    return result;
  } catch (error) {
    console.log("Error al actualizar producto:", error);
    throw error;
  }
}

const getProductsByCategory = async (categoryId) => {
  try {
    const sql = `SELECT * FROM products 
    WHERE category_id = ?
    `;

    const [result] = await db.query(sql, [categoryId]);

    return result;
  } catch (error) {
    console.log("Error al conseguir productos por categoria:", error);
    throw error;
  }
}

module.exports = {
  getAll,
  getById,
  creatProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
};
