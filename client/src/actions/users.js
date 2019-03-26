import axios from 'axios';
import {
  GET_LOGGED_IN_USER,
  LOGIN,
  REGISTER,
  LOGOUT,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_ERROR,
  REGISTER_ERROR,
  LOGOUT_ERROR
} from '../types/users';

const loggedInUserAction = (user) => ({type: GET_LOGGED_IN_USER, payload: user});

export const getLoggedInUser = () => async(dispatch) => {
  try {
    const user = await axios.get('auth/user');
    dispatch(loggedInUserAction(user.data));
  } catch {return null}
};

const loginUserAction = (user) => ({type: LOGIN_SUCCESS, payload: user});

const loginErrorAction = (error) => ({type: LOGIN_ERROR, payload: error});

export const loginUser = (username, password) => (dispatch) => {
dispatch({type: LOGIN});

setTimeout(async() => {
  try {
    const user = await axios.post('auth/login', {username, password});
    dispatch(loginUserAction(user.data));
  } catch (err) {
    dispatch(loginErrorAction(err));
  }
}, 2500);
};

const registerUserAction = (user) => ({type: REGISTER_SUCCESS, payload: user});

const registerErrorAction = (err) => ({type: REGISTER_ERROR, payload: err});

export const registerUser = (newUser) => (dispatch) => {
dispatch({type: REGISTER});

setTimeout(async() => {
  try {
    const success = await axios.post('auth/register', newUser);
    dispatch(registerUserAction(success.data));
  } catch (err) {
    dispatch(registerErrorAction(err));
  }
}, 2500);
};

const logoutErrorAction = (err) => ({type: LOGOUT_ERROR, payload: err});

export const logoutUser = () => (dispatch) => {
dispatch({type: LOGOUT});

setTimeout(async() => {
  try {
    await axios.post('auth/logout');
    dispatch({type: LOGOUT_SUCCESS});
  } catch (err) {
    dispatch(logoutErrorAction(err));
  }
}, 1200);
};