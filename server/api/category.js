const router = require('express').Router();
const { Category, Product } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try { res.json(await Category.findAll()); }
  catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    res.json(await Category.find({
      where: { id: req.params.id },
      include: [Product]
    }));
  }
  catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    category.update(req.body);
    res.sendStatus(202);
  }
  catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try { res.json(await Category.create(req.body)); }
  catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  try { await Category.destroy({ where: { id }}); }
  catch (err) { next(err); }

  res.sendStatus(204);
});
