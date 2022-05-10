const productService = require('../services/productService');

const getAllProducts = async (req, res, _next) => {
  try {
    const products = await productService.getAllProducts();

    return res.status(200).json(products);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getProductsById = async (req, res, _next) => {
   try {
    const { id } = req.params;
    const product = await productService.getProductsById(id);

    // if (product.error) return next(product.error.message);

    return res.status(200).json(product);
  } catch (error) {
    return res.status(404).json({ message: 'Product not found' });
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const newProduct = await productService.createProduct(name, quantity);

    return res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const data = { name, quantity };
    const newData = await productService.updateProduct(id, data);

    return res.status(200).json(newData);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    await productService.deleteProduct(id);
    return res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};