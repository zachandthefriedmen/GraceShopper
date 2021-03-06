const router = require('express').Router();
const { User, Order, OrderProduct } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    res.json(await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'firstName', 'lastName', 'admin']
    }));
  }
  catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    res.json(await User.findById(req.params.id, {
      attributes: ['id', 'email', 'firstName', 'lastName', 'admin']
    }));
  }
  catch (err) { next(err); }
});

router.get('/:id/orders', async (req, res, next) => { // get all orders by user id
  try {
    const orders = await Order.findAll({ where: { userId: req.params.id } });

    const OPPromises = orders.map(order => {
      return OrderProduct.findAll({
        where: { orderId: order.id }
      });
    });

    const orderProducts = await Promise.all(OPPromises);

    const returnArray = orders.map((order, i) => {
      order.dataValues.orderProducts = orderProducts[i];
      return order;
    });

    res.json(returnArray);
  }
  catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);
    await user.update(req.body);
    res.status(202).json(user);
  }
  catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try { res.json(await User.create(req.body)); }
  catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  try { await User.destroy({ where: { id } }); }
  catch (err) { next(err); }

  res.sendStatus(204);
});
