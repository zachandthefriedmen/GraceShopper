import axios from 'axios';

/* -----------------    ACTION TYPES ------------------ */

const GET_REVIEWS = 'GET_REVIEWS';
const GET_REVIEW = 'GET_REVIEW';
const GET_PRODUCT_REVIEWS = 'GET_PRODUCT_REVIEWS';
const POST_REVIEW = 'POST_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW';
const PUT_REVIEW = 'PUT_REVIEW';

/* ------------   ACTION CREATORS     ------------------ */

const getReviews = reviews => ({ type: GET_REVIEWS, reviews });
const getReview = review => ({ type: GET_REVIEW, review });
const getProductReviews = reviews => ({ type: GET_PRODUCT_REVIEWS, reviews });
const postReview = review => ({ type: POST_REVIEW, review });
const deleteReview = id => ({ type: DELETE_REVIEW, id });
const putReview = review => ({ type: PUT_REVIEW, review });

/* ------------       REDUCERS     ------------------ */
export default function reducer(reviews = [], action) {
  switch (action.type) {

    case GET_REVIEWS:
      return action.reviews;

    case GET_PRODUCT_REVIEWS:
      return action.reviews;

    case GET_REVIEW:
      return action.review;

    case POST_REVIEW:
      return [...reviews, action.review];

    case PUT_REVIEW:
      return reviews.map(review => (action.review.id === review.id ? action.review : review));

    case DELETE_REVIEW:
      return reviews.filter(review => review.id !== action.id);

    default:
      return reviews;
  }
}

/* ------------   THUNK CREATORS     ------------------ */
export const fetchReviews = () => async dispatch => {
  try {
    dispatch(getReviews((await axios.get('/api/review')).data));
  }
  catch (err) { console.error('Fetching reviews unsuccessful', err); }
};

export const fetchReview = id => async dispatch => {
  try {
    const res = await axios.get(`/api/review/${id}`);
    dispatch(getReview(res.data));
  }
  catch (err) { console.error('Fetching review unsuccessful', err); }
};

//
// IN PROGRESS thunk for retreiving reviews related to singular item
//
export const fetchReviewsForProduct = (productId) => async dispatch => {
  try {
    dispatch(getProductReviews(
      (await axios.get(`/api/review/product/${productId}`)).data
    ));
  }
  catch (err) { console.error('Fetching reviews unsuccessful', err); }
};

export const createReview = review => async dispatch => {
  try {
    dispatch(postReview((await axios.post('/api/review', review)).data));
  }
  catch (err) { console.error('Posting review unsuccessful', err); }
};

export const editReview = (id, review) => async dispatch => {
  try {
    const res = await axios.put(`api/review/${id}`, review);
    dispatch(putReview(res.data));
  }
  catch (err) { console.error('Updating review unsuccessful', err); }
};

export const removeReview = id => async dispatch => {
  // Optimistic
  dispatch(deleteReview(id));
  try { await axios.delete(`api/review/${id}`); }
  catch (err) { console.error('Deleting review unsuccessful', err); }
};
