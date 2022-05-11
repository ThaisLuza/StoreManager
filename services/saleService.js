const saleModel = require('../models/saleModel');
const erroHandler = require('../utils/erroHandler');

const getAllSales = async () => {
  const sales = await saleModel.getAllSales();

  return sales;
};

const getSalesById = async (id) => {
  const sale = await saleModel.getSalesById(id);

  if (!sale) throw new Error('error');

  return sale;
};

const createSale = async (data) => {
  const newSale = await saleModel.createSale();

  // para cada elemento do array data(que são as informações passadas no body), chamamos a função createSaleProduct que insere os dados na tabela e retorna o novo id(insertId) e o objeto itemsSold com as novas informações

  await data.forEach(({ productId, quantity }) =>
    saleModel.createSaleProduct(newSale.insertId, productId, quantity));
  return { id: newSale.insertId, itemsSold: data };
};

const updateSale = async (id, data) => {
  const verifyId = await getSalesById(id);
  console.log(id);

  if (!verifyId) throw erroHandler(404, 'Sale not found');

  await data.forEach((sale) =>
    saleModel.updateSale(id, sale.productId, sale.quantity));
    return ({ saleId: id, itemUpdated: data });
};

module.exports = {
  getAllSales,
  getSalesById,
  createSale,
  updateSale,
};
