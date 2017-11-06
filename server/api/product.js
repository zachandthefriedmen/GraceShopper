const router = require('express').Router();
const { Product, Category, Review, User } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try { res.json(await Product.findAll()); }
  catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try { res.json(await Product.findById(req.params.id,
    { include: [Category] })); }
  catch (err) { next(err); }
});

router.get('/:id/reviews', async (req, res, next) => { //get all reviews by product ID including user who posted
  try { res.json(await Review.findAll({
    where: {
      productId: req.params.id
    },
    include:
    [{
      model: User,
      attributes: ['id', 'email', 'firstName', 'lastName', 'admin']
    }]
  })); }
  catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    product.update(req.body);
    res.sendStatus(202);
  }
  catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try { res.json(await Product.create(req.body)); }
  catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  try { await Product.destroy({ where: { id }}); }
  catch (err) { next(err); }

  res.sendStatus(204);
});
