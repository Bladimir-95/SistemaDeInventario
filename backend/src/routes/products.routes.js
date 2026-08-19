const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const {
  getProducts,
  creatProduct,
  updateProduct,
} = require("../controllers/product.controller");

router.get("/", getProducts);
router.post(
  "/creatproduct",
  upload.single("image"),
  creatProduct
);
router.put("/updateproduct/:id", upload.single("image"), updateProduct)

module.exports = router;
