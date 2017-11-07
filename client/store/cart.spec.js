/* global describe beforeEach afterEach it */

import { expect } from 'chai';
import { removeCartItem } from './cart';
import { mockAxios } from './index.spec';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../history';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Cart thunk creators', () => {
  let store;

  const initialState = { cart: {} };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.reset();
    store.clearActions();
  });

  describe('removeItem', () => {
    it('eventually dispatches the REMOVE_CART_ITEM action', () => {
      const fakeCart = { id: 1, name: 'category1', orderProducts: [{id: 1}] };
      mockAxios.onDelete(`/api/cart`).replyOnce(204);
      return store.dispatch(removeCartItem(fakeCart.id, fakeCart.orderProducts[0].id))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('REMOVE_CART_ITEM');
        });
    });
  });

});
