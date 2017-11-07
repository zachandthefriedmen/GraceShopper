const router = require('express').Router();
const { Order, User } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    res.json(await Order.findAll({
      include: [{
        model: User,
        attributes: ['id', 'email', 'firstName', 'lastName', 'admin']
      }]
    }
    ));
  }
  catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id, {
      include: [{
        model: User,
        attributes: ['id', 'email', 'firstName', 'lastName', 'admin']
      }]
    });

    const orderProducts = await order.getProducts();

    res.json({order, orderProducts});
  }
  catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    await order.update(req.body);
    const orderProducts = await order.getProducts();
    res.status(202).json({order, orderProducts});
  }
  catch (err) { next(err); }
});


router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    req.session.cookie.orderId = order.id;
    res.json(order);
  }
  catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  try { await Order.destroy({ where: { id } }); }
  catch (err) { next(err); }

  res.sendStatus(204);
});
