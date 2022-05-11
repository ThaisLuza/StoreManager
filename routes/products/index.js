const express = require('express');
const productController = require('../../controllers/productController');
const validateProduct = require('../../middlewares/validProduct');

const routeProduct = express.Router();

routeProduct.get('/', productController.getAllProducts);

routeProduct.post('/', validateProduct, productController.createProduct);

routeProduct.get('/:id', productController.getProductsById);

routeProduct.put('/:id', validateProduct, productController.updateProduct);

routeProduct.delete('/:id', productController.deleteProduct);

module.exports = routeProduct;