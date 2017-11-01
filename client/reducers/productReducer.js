import axios from 'axios';

const initialState = {
  allProducts: [],
  singleProduct: {},
};

//ACTION TYPES
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const GET_PRODUCT = 'GET_PRODUCT';
const PUT_PRODUCT = 'PUT_PRODUCT';
const POST_PRODUCT = 'POST_PRODUCT';

//ACTION CREATORS
const getAllProducts = allProducts => ({ type: GET_ALL_PRODUCTS, allProducts });
const getProduct = id => ({ type: GET_PRODUCT, id });
const putProduct = product => ({ type: PUT_PRODUCT, product });
const postProduct = product => ({ type: POST_PRODUCT, product });

//REDUCERS
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.allProducts;

    case GET_PRODUCT:
      return action.singleProduct;

    case PUT_PRODUCT:
      return state.allProducts.map(product => {
          if (product.id === action.singleProduct.id) {
            return action.singleProduct;
          }
        }
      );

    case POST_PRODUCT:
      return [...state.allProducts, action.singleProduct];

    default:
      return state;
  }
}

//THUNKS
export const fetchProducts = () => dispatch => {
  axios.get('/api/products')
    .then(res => res.data)
    .then(products => dispatch(getAllProducts(products))
    .catch(err => console.error('Fetching products unsuccessful: ', err)));
  };

export const fetchProduct = id => dispatch => {
  axios.get(`/api/products/${id}`)
    .then(res => res.data)
    .then(product => dispatch(getProduct(product))
    .catch(err => console.error('Fetching product unsuccessful: ', err)));
};

export const editProduct = (id, singleProduct) => dispatch => {
  axios.put(`/api/products/${id}`, singleProduct)
    .then(res => res.data)
    .then(product => dispatch(putProduct(product))
    .catch(err => console.error('Editing product unsuccessful: ', err)));
};

export const createProduct = singleProduct => dispatch => {
  axios.post('/api/products', singleProduct)
    .then(res => res.data)
    .then(product => dispatch(postProduct(product))
    .catch(err => console.error('Creating product unsuccessful: ', err)));
};
