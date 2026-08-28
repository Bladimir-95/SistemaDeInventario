const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require('fs');

const app = express();

const productRoutes = require("./src/routes/products.routes");
const categoryRoutes = require("./src/routes/categories.routes");
const userRoutes = require("./src/routes/auth.router");

// Permite que el frontend se comunique con el backend desde otro origen.
// ⚠️ En producción, configurar CORS para permitir solo el dominio del frontend.
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);

console.log("__dirname:", __dirname);
console.log(
  "uploads:",
  path.join(__dirname, "uploads")
);
const imagePath = path.join(
  __dirname,
  "uploads",
  "1787936209405-Camisas-Para-Hombre-44017341-1259_1.jpg"
);

console.log("¿Existe la imagen?", fs.existsSync(imagePath));

console.log("Archivos en uploads:", fs.readdirSync(path.join(__dirname, "uploads")));



//images es la puerta pública y uploads es dónde están físicamente los archivos
app.use("/images", express.static(path.join(__dirname, "uploads")));

module.exports = app;
