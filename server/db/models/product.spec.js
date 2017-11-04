/* global describe beforeEach it */

const {expect} = require('chai');
const db = require('../index');
const Product = db.model('product');

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('getterMethods', () => {
    describe('url', () => {
      let ball;

      beforeEach(() => {
        return Product.create({
          name: 'Awesome ball',
          available: true,
        })
          .then(product => {
            ball = product;
          });
      });

      it('returns a URL slug with the product ID', () => {
        expect(ball.url).to.be.equal(`/product/${ball.id}`);
      });
    });
  });
});
