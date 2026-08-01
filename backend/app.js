const express = require('express')
const app = express()

const productRoutes = require('./src/routes/products.routes')

app.use(express.json())

app.use('/api/products', productRoutes)

module.exports = app;