const productModel = require('../models/productModel');

const erroHandler = (status, message) => ({
  status, message,
});

const getAllProducts = async () => {
  const products = await productModel.getAllProducts();

  return products;
};

const getProductsById = async (id) => {
  const product = await productModel.getProductsById(id);

  if (!product) throw new Error('error');

  return product;
};

const createProduct = async (name, quantity) => {
  const verifyProduct = await productModel.getProductByName(name);

  if (verifyProduct) throw erroHandler(409, 'Product already exists');

  const newProduct = await productModel.createProduct(name, quantity);

  return newProduct;
};
 
module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
};