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

module.exports = {
  getAllSales,
  getSalesById,
};