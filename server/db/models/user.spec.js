/* global describe beforeEach it */

const {expect} = require('chai');
const db = require('../index');
const User = db.model('user');

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let bento;

      beforeEach(() => {
        return User.create({
          firstName: 'Bento',
          lastName: 'Thor',
          email: 'bento@puppy.dog',
          password: 'bones',
        })
          .then(user => {
            bento = user;
          });
      });

      it('returns true if the password is correct', () => {
        expect(bento.correctPassword('bones')).to.be.equal(true);
      });

      it('returns false if the password is incorrect', () => {
        expect(bento.correctPassword('bonez')).to.be.equal(false);
      });
    }); // end describe('correctPassword')
  }); // end describe('instanceMethods')
}); // end describe('User model')
