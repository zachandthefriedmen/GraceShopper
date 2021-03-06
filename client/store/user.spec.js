/* global describe beforeEach afterEach it */

import {expect} from 'chai';
import {me, logout} from './user';
import {mockAxios} from './index.spec';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../history';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('User thunk creators', () => {
  let store;

  const initialState = {user: {}};

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.reset();
    store.clearActions();
  });

  describe('me', () => {
    it('eventually dispatches the GET_USER action', () => {
      const fakeUser = {email: 'Cody'};
      mockAxios.onGet('/auth/me').replyOnce(200, fakeUser);
      return store.dispatch(me())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('GET_USER');
          expect(actions[0].user).to.be.deep.equal(fakeUser);
        });
    });
  });

  describe('logout', () => {
    it('logout: eventually dispatches the REMOVE_USER action', () => {
      mockAxios.onPost('/auth/logout').replyOnce(204);
      return store.dispatch(logout())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('REMOVE_USER');
          expect(history.location.pathname).to.be.equal('/login');
        });
    });
  });
});
