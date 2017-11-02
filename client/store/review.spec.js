/* global describe beforeEach afterEach it */

import { expect } from 'chai';
import { fetchReviews, fetchReview, fetchReviewsForProduct, createReview, editReview, removeReview } from './review';
import { mockAxios } from './index.spec';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../history';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Review thunk creators', () => {
  let store;

  const initialState = { reviews: [] };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.reset();
    store.clearActions();
  });

  describe('fetchReviews', () => {
    it('eventually dispatches the GET_REVIEWS action', () => {
      const fakeReviews = [{ name: 'review1' }, { name: 'review2' }];
      mockAxios.onGet('/api/review').replyOnce(200, fakeReviews);
      return store.dispatch(fetchReviews())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('GET_REVIEWS');
          expect(actions[0].reviews).to.be.deep.equal(fakeReviews);
        });
    });
  });

  describe('fetchReview', () => {
    it('eventually dispatches the GET_REVIEW action', () => {
      const fakeReview = { id: 1, name: 'review1' };
      mockAxios.onGet(`/api/review/${fakeReview.id}`).replyOnce(200, fakeReview);
      return store.dispatch(fetchReview(fakeReview.id))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('GET_REVIEW');
          expect(actions[0].review).to.be.deep.equal(fakeReview); // why reviews and not review???
        });
    });
  });

  describe('fetchReviewsForProduct', () => {
    it('eventually dispatches the GET_PRODUCT_REVIEWS action', () => {
      const fakeReviews = [{ id: 1, name: 'review1' }];
      const fakeProduct = { id: 1, name: 'bento1' };
      mockAxios.onGet(`/api/review/product/${fakeProduct.id}`).replyOnce(200, fakeReviews);
      return store.dispatch(fetchReviewsForProduct(fakeProduct.id))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('GET_PRODUCT_REVIEWS');
          expect(actions[0].reviews).to.be.deep.equal(fakeReviews); // why reviews and not review???
        });
    });
  });

  describe('createReview', () => {
    it('eventually dispatches the POST_REVIEW action', () => {
      const fakeReview = { name: 'review1' };
      mockAxios.onPost('/api/review').replyOnce(200, fakeReview);
      return store.dispatch(createReview(fakeReview))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('POST_REVIEW');
          expect(actions[0].review).to.be.deep.equal(fakeReview);
        });
    });
  });

  describe('editReview', () => {
    it('eventually dispatches the PUT_REVIEW action', () => {
      const fakeReview = { id: 1, name: 'review1' };
      mockAxios.onPut(`/api/review/${fakeReview.id}`).replyOnce(204, fakeReview);
      return store.dispatch(editReview(fakeReview.id, fakeReview))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('PUT_REVIEW');
          expect(actions[0].review).to.be.deep.equal(fakeReview);
        });
    });
  });

  describe('removeReview', () => {
    it('eventually dispatches the DELETE_REVIEW action', () => {
      const fakeReview = { id: 1, name: 'review1' };
      mockAxios.onDelete(`/api/review/${fakeReview.id}`).replyOnce(204);
      return store.dispatch(removeReview(fakeReview.id))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('DELETE_REVIEW');
        });
    });
  });

});
