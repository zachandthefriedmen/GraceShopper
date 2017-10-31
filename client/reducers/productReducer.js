import axios from 'axios';

const initialState = {
  allProducts: [],
  singleProduct: {},
};

//ACTION TYPES
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const GET_PRODUCT = 'GET_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT';

//ACTION CREATORS
const getAllProducts = products => ({ type: GET_ALL_PRODUCTS, products });
const getProduct = product => ({ type: GET_PRODUCT, product });
const editProduct = product => ({ type: EDIT_PRODUCT, product });

//REDUCERS
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return Object.assign({}, state, { allProducts: action.allProducts });

    case GET_PRODUCT:
      return Object.assign({}, state, { singleProduct: action.singleProduct });

    case EDIT_PRODUCT:
      return Object.assign({}, state, { allProducts: state.allProducts.map(
        product => {
          if (product.id === action.product.id) {
            return action.product;
          }
        }
      )});

    default:
      return state;
  }
}

//THUNKS
