const router = require('express').Router();
module.exports = router;

router.use('/user', require('./user'));
router.use('/product', require('./product'));
router.use('/category', require('./category'));
router.use('/review', require('./review'));
router.use('/order', require('./order'));


router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
