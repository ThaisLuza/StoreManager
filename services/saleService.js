const saleModel = require('../models/saleModel');

const getAllSales = async () => {
  const sales = await saleModel.getAllSales();

  return sales;
};

const getSalesById = async (id) => {
  const sale = await saleModel.getSalesById(id);

  if (!sale) throw new Error('error');

  return sale;
};
 
module.exports = {
  getAllSales,
  getSalesById,
};