import axios from 'axios';

/* -----------------    ACTION TYPES ------------------ */

const GET_PRODUCTS = 'GET_PRODUCTS';
const POST_PRODUCT = 'POST_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const PUT_PRODUCT = 'PUT_PRODUCT';

/* ------------   ACTION CREATORS     ------------------ */

const getProducts = products => ({ type: GET_PRODUCTS, products });
const postProduct = product => ({ type: POST_PRODUCT, product });
const deleteProduct = id => ({ type: DELETE_PRODUCT, id });
const putProduct = product => ({ type: POST_PRODUCT, product });

/* ------------       REDUCERS     ------------------ */
export default function reducer(products = [], action) {
  switch (action.type) {

    case GET_PRODUCTS:
      return action.products;

    case POST_PRODUCT:
      return [...products, action.product];

    case DELETE_PRODUCT:
      return products.filter(product => product.id !== action.id);

    case PUT_PRODUCT:
      return products.map(product => (action.product.id === product.id ? action.product : product));

    default:
      return products;
  }
}

/* ------------   THUNK CREATORS     ------------------ */
export const fetchProducts = async dispatch => {
  try { dispatch(getProducts(await axios.get('/api/product/'))); }
  catch (err) { console.error('Fetching products unsuccessful', err); }
};

export const createProduct = async (product, dispatch) => {
  try { dispatch(postProduct(await axios.post('api/product/', product))); }
  catch (err) { console.error('Posting product unsuccessful', err); }
};

export const removeProduct = async (id, dispatch) => {
  // Optimistic
  dispatch(deleteProduct(id));
  try { await axios.delete(`api/product/${id}`); }
  catch (err) { console.error('Deleting product unsuccessful', err); }
};

export const editProduct = async (id, product, dispatch) => {
  try { dispatch(putProduct(await axios.put(`api/product/${id}`, product))); }
  catch (err) { console.error('Updating student unsuccessful', err); }
};
