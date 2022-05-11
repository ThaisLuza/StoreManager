const express = require('express');
const saleController = require('../../controllers/saleController');
// const validateSale = require('../../middlewares/validSale');

const routeSale = express.Router();

routeSale.get('/', saleController.getAllSales);

routeSale.post('/', saleController.createSale);

routeSale.get('/:id', saleController.getSalesById);

module.exports = routeSale;
