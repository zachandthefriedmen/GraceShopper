const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT
  },
  images: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  description: Sequelize.TEXT,
  rating: Sequelize.FLOAT,
  available: {
    type: Sequelize.BOOL,
    allowNull: false,
  }
}, {
  getterMethods: {
    url() {
      return '/product/' + this.id;
    }
  }
});

module.exports = Product;

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
