/* global describe beforeEach afterEach it */

import { expect } from 'chai';
import { removeItem } from './category';
import { mockAxios } from './index.spec';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../history';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Category thunk creators', () => {
  let store;

  const initialState = { categories: [] };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.reset();
    store.clearActions();
  });

  describe('fetchCategories', () => {
    it('eventually dispatches the GET_CATEGORIES action', () => {
      const fakeCategories = [{ name: 'category1' }, { name: 'category2' }];
      mockAxios.onGet('/api/category').replyOnce(200, fakeCategories);
      return store.dispatch(fetchCategories())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('GET_CATEGORIES');
          expect(actions[0].categories).to.be.deep.equal(fakeCategories);
        });
    });
  });

  describe('fetchCategory', () => {
    it('eventually dispatches the GET_CATEGORY action', () => {
      const fakeCategory = { id: 1, name: 'category1' };
      mockAxios.onGet(`/api/category/${fakeCategory.id}`).replyOnce(200, fakeCategory);
      return store.dispatch(fetchCategory(fakeCategory.id))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('GET_CATEGORY');
          expect(actions[0].category).to.be.deep.equal(fakeCategory); // why categories and not category???
        });
    });
  });

  describe('createCategory', () => {
    it('eventually dispatches the POST_CATEGORY action', () => {
      const fakeCategory = { name: 'category1' };
      mockAxios.onPost('/api/category').replyOnce(200, fakeCategory);
      return store.dispatch(createCategory(fakeCategory))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('POST_CATEGORY');
          expect(actions[0].category).to.be.deep.equal(fakeCategory);
        });
    });
  });

  describe('editCategory', () => {
    it('eventually dispatches the PUT_CATEGORY action', () => {
      const fakeCategory = { id: 1, name: 'category1' };
      mockAxios.onPut(`/api/category/${fakeCategory.id}`).replyOnce(204, fakeCategory);
      return store.dispatch(editCategory(fakeCategory.id, fakeCategory))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('PUT_CATEGORY');
          expect(actions[0].category).to.be.deep.equal(fakeCategory);
        });
    });
  });

  describe('removeCategory', () => {
    it('eventually dispatches the DELETE_CATEGORY action', () => {
      const fakeCategory = { id: 1, name: 'category1' };
      mockAxios.onDelete(`/api/category/${fakeCategory.id}`).replyOnce(204);
      return store.dispatch(removeCategory(fakeCategory.id))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('DELETE_CATEGORY');
        });
    });
  });

});
