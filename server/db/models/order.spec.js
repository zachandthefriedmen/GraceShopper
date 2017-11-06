/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const Order = db.model('order');
const Product = db.model('product');
const OrderProduct = db.model('order-product');

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('instanceMethods', () => {
    let newOrder;
    let orderProducts;

    beforeEach(async () => {
      newOrder = await Order.create({
        email: 'bento@bento.com',
      });

      await Promise.all([
        Product.create({ name: 'Awesome ball', available: true }),
        Product.create({ name: 'Delicious bone', available: true }),
        Product.create({ name: 'Strong leash', available: true }),
      ]);

      await newOrder.setProducts([1, 2]);

      orderProducts = await OrderProduct.findAll({ where: { orderId: newOrder.id } });

      Promise.all([
        orderProducts[0].update({ quantity: 3, price: 4.99 }),
        orderProducts[1].update({ quantity: 2, price: 1.99 }),
      ]);
    });

    describe('addOrUpdateCartItem', () => {
      it('updates the OrderProduct and returns it', async () => {
        // test the price before updating
        expect(orderProducts[0].price).to.be.equal(4.99);

        const orderProduct = await newOrder.addOrUpdateCartItem(1, 5.99, 7);

        expect(orderProduct.price).to.be.equal(5.99);
        expect(orderProduct.quantity).to.be.equal(7);
      });
    });

    // describe('totalQuantity', () => {
    //   xit('returns the total price of the order', () => {
    //     expect(newOrder.totalQuantity).to.be.equal(5);
    //   });
    // });
  });
});
