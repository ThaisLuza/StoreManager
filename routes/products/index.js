const express = require('express');
const productController = require('../../controllers/productController');
const validateProducts = require('../../middlewares/validProduct');

const routeProduct = express.Router();

routeProduct.get('/', productController.getAllProducts);

routeProduct.post('/', validateProducts, productController.createProduct);

routeProduct.get('/:id', productController.getProductsById);

routeProduct.put('/:id', validateProducts, productController.updateProduct);

routeProduct.delete('/:id', productController.deleteProduct);

module.exports = routeProduct;