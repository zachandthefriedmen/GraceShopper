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
    res.json(await Order.findById(req.params.id, {
      include: [{
        model: User,
        attributes: ['id', 'email', 'firstName', 'lastName', 'admin']
      }]
    }));
  }
  catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    order.update(req.body);
    res.sendStatus(202);
  }
  catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try { res.json(await Order.create(req.body)); }
  catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  try { await Order.destroy({ where: { id }}); }
  catch (err) { next(err); }

  res.sendStatus(204);
});
