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

const creatProduct = async (req, res) => {
  try {
    const product = req.body

    console.log("Producto recibido:", product)

    const result = await Product.creatProduct(product)

    res.status(201).json({
      message: "Producto creado correctamente",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error al crear el producto"
    })
  }
}

module.exports = {
  getProducts,
  creatProduct,
};
