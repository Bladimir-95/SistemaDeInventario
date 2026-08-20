const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const {
  getProducts,
  getProductById,
  creatProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/product.controller");

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post(
  "/creatproduct",
  upload.single("image"),
  creatProduct
);

router.put("/updateproduct/:id", upload.single("image"), updateProduct);

router.delete("/deleteproduct/:id", deleteProduct);

module.exports = router;
