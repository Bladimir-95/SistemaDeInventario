const Product = require("../models/Product");

//OBTENER PRODUCTOS
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

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.getById(id)

    if(!product){
      return res.status(404).json({
        message: "Producto no encontrado"
      });
    } ;

    res.status(200).json(product)
  } catch (error) {
    console.log("Error al encontrar producto", error);
    res.json({
      message: "Error al encontrar producto"
    });
  }
}

//CREAR UN PRODUCTO
const creatProduct = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const product = {
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.category_id,
      image: req.file ? req.file.filename: null,
    }

    console.log("Producto recibido:", product)

    const result = await Product.creatProduct(product)

    res.status(201).json({
      message: "Producto creado correctamente",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error al crear el producto"
    });
  }
};

//ACTUALIZACION DE PRODUCTOS
const updateProduct = async (req, res) => {
  try {
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    const { name, price, description, stock, category_id } = req.body;
    const id = req.params.id;
    const image = req.file ? req.file.filename : undefined;

    const product = {
      id,
      name,
      price,
      stock,
      description,
      image,
      category_id,
    }

    const result = await Product.updateProduct(id, product)

    res.status(201).json({
      message: "Producto actualizado exitosamente"
    });
  } catch (error) {
    console.log("Error:", error)

    res.status(500).json({
      message: "Error al actualizar el producto"
    })
  }
};

//ELIMINAR PRODUCTO
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Product.deleteProduct(id);

    res.status(201).json({
      message: "Producto eliminado correctamente"
    });

  } catch (error) {
    console.log("Error", error);

    res.status(500).json({
      message: "Error al eliminar producto"
    });
  }
}

const getProductsByCategory = async (req, res) => {
  try {
    const {categoryId} = req.params;

    const products = await Product.getProductsByCategory(categoryId);

    return res.status(200).json(products);
  } catch (error) {
    res.status(500).jso({
      message: "Error al encontrar productos de la categoria selecionada",
      error: error.message,
    })
  }
}

module.exports = {
  getProducts,
  getProductById,
  creatProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
};
