const router = require('express').Router();
const { Category, Product } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll({include: [Product]});
    res.json(categories);
  }
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
    await category.update(req.body);
    res.status(202).json(category);
  }
  catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try { res.json(await Category.create(req.body)); }
  catch (err) { next(err); }
});

// COMMENT - Make sure this behaves like you think. If you hit an error, it may 
// still try to send status 204, resulting in another (uncaught!) error
router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  try { await Category.destroy({ where: { id }}); }
  catch (err) { next(err); }

  res.sendStatus(204);
});
