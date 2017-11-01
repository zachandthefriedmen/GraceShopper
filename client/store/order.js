import axios from 'axios';

/* -----------------    ACTION TYPES ------------------ */

const GET_ORDERS = 'GET_ORDERS';
const POST_ORDER = 'POST_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';
const PUT_ORDER = 'PUT_ORDER';

/* ------------   ACTION CREATORS     ------------------ */

const getOrders = products => ({ type: GET_ORDERS, products });
const postOrder = product => ({ type: POST_ORDER, product });
const deleteOrder = id => ({ type: DELETE_ORDER, id }); 
const putOrder = product => ({ type: POST_ORDER, product });

/* ------------       REDUCERS     ------------------ */
export default function reducer(products = [], action) {
  switch (action.type) {

    case GET_ORDERS:
      return action.products;

    case POST_ORDER:
      return [...products, action.product];

    case DELETE_ORDER:
      return products.filter(product => product.id !== action.id);

    case PUT_ORDER:
      return products.map(product => (action.product.id === product.id ? action.product : product));

    default:
      return products;
  }
}

/* ------------   THUNK CREATORS     ------------------ */
export const fetchOrders = () => async dispatch => {
  try { dispatch(getOrders(await axios.get('/api/product/'))); }
  catch (err) { console.error('Fetching products unsuccessful', err); }
};

export const createOrder = product => async dispatch => {
  try { dispatch(postOrder(await axios.post('api/product/', product))); }
  catch (err) { console.error('Posting product unsuccessful', err); }
};

export const removeOrder = id => async dispatch => {
  // Optimistic
  dispatch(deleteOrder(id));
  try { await axios.delete(`api/product/${id}`); }
  catch (err) { console.error('Deleting product unsuccessful', err); }
};

export const editOrder = (id, product) => async dispatch => {
  try { dispatch(putOrder(await axios.put(`api/product/${id}`, product))); }
  catch (err) { console.error('Updating student unsuccessful', err); }
};
