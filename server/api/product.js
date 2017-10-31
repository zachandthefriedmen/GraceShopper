const router = require('express').Router();
const { Product, Category } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try { res.json(await Product.findAll()); }
  catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try { res.json(await Product.findById(req.params.id)); }
  catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id,
      { include: [Category] });
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
