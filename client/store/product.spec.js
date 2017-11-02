/* global describe beforeEach afterEach it */

import { expect } from 'chai';
import { fetchProducts, fetchProduct, createProduct, editProduct } from './product';
import {mockAxios} from './index.spec';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../history';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Product thunk creators', () => {
  let store;

  const initialState = { products: [] };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.reset();
    store.clearActions();
  });

  describe('fetchProducts', () => {
    it('eventually dispatches the GET_PRODUCTS action', () => {
      const fakeProducts = [{ name: 'product1' }, { name: 'product2' }];
      mockAxios.onGet('/api/product').replyOnce(200, fakeProducts);
      return store.dispatch(fetchProducts())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('GET_PRODUCTS');
          expect(actions[0].products).to.be.deep.equal(fakeProducts);
        });
    });
  });

  describe('fetchProduct', () => {
    it('eventually dispatches the GET_PRODUCT action', () => {
      const fakeProduct = { id: 1, name: 'product1' };
      mockAxios.onGet(`/api/product/${fakeProduct.id}`).replyOnce(200, fakeProduct);
      return store.dispatch(fetchProduct(fakeProduct.id))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('GET_PRODUCT');
          expect(actions[0].products).to.be.deep.equal(fakeProduct); // why products and not product???
        });
    });
  });

  describe('createProduct', () => {
    it('eventually dispatches the POST_PRODUCT action', () => {
      const fakeProduct = { name: 'product1' };
      mockAxios.onPost('/api/product').replyOnce(200, fakeProduct);
      return store.dispatch(createProduct(fakeProduct))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('POST_PRODUCT');
          expect(actions[0].product).to.be.deep.equal(fakeProduct);
        });
    });
  });

  // code copied from user.spec.js left as example

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
