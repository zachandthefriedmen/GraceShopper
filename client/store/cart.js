import axios from 'axios';
import history from '../history';

/* -----------------    ACTION TYPES ------------------ */

const GET_CART = 'GET_CART';
const CREATE_NEW_CART = 'CREATE_NEW_CART';
const ADD_OR_UPDATE_CART_ITEM = 'ADD_OR_UPDATE_CART_ITEM';
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
const CLEAR_CART = 'CLEAR_CART';

/* ------------   ACTION CREATORS     ------------------ */

const getCart = cart => ({ type: GET_CART, cart });
const createNewCart = cart => ({ type: CREATE_NEW_CART, cart });
const updateCartItem = cart => ({ type: ADD_OR_UPDATE_CART_ITEM, cart });
const removeCartItem = cart => ({ type: REMOVE_CART_ITEM, cart });
const emptyCart = () => ({ type: CLEAR_CART });

/* ------------       REDUCERS     ------------------ */
export default function reducer(cart = {}, action) {
  switch (action.type) {

    case GET_CART:
      return action.cart;

    case CREATE_NEW_CART:
      return action.cart;

    case ADD_OR_UPDATE_CART_ITEM:
      return action.cart;

    case REMOVE_CART_ITEM:
      return action.cart;

    case CLEAR_CART:
      return {};

    default:
      return cart;
  }
}

/* ------------   THUNK CREATORS     ------------------ */
export const fetchCart = () => async dispatch => {
  try {
    const res = await axios.get('/api/cart');
    res.status === 200
      ? dispatch(getCart(res.data))
      : dispatch(getCart({}));
  }
  catch (err) { console.error('Fetching cart unsuccessful', err); }
};

export const makeNewCart = (productId, price, quantity) => async dispatch => {
  try {
    const res = await axios.post('/api/cart', { productId, price, quantity });
    dispatch(createNewCart(res.data));
  }
  catch (err) { console.error('Creating new cart unsuccessful', err); }
};

export const updateCart = (orderId, productId, price, quantity) => async dispatch => {
  try {
    const res = await axios.put(`/api/cart/${orderId}`, { productId, price, quantity });
    dispatch(updateCartItem(res.data));
  }
  catch (err) { console.error('Updating cart item unsuccessful', err); }
};

export const checkoutCart = order => async dispatch => {
  try {
    const res = await axios.put(`/api/order/${order.id}`, order);
    dispatch(updateCartItem(res.data));
    history.push('/checkout');
  }
  catch (err) { console.error('Checkout unsuccessful'); }
};

export const removeItem = (cart, productId) => async dispatch => {
  try {
    // const cart = await axios.get('/api/cart/');

    cart.orderProducts.filter(op => op.id !== productId); //optimisitic
    const res = await axios.delete(`/api/cart/orderProduct`, { orderId: cart.id, productId });

    if (res.status === 204) dispatch(removeCartItem(cart));
  }
  catch (err) { console.error('Removing order product unsuccessful', err); }
};

export const clearCart = () => dispatch => {
  console.log('clearCart dispatched');
  dispatch(emptyCart());
  history.push('/');
};
