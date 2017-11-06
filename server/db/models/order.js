const Sequelize = require('sequelize');
const db = require('../db');
const OrderProduct = require('./order-product');

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('open', 'created', 'processing', 'cancelled', 'completed', 'merged')
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: { isEmail: true },
  },
  orderDate: { type: Sequelize.DATE },
  address: { type: Sequelize.STRING }
},
  //
  // Commenting out getterMethods ideally to have this work done on front end. Retaining code for regression.
  //
  //  {
  //   getterMethods: {
  //     totalPrice() {
  //       return this.items.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2);
  //     },
  //     totalQuantity () {
  //       return this.items.reduce((a, b) => a + b.qty, 0);
  //     }
  //   }
  // }
);

module.exports = Order;

/**
 * instanceMethods
 */

Order.prototype.addOrUpdateCartItem = async function (productId, price, quantity) {
  const orderProduct = await OrderProduct.findOrCreate({
    where: { orderId: this.id, productId },
    defaults: { productId, price, quantity },
  });

  // spread the results of the findOrCreate
  const [op, created] = orderProduct;

  // gets just the data values from the returned instance
  const newOp = await op.get({ plain: true });

  // findOrCreate returns a boolean that says whether or not a new instance was created. If that boolean is false (meaning the item already existed in that order), we will update the orderProduct accordingly.
  if (!created) {
    await op.update({ price, quantity });
  }

  return newOp;
};

/**
 * classMethods
 */

/**
 * hooks
 */
