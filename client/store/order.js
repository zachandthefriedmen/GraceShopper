import axios from 'axios';

/* -----------------    ACTION TYPES ------------------ */

const GET_ORDERS = 'GET_ORDERS';
const POST_ORDER = 'POST_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';
const PUT_ORDER = 'PUT_ORDER';

/* ------------   ACTION CREATORS     ------------------ */

const getOrders = orders => ({ type: GET_ORDERS, orders });
const postOrder = order => ({ type: POST_ORDER, order });
const deleteOrder = id => ({ type: DELETE_ORDER, id }); 
const putOrder = order => ({ type: POST_ORDER, order });

/* ------------       REDUCERS     ------------------ */
export default function reducer(orders = [], action) {
  switch (action.type) {

    case GET_ORDERS:
      return action.orders;

    case POST_ORDER:
      return [...orders, action.order];

    case DELETE_ORDER:
      return orders.filter(order => order.id !== action.id);

    case PUT_ORDER:
      return orders.map(order => (action.order.id === order.id ? action.order : order));

    default:
      return orders;
  }
}

/* ------------   THUNK CREATORS     ------------------ */
export const fetchOrders = () => async dispatch => {
  try { dispatch(getOrders(await axios.get('/api/order/'))); }
  catch (err) { console.error('Fetching orders unsuccessful', err); }
};

export const createOrder = order => async dispatch => {
  try { dispatch(postOrder(await axios.post('api/order/', order))); }
  catch (err) { console.error('Posting order unsuccessful', err); }
};

export const removeOrder = id => async dispatch => {
  // Optimistic
  dispatch(deleteOrder(id));
  try { await axios.delete(`api/order/${id}`); }
  catch (err) { console.error('Deleting order unsuccessful', err); }
};

export const editOrder = (id, order) => async dispatch => {
  try { dispatch(putOrder(await axios.put(`api/order/${id}`, order))); }
  catch (err) { console.error('Updating student unsuccessful', err); }
};
