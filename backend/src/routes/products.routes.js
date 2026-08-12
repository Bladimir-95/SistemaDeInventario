const express = require("express");
const router = express.Router();

const {
  getProducts,
  creatProduct,
} = require("../controllers/product.controller");

router.get("/", getProducts);
router.post("/creatproduct", creatProduct);

module.exports = router;
