import axios from 'axios';

/* -----------------    ACTION TYPES ------------------ */

const GET_CARTS = 'GET_CARTS';
const GET_CART = 'GET_CART';
const GET_CARTS_FOR_USER = 'GET_CART_FOR_USER';
const POST_CART = 'POST_CART';
const DELETE_CART = 'DELETE_CART';
const PUT_CART = 'PUT_CART';

/* ------------   ACTION CREATORS     ------------------ */

const getCarts = carts => ({ type: GET_CARTS, carts });
const getCart = cart => ({ type: GET_CART, cart });
const getCartsForUser = carts => ({ type: GET_CARTS_FOR_USER, carts });
const postCart = cart => ({ type: POST_CART, cart });
const deleteCart = id => ({ type: DELETE_CART, id });
const putCart = cart => ({ type: PUT_CART, cart });

/* ------------       REDUCERS     ------------------ */
export default function reducer(carts = [], action) {
  switch (action.type) {

    case GET_CARTS:
      return action.carts;

    case GET_CART:
      return action.cart;

    case GET_CARTS_FOR_USER:
      return action.carts;

    case POST_CART:
      return [...carts, action.cart];

    case PUT_CART:
      return carts.map(cart => (action.cart.id === cart.id ? action.cart : cart));

    case DELETE_CART:
      return carts.filter(cart => cart.id !== action.id);

    default:
      return carts;
  }
}

/* ------------   THUNK CREATORS     ------------------ */
export const fetchCarts = () => async dispatch => {
  try {
    dispatch(getCarts((await axios.get('/api/cart')).data));
  }
  catch (err) { console.error('Fetching carts unsuccessful', err); }
};

export const fetchCart = id => async dispatch => {
  try {
    const res = await axios.get(`/api/cart/${id}`);
    dispatch(getCart(res.data));
  }
  catch (err) { console.error('Fetching cart unsuccessful', err); }
};

export const fetchCartsForUser = (id) => async dispatch => {
  try {
    console.log('user id for thunk: ', id);
    console.log('cart json', await axios.get(`/api/user/${id}/carts`));
    dispatch(getCartsForUser((await axios.get(`/api/user/${id}/carts`)).data));
  }
  catch (err) { console.error('Fetching carts unsuccessful', err); }
};

export const createCart = cart => async dispatch => {
  try {
    dispatch(postCart((await axios.post('api/cart', cart)).data));
  }
  catch (err) { console.error('Posting cart unsuccessful', err); }
};

export const editCart = (id, cart) => async dispatch => {
  try {
    const res = await axios.put(`api/cart/${id}`, cart);
    dispatch(putCart(res.data));
  }
  catch (err) { console.error('Updating cart unsuccessful', err); }
};

export const removeCart = id => async dispatch => {
  // Optimistic
  dispatch(deleteCart(id));
  try { await axios.delete(`api/cart/${id}`); }
  catch (err) { console.error('Deleting cart unsuccessful', err); }
};

