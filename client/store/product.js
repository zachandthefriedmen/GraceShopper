import axios from 'axios';

/* -----------------    ACTION TYPES ------------------ */

const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_PRODUCT = 'GET_PRODUCT';
const POST_PRODUCT = 'POST_PRODUCT';
// we don't want to delete products at the moment, keeping code in case we want to re-implement
// const DELETE_PRODUCT = 'DELETE_PRODUCT';
const PUT_PRODUCT = 'PUT_PRODUCT';

/* ------------   ACTION CREATORS     ------------------ */

const getProducts = products => ({ type: GET_PRODUCTS, products });
const getProduct = products => ({ type: GET_PRODUCT, products });
const postProduct = product => ({ type: POST_PRODUCT, product });
// we don't want to delete products at the moment, keeping code in case we want to re-implement
// const deleteProduct = id => ({ type: DELETE_PRODUCT, id });
const putProduct = product => ({ type: PUT_PRODUCT, product });

/* ------------       REDUCERS     ------------------ */
export default function reducer(products = [], action) {
  switch (action.type) {

    case GET_PRODUCTS:
      return action.products;

    case GET_PRODUCT:
      return action.product;

    case POST_PRODUCT:
      return [...products, action.product];

    case PUT_PRODUCT:
      return products.map(product => (action.product.id === product.id ? action.product : product));

    // we don't want to delete products at the moment, keeping code in case we want to re-implement
    // case DELETE_PRODUCT:
    //   return products.filter(product => product.id !== action.id);

    default:
      return products;
  }
}

/* ------------   THUNK CREATORS     ------------------ */
export const fetchProducts = () => async dispatch => {
  try {
    dispatch(getProducts((await axios.get('/api/product')).data));
  }
  catch (err) { console.error('Fetching products unsuccessful', err); }
};

export const fetchProduct = id => async dispatch => {
  try {
    const res = await axios.get(`/api/product/${id}`);
    dispatch(getProduct(res.data));
  }
  catch (err) { console.error('Fetching product unsuccessful', err); }
};

export const createProduct = product => async dispatch => {
  try {
    dispatch(postProduct((await axios.post('api/product', product)).data));
  }
  catch (err) { console.error('Posting product unsuccessful', err); }
};

export const editProduct = (id, product) => async dispatch => {
  try {
    const res = await axios.put(`api/product/${id}`, product);
    dispatch(putProduct(res.data));
  }
  catch (err) { console.error('Updating product unsuccessful', err); }
};

// we don't want to delete products at the moment, keeping code in case we want to re-implement
// export const removeProduct = id => async dispatch => {
//   // Optimistic
//   dispatch(deleteProduct(id));
//   try { await axios.delete(`api/product/${id}`); }
//   catch (err) { console.error('Deleting product unsuccessful', err); }
// };

