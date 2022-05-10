const Joi = require('joi');

const PRODUCT = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const validateProduct = (req, res, next) => {
  const { name, quantity } = req.body;

  const { error } = PRODUCT.validate({ name, quantity });

  // parte de código feita visualizando projeto da colega Rosália
  if (error) {
    const { type } = error.details[0];
    if (type === 'string.min' || type === 'number.min') {
      next({ status: 422, message: error.message });
    }
    next({ status: 400, message: error.message });
  }
  
  next();
};

module.exports = validateProduct;