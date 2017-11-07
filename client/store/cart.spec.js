/* global describe beforeEach afterEach it */

import { expect } from 'chai';
import { removeItem } from './cart';
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
    xit('eventually dispatches the REMOVE_CART_ITEM action', () => {
      const fakeOP = { id: 1, name: 'category1' };
      mockAxios.onDelete(`/api/category/${fakeCategory.id}`).replyOnce(204);
      return store.dispatch(removeCategory(fakeCategory.id))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('DELETE_CATEGORY');
        });
    });
  });

});
