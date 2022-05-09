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
    // console.log('create', err.message);
    next(err);
  }
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
};