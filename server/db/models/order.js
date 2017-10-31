const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  items: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    defaultValue: [],
    // [{productId: 1, qty: 2, price: 4.65}]
  },
  status: {
    type: Sequelize.ENUM('open', 'created', 'processing', 'cancelled', 'completed')
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true },
  },
  orderDate: {
    type: Sequelize.DATE
  },
  sessionId: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  }
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

// totalPrice needs eager loading to load item objects
// address should be setter method from multiple form fields

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
