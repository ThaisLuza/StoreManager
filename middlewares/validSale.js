// const Joi = require('joi');

// const SALES = Joi.object({
//   productId: Joi.required(),
//   quantity: Joi.number().min(1).required(),
// });

// const validateSales = (req, res, next) => {
//   const data = req.body;
//   // console.log(data)

//   data.forEach(({ productId, quantity }) => {
//     const { error } = SALES.validate({ productId, quantity });

//     if (error) {
//       const { type } = error.details[0];
//       if (type === 'any.required') {
//         next({ status: 400, message: error.message });
//       }
//       next({ status: 422, message: error.message });
//     }

//     next();
//   });
// };

const validateSales = (req, res, next) => {
  const [{ productId, quantity }] = req.body;

  if (!productId) return res.status(400).json({ message: '"productId" is required' });

  if (quantity < 1) {
 return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' }); 
}
 if (!quantity) {
   return res.status(400).json({ message: '"quantity" is required' });
 }
 next();
};

  module.exports = validateSales;