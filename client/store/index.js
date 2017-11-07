import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import product from './product';
import category from './category';
import review from './review';
import orders from './orders';
import cart from './cart';
import accounts from './accounts';


const reducer = combineReducers({ user, product, category, review, orders, cart, accounts });

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
));

const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './product';
export * from './category';
export * from './review';
export * from './orders';
export * from './cart';
export * from './accounts';
