const router = require('express').Router();
const { Review, User, Product } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    res.json(await Review.findAll({
      include:
      [{
        model: User,
        // COMMENT - This is a great place to apply scopes or hooks, so you don't
        // have to manually specify these attributes each time
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

router.get('/product/:id', async (req, res, next) => {
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
    const review = await Review.findById(req.params.id);
    review.update(req.body);
    res.sendStatus(202);
  }
  catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try { res.json(await Review.create(req.body)); }
  catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  try { await Review.destroy({ where: { id }}); }
  catch (err) { next(err); }

  res.sendStatus(204);
});
