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

const createSale = async (data) => {
  const newSale = await saleModel.createSale();

  // para cada elemento do array data(que são as informações passadas no body), chamamos a função createSaleProduct que insere os dados na tabela e retorna o novo id(insertId) e o objeto itemsSold com as novas informações 
  await data.forEach(
    ({ productId, quantity }) => (
      saleModel.createSaleProduct(newSale.insertId, productId, quantity)
    ),
  );
  return ({ id: newSale.insertId, itemsSold: data });
};
 
module.exports = {
  getAllSales,
  getSalesById,
  createSale,
};