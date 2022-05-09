const express = require('express');
const productController = require('./controllers/productController');
const saleController = require('./controllers/saleController');

const app = require('./app');
require('dotenv').config();

app.use(express.json());

app.get('/products/:id', productController.getProductsById);

app.get('/products', productController.getAllProducts);

app.get('/sales/:id', saleController.getSalesById);

app.get('/sales', saleController.getAllSales);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
