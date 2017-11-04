/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const { Category } = require('../db/models');

describe('Category routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/category/', () => {
    let treats, toys;

    beforeEach(async () => {
      treats = await Category.create({ name: 'treats' });
      toys = await Category.create({ name: 'toys' });
    });

    it('GET /api/category', () => {
      return request(app)
        .get('/api/category')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[1].id).to.be.equal(treats.id);
          expect(res.body[0].name).to.be.equal(toys.name);
        });
    });

    it('GET /api/category/:id', () => {
      return request(app)
        .get(`/api/category/${treats.id}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.be.equal(treats.name);
        });
    });

    it('PUT /api/category/:id', () => {
      return request(app)
        .put(`/api/category/${treats.id}`)
        .send({ name: 'balls' })
        .expect(202)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.be.equal('balls');
        });
    });

    it('POST /api/category/', () => {
      return request(app)
        .post('/api/category')
        .send({ name: 'leashes' })
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.be.equal('leashes');
        });
    });

    it('DELETE /api/category/:id', () => {
      return request(app)
        .delete(`/api/category/${toys.id}`)
        .expect(204)
        .then(async res => {
          const notToys = await Category.find({ where: { name: 'toys' }});
          expect(notToys).to.equal(null);
        });
    });
  }); // end describe('/api/categorys')
}); // end describe('Category routes')
