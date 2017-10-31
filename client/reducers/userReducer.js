import axios from "axios";

/* -----------------    ACTION TYPES ------------------ */

const GET_USERS = "GET_USERS";
const POST_USER = "POST_USER";
const DELETE_USER = "DELETE_USER";
const PUT_USER = "PUT_USER";

/* ------------   ACTION CREATORS     ------------------ */

const getUsers= users => ({ type: GET_USERS, users, });
const postUser = user => ({ type: POST_USER, user, });
const deleteUser = id => ({ type: DELETE_USER, id });
const putUser = user => ({ type: POST_USER, user });

/* ------------       REDUCERS     ------------------ */
export default function reducer (users = [], action) {
  switch(action.type) {

    case GET_USERS:
      return action.users;

    case POST_USER:
      return [...users, action.user];
      
      case DELETE_USER:
      return users.filter(user => user.id !== action.id)

      case PUT_USER:
        return users.map(user => (action.user.id === user.id ? action.user : user))
    
    default:
      return users;
  }
}

/* ------------   THUNK CREATORS     ------------------ */
export const fetchUsers = () => dispatch => {
  axios.get("/api/user/")
    .then(res => dispatch(getUsersAction(res.data)))
    .catch(err => console.error("Fetching users unsuccessful", err));
}

export const createUser = user => dispatch => {
  axios.post("api/user/", user)
    .then(res => dispatch(postUserAction(res.data)))
    .catch(err => console.error("Posting user unsiccessful", err))
}

export const removeUser = id => dispatch => {
  // Optimistic
  dispatch(removeUser(id))
  axios.delete(`api/user/${id}`)
    .catch("Deleting user unsuccessful", err)
}

export const editUser = (id, user) => dispatch => {
  axios.put(`api/user/${id}`, student)
    .then(res => dispatch(putUser(res.data)))
    .catch(err => console.error("Updating student unsuccessful", err))
} 