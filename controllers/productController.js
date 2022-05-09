const productService = require('../services/productService');

const getAllProducts = async (req, res, _next) => {
  try {
    const products = await productService.getAllProducts();

    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json({ message: error.message });
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

module.exports = {
  getAllProducts,
  getProductsById,
};