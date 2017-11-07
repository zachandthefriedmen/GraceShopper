const router = require('express').Router();
const { Order, OrderProduct } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    if (req.session.cookie.orderId) {
      const order = await Order.findById(req.session.cookie.orderId);
      const orderProducts = await order.getProducts();
      res.json({ order, orderProducts });
    }
    else { res.sendStatus(204); }
  }
  catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    const productId = req.body.productId;
    const price = req.body.price;
    const quantity = req.body.quantity;
    await order.addOrUpdateCartItem(productId, price, quantity);

    const orderProducts = await order.getProducts();

    res.status(202).json({ order, orderProducts });
  }
  catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create({ status: 'open' });

    const productId = req.body.productId;
    const price = req.body.price;
    const quantity = req.body.quantity;

    await order.addOrUpdateCartItem(productId, price, quantity);

    const orderProducts = await order.getProducts();

    req.session.cookie.orderId = order.id;

    res.json({ order, orderProducts });
  }
  catch (err) { next(err); }
});

router.delete('/orderProduct', async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const orderId = req.body.orderId;

    await OrderProduct.destroy({
      where: { productId, orderId }
    });

    res.sendStatus(204);
  }
  catch (err) { next(err); }
});
