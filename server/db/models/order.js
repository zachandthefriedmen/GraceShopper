const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  items: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    defaultValue: [],
  },
  status: {
    type: Sequelize.ENUM('open', 'created', 'processing', 'cancelled', 'completed', 'merged')
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
    validate: { isEmail: true },
  },
  orderDate: { type: Sequelize.DATE },
  address: { type: Sequelize.STRING }
}, {
  getterMethods: {
    totalPrice() {
      return this.items.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2);
    },
    totalQuantity () {
      return this.items.reduce((a, b) => a + b.qty, 0);
    }
  }
});

module.exports = Order;

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
