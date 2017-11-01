import axios from 'axios';

/* -----------------    ACTION TYPES ------------------ */

const GET_REVIEWS = 'GET_REVIEWS';
const GET_ITEM_REVIEWS = 'GET_ITEM_REVIEWS';
const POST_REVIEW = 'POST_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW';
const PUT_REVIEW = 'PUT_REVIEW';

/* ------------   ACTION CREATORS     ------------------ */

const getReviews = reviews => ({ type: GET_REVIEWS, reviews });
const getItemReviews = itemId => ({ type: GET_REVIEWS, itemId });
const postReview = review => ({ type: POST_REVIEW, review });
const deleteReview = id => ({ type: DELETE_REVIEW, id });
const putReview = review => ({ type: POST_REVIEW, review });

/* ------------       REDUCERS     ------------------ */
export default function reducer(reviews = [], action) {
  switch (action.type) {

    case GET_REVIEWS:
      return action.reviews;

    case GET_ITEM_REVIEWS:
      return action.reviews;

    case POST_REVIEW:
      return [...reviews, action.review];

    case DELETE_REVIEW:
      return reviews.filter(review => review.id !== action.id);

    case PUT_REVIEW:
      return reviews.map(review => (action.review.id === review.id ? action.review : review));

    default:
      return reviews;
  }
}

/* ------------   THUNK CREATORS     ------------------ */
export const fetchReviews = () => async dispatch => {
  try { dispatch(getReviews(await axios.get('/api/review/'))); }
  catch (err) { console.error('Fetching reviews unsuccessful', err); }
};


//
// IN PROGRESS thunk for retreiving reviews related to singular item
//

export const fetchReviewsforItem = (itemId) => async dispatch => {
  try { dispatch(getItemReviews(await axios.get(/*'/api/review/item/itemId'???? needs a route?*/))); }
  catch (err) { console.error('Fetching reviews unsuccessful', err); }
};

export const createReview = review => async dispatch => {
  try { dispatch(postReview(await axios.post('api/review/', review))); }
  catch (err) { console.error('Posting review unsuccessful', err); }
};

export const removeReview = id => async dispatch => {
  // Optimistic
  dispatch(deleteReview(id));
  try { await axios.delete(`api/review/${id}`); }
  catch (err) { console.error('Deleting review unsuccessful', err); }
};

export const editReview = (id, review) => async dispatch => {
  try { dispatch(putReview(await axios.put(`api/review/${id}`, review))); }
  catch (err) { console.error('Updating student unsuccessful', err); }
};
