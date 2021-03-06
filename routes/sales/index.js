const express = require('express');
const saleController = require('../../controllers/saleController');
const validateSale = require('../../middlewares/validSale');

const routeSale = express.Router();

routeSale.get('/', saleController.getAllSales);

routeSale.post('/', validateSale, saleController.createSale);

routeSale.get('/:id', saleController.getSalesById);

routeSale.put('/:id', validateSale, saleController.updateSale);

routeSale.delete('/:id', saleController.deleteSale);

module.exports = routeSale;
