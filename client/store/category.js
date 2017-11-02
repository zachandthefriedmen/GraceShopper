import axios from 'axios';

/* -----------------    ACTION TYPES ------------------ */

const GET_CATEGORIES = 'GET_CATEGORIES';
const GET_CATEGORY = 'GET_CATEGORY';
const POST_CATEGORY = 'POST_CATEGORY';
const DELETE_CATEGORY = 'DELETE_CATEGORY';
const PUT_CATEGORY = 'PUT_CATEGORY';

/* ------------   ACTION CREATORS     ------------------ */

const getCategories = categories => ({ type: GET_CATEGORIES, categories });
const getCategory = category => ({ type: GET_CATEGORY, category });
const postCategory = category => ({ type: POST_CATEGORY, category });
const deleteCategory = id => ({ type: DELETE_CATEGORY, id });
const putCategory = category => ({ type: PUT_CATEGORY, category });

/* ------------       REDUCERS     ------------------ */
export default function reducer(categories = [], action) {
  switch (action.type) {

    case GET_CATEGORIES:
      return action.categories;

    case GET_CATEGORY:
      return action.category;

    case POST_CATEGORY:
      return [...categories, action.category];

    case PUT_CATEGORY:
      return categories.map(category => (action.category.id === category.id ? action.category : category));

    case DELETE_CATEGORY:
      return categories.filter(category => category.id !== action.id);

    default:
      return categories;
  }
}

/* ------------   THUNK CREATORS     ------------------ */
export const fetchCategories = () => async dispatch => {
  try {
    dispatch(getCategories((await axios.get('/api/category')).data));
  }
  catch (err) { console.error('Fetching categories unsuccessful', err); }
};

export const fetchCategory = id => async dispatch => {
  try {
    const res = await axios.get(`/api/category/${id}`);
    dispatch(getCategory(res.data));
  }
  catch (err) { console.error('Fetching category unsuccessful', err); }
};

export const createCategory = category => async dispatch => {
  try {
    dispatch(postCategory((await axios.post('api/category', category)).data));
  }
  catch (err) { console.error('Posting category unsuccessful', err); }
};

export const editCategory = (id, category) => async dispatch => {
  try {
    const res = await axios.put(`api/category/${id}`, category);
    dispatch(putCategory(res.data));
  }
  catch (err) { console.error('Updating category unsuccessful', err); }
};

export const removeCategory = id => async dispatch => {
  // Optimistic
  dispatch(deleteCategory(id));
  try { await axios.delete(`api/category/${id}`); }
  catch (err) { console.error('Deleting category unsuccessful', err); }
};

