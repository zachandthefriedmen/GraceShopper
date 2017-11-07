/* global describe beforeEach afterEach it */

import { expect } from 'chai';
import { fetchOrders, fetchOrder, createOrder, editOrder, removeOrder } from './order';
import { mockAxios } from './index.spec';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../history';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Order thunk creators', () => {
  let store;

  const initialState = { orders: [] };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.reset();
    store.clearActions();
  });

  describe('fetchOrders', () => {
    it('eventually dispatches the GET_ORDERS action', () => {
      const fakeOrders = [{ name: 'order1' }, { name: 'order2' }];
      mockAxios.onGet('/api/order').replyOnce(200, fakeOrders);
      return store.dispatch(fetchOrders())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('GET_ORDERS');
          expect(actions[0].orders).to.be.deep.equal(fakeOrders);
        });
    });
  });

  describe('fetchOrder', () => {
    it('eventually dispatches the GET_ORDER action', () => {
      const fakeOrder = { id: 1, name: 'order1' };
      mockAxios.onGet(`/api/order/${fakeOrder.id}`).replyOnce(200, fakeOrder);
      return store.dispatch(fetchOrder(fakeOrder.id))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('GET_ORDER');
          expect(actions[0].order).to.be.deep.equal(fakeOrder); // why orders and not order???
        });
    });
  });

  describe('createOrder', () => {
    it('eventually dispatches the POST_ORDER action', () => {
      const fakeOrder = { name: 'order1' };
      mockAxios.onPost('/api/order').replyOnce(200, fakeOrder);
      return store.dispatch(createOrder(fakeOrder))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('POST_ORDER');
          expect(actions[0].order).to.be.deep.equal(fakeOrder);
        });
    });
  });

  describe('editOrder', () => {
    it('eventually dispatches the PUT_ORDER action', () => {
      const fakeOrder = { id: 1, name: 'order1' };
      mockAxios.onPut(`/api/order/${fakeOrder.id}`).replyOnce(204, fakeOrder);
      return store.dispatch(editOrder(fakeOrder.id, fakeOrder))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('PUT_ORDER');
          expect(actions[0].order).to.be.deep.equal(fakeOrder);
        });
    });
  });

  describe('removeOrder', () => {
    it('eventually dispatches the DELETE_ORDER action', () => {
      const fakeOrder = { id: 1, name: 'order1' };
      mockAxios.onDelete(`/api/order/${fakeOrder.id}`).replyOnce(204);
      return store.dispatch(removeOrder(fakeOrder.id))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('DELETE_ORDER');
        });
    });
  });

});
