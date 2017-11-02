/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('/api/user/', () => {
    const bentosEmail = 'bento@puppy.dog';

    beforeEach(() => {
      return User.create({
        firstName: 'Bento',
        lastName: 'Thor',
        email: bentosEmail
      });
    });

    it('GET /api/user', () => {
      return request(app)
        .get('/api/user')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].email).to.be.equal(bentosEmail);
        });
    });
  }); // end describe('/api/users')
}); // end describe('User routes')
