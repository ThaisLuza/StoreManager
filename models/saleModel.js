const connection = require('./connection');

const serialize = (data) => ({
    saleId: data.sale_id,
    date: data.date,
    productId: data.product_id,
    quantity: data.quantity,
  });

const getAllSales = async () => {
  const query = `
  SELECT
  sp.sale_id,
  sa.date,
  sp.product_id,
  sp.quantity  
  FROM sales_products AS sp
  JOIN sales AS sa ON sa.id = sp.sale_id
  ORDER BY sp.sale_id, sp.product_id;
  `;
  const [sales] = await connection.execute(query);

  return sales.map(serialize);
};

const getSalesById = async (id) => {
  const query = `
  SELECT
  sa.date,
  sp.product_id,
  sp.quantity  
  FROM sales_products AS sp
  JOIN sales AS sa ON sp.sale_id = sa.id
  WHERE sa.id = ?;
  `;
  const [sale] = await connection.execute(query, [id]);

  if (sale.length === 0) return null;

  return sale.map(serialize);
};

const createSale = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
  const [newSale] = await connection.execute(query);
  return newSale;
};

const createSaleProduct = async (id, productId, quantity) => {
  const query = `
  INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?,?,?)`;
  await connection.execute(query, [id, productId, quantity]);
};

const updateSale = async (id, productId, quantity) => {
  const query = `
  UPDATE StoreManager.sales_products 
  SET product_id = ?, quantity = ? WHERE sale_id = ?`;
  const [update] = await connection.execute(query, [productId, quantity, id]);
  return update.insertId;
};

const deleteSale = async (id) => {
  await connection.execute('DELETE FROM StoreManager.sales_products WHERE sale_id = ?', [id]);
};

module.exports = {
  getAllSales,
  getSalesById,
  createSale,
  createSaleProduct,
  updateSale,
  deleteSale,
};