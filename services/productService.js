const productModel = require('../models/productModel');
const { erroHandler } = require('../utils/erroHandler');

const getAllProducts = async () => {
  const products = await productModel.getAllProducts();

  return products;
};

const getProductsById = async (id) => {
  const product = await productModel.getProductsById(id);

  if (!product) throw erroHandler(404, 'Product not found');

  return product;
};

const createProduct = async (name, quantity) => {
  const verifyProduct = await productModel.getProductByName(name);

  if (verifyProduct) throw erroHandler(409, 'Product already exists');

  const newProduct = await productModel.createProduct(name, quantity);

  return newProduct;
};
 
const updateProduct = async (id, data) => {
  const verifyId = await productModel.getProductsById(id);

  if (!verifyId) throw erroHandler(404, 'Product not found');

  const newData = await productModel.updateProduct(id, data);

  return newData;
};

const deleteProduct = async (id) => {
  const verifyId = await productModel.getProductsById(id);

  if (!verifyId) throw erroHandler(404, 'Product not found');

  await productModel.deleteProduct(id);
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};