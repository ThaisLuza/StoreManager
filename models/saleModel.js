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

module.exports = {
  getAllSales,
  getSalesById,
};