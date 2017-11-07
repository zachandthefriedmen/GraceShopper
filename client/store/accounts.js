/*

NEEDS TO BE MERGED INTO account.js REDUCER FILE

*/


import axios from 'axios';

/* -----------------    ACTION TYPES ------------------ */

const GET_ACCOUNTS = 'GET_ACCOUNTS';
const POST_ACCOUNT = 'POST_ACCOUNT';
const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
const PUT_ACCOUNT = 'PUT_ACCOUNT';

/* ------------   ACTION CREATORS     ------------------ */

const getAccounts = accounts => ({ type: GET_ACCOUNTS, accounts });
const postAccount = account => ({ type: POST_ACCOUNT, account });
const deleteAccount = id => ({ type: DELETE_ACCOUNT, id });
const putAccount = account => ({ type: POST_ACCOUNT, account });

/* ------------       REDUCERS     ------------------ */
export default function reducer(accounts = [], action) {
  switch (action.type) {

    case GET_ACCOUNTS:
      return action.accounts;

    case POST_ACCOUNT:
      return [...accounts, action.account];

    case DELETE_ACCOUNT:
      return accounts.filter(account => account.id !== action.id);

    case PUT_ACCOUNT:
      return accounts.map(account => (action.account.id === account.id ? action.account : account));

    default:
      return accounts;
  }
}

/* ------------   THUNK CREATORS     ------------------ */
export const fetchAccounts = async dispatch => {
  try { dispatch(getAccounts(await axios.get('/api/user/'))); }
  catch (err) { console.error('Fetching accounts unsuccessful', err); }
};

export const createAccount = async (account, dispatch) => {
  try { dispatch(postAccount(await axios.post('api/user/', account))); }
  catch (err) { console.error('Posting account unsuccessful', err); }
};

export const removeAccount = async (id, dispatch) => {
  // Optimistic
  dispatch(deleteAccount(id));
  try { await axios.delete(`api/user/${id}`); }
  catch (err) { console.error('Deleting account unsuccessful', err); }
};

export const editAccount = async (id, account, dispatch) => {
  try { dispatch(putAccount(await axios.put(`api/user/${id}`, account))); }
  catch (err) { console.error('Updating student unsuccessful', err); }
};
