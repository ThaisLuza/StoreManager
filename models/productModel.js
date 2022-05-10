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

const getProductByName = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name=?';

  const [product] = await connection.execute(query, [name]);

  return product[0];
};

const createProduct = async (name, quantity) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?,?)';
  const [newId] = await connection.execute(query, [name, quantity]);

  const newProduct = {
    id: newId.insertId,
    name,
    quantity,
  };

  return newProduct;
};

const updateProduct = async (id, { name, quantity }) => {
  const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?';
  const newData = await connection.execute(query, [name, quantity, id]);
  
  if (newData.length === 0) return null;

   return {
    id, 
    name,
    quantity,
  };
};

const deleteProduct = async (id) => {
   await connection.execute('DELETE FROM StoreManager.products WHERE id = ?', [id]);
  // const delete = await connection.execute(query,[id])
};

module.exports = {
  getAllProducts,
  getProductsById,
  getProductByName,
  createProduct,
  updateProduct,
  deleteProduct,
};
