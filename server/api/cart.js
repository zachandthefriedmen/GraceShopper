const router = require('express').Router();
const { Order } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    req.session.cookie.orderId
      ? res.json(await Order.findById(req.session.cookie.orderId))
      : res.sendStatus(204);
  }
  catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const cart = await Order.findById(req.params.id);
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

    req.session.cookie.orderId = cart.id;

    res.json(cart);
  }
  catch (err) { next(err); }
});
