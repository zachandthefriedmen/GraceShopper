const router = require('express').Router();
const { Category } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try { res.json(await Category.findAll()); }
  catch (err) { next(err); }
});
