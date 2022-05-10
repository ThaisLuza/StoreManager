const Joi = require('joi');

const SALES = Joi.object({
  productId: Joi.number().min(1).required(),
  quantity: Joi.number().min(1).required(),
});

const validateSales = (req, res, next) => {
  const { productId, quantity } = req.body;

  const { error } = SALES.validate({ productId, quantity,
  });

  if (error) next({ status: 400, message: error.message });

  next();
};

module.exports = validateSales;