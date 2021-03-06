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
          expect(res.body.order.email).to.be.equal(order1.email);
        });
    });

    it('PUT /api/order/:id', () => {
      return request(app)
        .put(`/api/order/${order1.id}`)
        .send({ status: 'processing' })
        .expect(202)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.be.equal('processing');
          expect(res.body.email).to.be.equal(order1.email);
        });
    });

    it('POST /api/order/', () => {
      return request(app)
        .post('/api/order')
        .send({ status: 'completed', email: 'rheya@little.dog'})
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.email).to.be.equal('rheya@little.dog');
          expect(res.body.status).to.be.equal('completed');
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
