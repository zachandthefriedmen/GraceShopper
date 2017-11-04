/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const { User } = require('../db/models');

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/user/', () => {
    let bento, chili;

    beforeEach(async () => {
      bento = await User.create({
        firstName: 'Bento',
        lastName: 'Thor',
        email: 'bento@puppy.dog',
      });
      chili = await User.create({
        firstName: 'Chili',
        lastName: 'Thor',
        email: 'chili@big.dog',
      });
    });

    it('GET /api/user', () => {
      return request(app)
        .get('/api/user')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].email).to.be.equal(bento.email);
          expect(res.body[1].email).to.be.equal(chili.email);
        });
    });

    it('GET /api/user/:id', () => {
      return request(app)
        .get(`/api/user/${bento.id}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.email).to.be.equal(bento.email);
          expect(res.body.password).to.be.equal(undefined);
        });
    });

    it('PUT /api/user/:id', () => {
      return request(app)
        .put(`/api/user/${bento.id}`)
        .send({ lastName: 'Doggo' })
        .expect(202)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.email).to.be.equal(bento.email);
          expect(res.body.lastName).to.be.equal('Doggo');
        });
    });

    it('POST /api/user/', () => {
      return request(app)
        .post('/api/user')
        .send({
          firstName: 'Rheya',
          lastName: 'Thor',
          email: 'rheya@little.dog',
        })
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.email).to.be.equal('rheya@little.dog');
          expect(res.body.firstName).to.be.equal('Rheya');
        });
    });

    it('DELETE /api/user/:id', () => {
      return request(app)
        .delete(`/api/user/${chili.id}`)
        .expect(204)
        .then(async res => {
          const notChili = await User.find({ where: { firstName: 'Chili' } });
          expect(notChili).to.equal(null);
        });
    });
  }); // end describe('/api/users')
}); // end describe('User routes')
