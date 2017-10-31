const router = require('express').Router();
const { User } = require('../db/models');
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
