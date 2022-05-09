const connection = require('./connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id';
  const [products] = await connection.execute(query);

  return products;
};

const getProductsById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id=?';
  const [product] = await connection.execute(query, [id]);

  if (product.length === 0) return null;

  return product[0];
};

module.exports = {
  getAllProducts,
  getProductsById,
};
