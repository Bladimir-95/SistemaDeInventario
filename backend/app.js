const express = require('express')
const cors = require('cors')

const app = express()

const productRoutes = require('./src/routes/products.routes')

app.use(cors())
app.use(express.json())

app.use('/api/products', productRoutes)

module.exports = app;