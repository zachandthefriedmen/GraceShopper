import axios from 'axios';


const initialState = {

}

/* -----------------    ACTION TYPES ------------------ */

const GET_USERS = 'GET_USERS';
const POST_USER = 'POST_USER';

/* ------------   ACTION CREATORS     ------------------ */

const allUsers = users => ({ type: GET_USERS})