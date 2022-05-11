// const express = require('express');
// const productController = require('./controllers/productController');
// const saleController = require('./controllers/saleController');
// const validateProduct = require('./middlewares/validProduct');

const app = require('./app');
require('dotenv').config();

// app.use(express.json());

// app.put('/products/:id', validateProduct, productController.updateProduct);

// app.get('/products/:id', productController.getProductsById);

// app.get('/products', productController.getAllProducts);

// app.post('/products', validateProduct, productController.createProduct);

// app.delete('/products/:id', validateProduct, productController.deleteProduct);

// app.post('/sales', saleController.createSale);

// app.get('/sales/:id', saleController.getSalesById);

// app.get('/sales', saleController.getAllSales);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
