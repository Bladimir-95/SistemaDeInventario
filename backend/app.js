const express = require("express");
const cors = require("cors");

const app = express();

const productRoutes = require("./src/routes/products.routes");
const categoryRoutes = require("./src/routes/categories.routes");
const userRoutes = require("./src/routes/auth.router");

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
