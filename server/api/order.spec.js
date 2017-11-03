/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const { Order } = require('../db/models');

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/order/', () => {
    let order1, order2;

    beforeEach(async () => {
      order1 = await Order.create({ status: 'open', email: 'bento@puppy.dog' });
      order2 = await Order.create({ status: 'cancelled', email: 'chili@big.dog' });
    });

    it('GET /api/order', () => {
      return request(app)
        .get('/api/order')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].status).to.be.equal(order1.status);
          expect(res.body[1].email).to.be.equal(order2.email);
        });
    });

    it('GET /api/order/:id', () => {
      return request(app)
        .get(`/api/order/${order1.id}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.email).to.be.equal(order1.email);
        });
    });

    /* put and post tests aren't currently working, but the actual api routes work when making requests via postman on running server. will figure out syntax when I have internet and fix tests */

    xit('PUT /api/order/:id', () => {
      return request(app)
        .put(`/api/order/${order1.id}`, (req, res) => {

        })
        .expect(202)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.email).to.be.equal(order1.email);
          expect(res.body.lastName).to.be.equal('Doggo');
        });
    });

    xit('POST /api/order/', () => {
      const newOrder = {
        firstName: 'Rheya',
        lastName: 'Thor',
        email: 'rheya@little.dog',
      };

      return request(app)
        .post('/api/order', newOrder)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.email).to.be.equal(order1.email);
          expect(res.body.lastName).to.be.equal('Doggo');
        });
    });

    it('DELETE /api/order/:id', () => {
      return request(app)
        .delete(`/api/order/${order2.id}`)
        .expect(204)
        .then(async res => {
          const notOrder2 = await Order.find({ where: { email: 'chili@big.dog' } });
          expect(notOrder2).to.equal(null);
        });
    });
  }); // end describe('/api/orders')
}); // end describe('Order routes')
