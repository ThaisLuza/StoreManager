const productModel = require('../models/productModel');

const getAllProducts = async () => {
  const products = await productModel.getAllProducts();

  return products;
};

const getProductsById = async (id) => {
  const product = await productModel.getProductsById(id);

  if (!product) throw new Error('error');

  return product;
};
 
module.exports = {
  getAllProducts,
  getProductsById,
};