const express = require('express');
const productController = require('./controllers/productController');
const saleController = require('./controllers/saleController');
const middlewares = require('./middlewares');

const app = require('./app');
require('dotenv').config();

app.use(express.json());

app.put('/products/:id', middlewares.validateProduct, productController.updateProduct);

app.get('/products/:id', productController.getProductsById);

app.get('/products', productController.getAllProducts);

app.get('/sales/:id', saleController.getSalesById);

app.get('/sales', saleController.getAllSales);

app.post('/products', middlewares.validateProduct, productController.createProduct);

app.delete('/products/:id', productController.deleteProduct);

app.use((err, req, res, _next) => {
  if (err.status) {
 return res.status(err.status).json({ message: err.message });
 }
 console.log(err);
  return res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
