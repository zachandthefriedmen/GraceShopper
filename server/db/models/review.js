const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  stars: {
    type: Sequelize.INTEGER,
    validate: { min: 1, max: 5 }
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
});

module.exports = Review;

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
