const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  items: {
    type: Sequelize.ARRAY(Sequelize.INT),
    defaultValue: [],
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
    // is this a string? or int? what is session? who am I? what is this?
  }
}, {
  getterMethods: {
    totalPrice() {
      return this.items.reduce((a, b) => a + b.price);
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
