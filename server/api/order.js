const router = require('express').Router();
const { Order, User } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    res.json(await Order.findAll({
      include: [{
        model: User,
        attributes: ['id', 'email', 'firstName', 'lastName', 'admin']
      }]
    }
    ));
  }
  catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    let order = await Order.findById(req.params.id, {
      include: [{
        model: User,
        attributes: ['id', 'email', 'firstName', 'lastName', 'admin']
      }]
    });

    let orderProducts = await order.getProducts();

    // THE PROBLEM HERE IS ASYNC ISSUES. NOT MODIFYING orderProducts before sending response!!
    // let orderProducts = await OrderProduct.findAll({ where: { orderId: req.params.id }});
    // orderProducts.forEach(async product => {
    //   let productInfo = await Product.findById(product.dataValues.productId);
    //   product.dataValues.productId = productInfo;
    // });
    //MAP version... working maybe?? testing above with forEach first.
    // orderProducts.map(async product => {
    //   let newProduct = product;
    //   let productInfo = await Product.findById(product.productId);
    //   newProduct.productId = productInfo;
    //   return newProduct;
    // });O
    // console.log('ORDER PRODUCTS BEFORE RESPONSE: ', orderProducts);
    res.json({order, orderProducts});
  }
  catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    await order.update(req.body);
    res.status(202).json(order);
  }
  catch (err) { next(err); }
});


router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    req.session.cookie.orderId = order.id;
    res.json(order);
  }
  catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  try { await Order.destroy({ where: { id } }); }
  catch (err) { next(err); }

  res.sendStatus(204);
});
