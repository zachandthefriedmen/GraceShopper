import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import product from './product';
import category from './category';
import review from './review';
import order from './order';


const reducer = combineReducers({ user, product, category, review, order });

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
export * from './order';
