const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    console.log("controlador iniciado")

    const products = await Product.getAll();

    console.log("Productos recibidos:", products)

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener productos",
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
};
