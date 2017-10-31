const User = require('./user');
const Order = require('./order');
const Category = require('./category');
const Product = require('./product');
const Review = require('./review');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Product.belongsToMany(Category, { through: 'product-category' });
Category.belongsToMany(Product, { through: 'product-category' });

User.hasMany(Order);
Order.belongsTo(User);

Review.belongsTo(User);
Review.belongsTo(Product);
User.hasMany(Review);
Product.hasMany(Review);

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Order,
  Category,
  Product,
  Review
};
