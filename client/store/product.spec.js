/* global describe beforeEach afterEach it */

import {expect} from 'chai';
import {fetchProducts, createProduct, editProduct, removeProduct} from './product';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../history';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('thunk creators', () => {
  let store;
  let mockAxios;

  const initialState = {products: []};

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  // describe('me', () => {
  //   it('eventually dispatches the GET USER action', () => {
  //     const fakeUser = {email: 'Cody'};
  //     mockAxios.onGet('/auth/me').replyOnce(200, fakeUser);
  //     return store.dispatch(me())
  //       .then(() => {
  //         const actions = store.getActions();
  //         expect(actions[0].type).to.be.equal('GET_USER');
  //         expect(actions[0].user).to.be.deep.equal(fakeUser);
  //       });
  //   });
  // });

  describe('fetchProducts', () => {
    it('eventually dispatches the GET_PRODUCTS action', () => {
      const fakeProducts = [{ name: 'product1' }, { name: 'product2'}];
      mockAxios.onGet('/api/product').replyOnce(200, fakeProducts);
      return store.dispatch(fetchProducts())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('GET_PRODUCTS');
          expect(actions[0].products).to.be.deep.equal(fakeProducts);
        });
    });
  });

  // describe('logout', () => {
  //   it('logout: eventually dispatches the REMOVE_USER action', () => {
  //     mockAxios.onPost('/auth/logout').replyOnce(204);
  //     return store.dispatch(logout())
  //       .then(() => {
  //         const actions = store.getActions();
  //         expect(actions[0].type).to.be.equal('REMOVE_USER');
  //         expect(history.location.pathname).to.be.equal('/login');
  //       });
  //   });
  // });
});
