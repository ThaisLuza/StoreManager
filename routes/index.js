const router = require('express').Router();
const productRouter = require('./products/index');
const saleRouter = require('./sales/index');

router.use('/products', productRouter);
router.use('/sales', saleRouter);

module.exports = router;