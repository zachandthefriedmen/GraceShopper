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
