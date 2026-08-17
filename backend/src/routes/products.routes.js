const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const {
  getProducts,
  creatProduct,
} = require("../controllers/product.controller");

router.get("/", getProducts);
router.post(
  "/creatproduct",
  upload.single("image"),
  creatProduct
);

module.exports = router;
