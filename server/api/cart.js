const router = require('express').Router();
const { Order } = require('../db/models');
module.exports = router;

router.put('/:id', async (req, res, next) => {
  try {
    const cart = await Order.findById(req.params.orderId);

    const productId = req.body.productId;
    const price = req.body.price;
    const quantity = req.body.quantity;

    await cart.addOrUpdateCartItem(productId, price, quantity);

    res.status(202).json(cart);
  }
  catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const cart = await Order.create({ status: 'open' });

    const productId = req.body.productId;
    const price = req.body.price;
    const quantity = req.body.quantity;

    await cart.addOrUpdateCartItem(productId, price, quantity);

    res.json(cart);
  }
  catch (err) { next(err); }
});
