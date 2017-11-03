const Sequelize = require('sequelize');
const db = require('../db');

const OrderProduct = db.define('order-product', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  price: {
    type: Sequelize.FLOAT,
  },
});

module.exports = OrderProduct;

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
