/*

NEEDS TO BE MERGED INTO user.js REDUCER FILE

*/


import axios from 'axios';

/* -----------------    ACTION TYPES ------------------ */

const GET_USERS = 'GET_USERS';
const POST_USER = 'POST_USER';
const DELETE_USER = 'DELETE_USER';
const PUT_USER = 'PUT_USER';

/* ------------   ACTION CREATORS     ------------------ */

const getUsers = users => ({ type: GET_USERS, users });
const postUser = user => ({ type: POST_USER, user });
const deleteUser = id => ({ type: DELETE_USER, id });
const putUser = user => ({ type: POST_USER, user });

/* ------------       REDUCERS     ------------------ */
export default function reducer(users = [], action) {
  switch (action.type) {

    case GET_USERS:
      return action.users;

    case POST_USER:
      return [...users, action.user];

    case DELETE_USER:
      return users.filter(user => user.id !== action.id);

    case PUT_USER:
      return users.map(user => (action.user.id === user.id ? action.user : user));

    default:
      return users;
  }
}

/* ------------   THUNK CREATORS     ------------------ */
export const fetchUsers = async dispatch => {
  try { dispatch(getUsers(await axios.get('/api/user/'))); }
  catch (err) { console.error('Fetching users unsuccessful', err); }
};

export const createUser = async (user, dispatch) => {
  try { dispatch(postUser(await axios.post('api/user/', user))); }
  catch (err) { console.error('Posting user unsuccessful', err); }
};

export const removeUser = async (id, dispatch) => {
  // Optimistic
  dispatch(deleteUser(id));
  try { await axios.delete(`api/user/${id}`); }
  catch (err) { console.error('Deleting user unsuccessful', err); }
};

export const editUser = async (id, user, dispatch) => {
  try { dispatch(putUser(await axios.put(`api/user/${id}`, user))); }
  catch (err) { console.error('Updating student unsuccessful', err); }
};
