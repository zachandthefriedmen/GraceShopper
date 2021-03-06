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


router.put('/:id', async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    review.update(req.body);
    res.sendStatus(202);
  }
  catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    let review = await Review.create(req.body);
    let loadedReview = await Review.findById(review.id, {include: [User]});
    res.json(loadedReview); }
  catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  try { await Review.destroy({ where: { id }}); }
  catch (err) { next(err); }

  res.sendStatus(204);
});
