const router = require('express').Router();
const { Review, User, Product } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    res.json(await Review.findAll({
      include:
      [{
        model: User,
        attributes: ['id', 'email', 'firstName', 'lastName', 'admin']
      },
        Product
      ]
    }
    ));
  }
  catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try { res.json(await Review.findById(req.params.id, {
    include:
    [{
      model: User,
      attributes: ['id', 'email', 'firstName', 'lastName', 'admin']
    },
      Product
    ]
  })); }
  catch (err) { next(err); }
});
