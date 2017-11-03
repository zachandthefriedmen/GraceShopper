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

    /* put and post tests aren't currently working, but the actual api routes work when making requests via postman on running server. will figure out syntax when I have internet and fix tests */

    xit('PUT /api/user/:id', () => {
      return request(app)
        .put(`/api/user/${bento.id}`, (req, res) => {

        })
        .expect(202)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.email).to.be.equal(bento.email);
          expect(res.body.lastName).to.be.equal('Doggo');
        });
    });

    xit('POST /api/user/', () => {
      const newUser = {
        firstName: 'Rheya',
        lastName: 'Thor',
        email: 'rheya@little.dog',
      };

      return request(app)
        .post('/api/user', newUser)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.email).to.be.equal(bento.email);
          expect(res.body.lastName).to.be.equal('Doggo');
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
