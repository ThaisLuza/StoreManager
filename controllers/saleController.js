const saleService = require('../services/saleService');

const getAllSales = async (req, res, _next) => {
  try {
    const sales = await saleService.getAllSales();

    return res.status(200).json(sales);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getSalesById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await saleService.getSalesById(id);

    if (sale.error) return next(sale.error.message);

    return res.status(200).json(sale);
  } catch (error) {
    return res.status(404).json({ message: 'Sale not found' });
  }
};

const createSale = async (req, res, _next) => {
  try {
    const data = req.body;
     // console.log(data)

    const newSale = await saleService.createSale(data);

    return res.status(201).json(newSale);
  } catch (error) {
    // console.log(error)
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAllSales,
  getSalesById,
  createSale,
};