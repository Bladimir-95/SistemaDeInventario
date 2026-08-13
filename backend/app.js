const express = require("express");
const cors = require("cors");

const app = express();

const productRoutes = require("./src/routes/products.routes");
const categoryRoutes = require("./src/routes/categories.routes");

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

module.exports = app;
