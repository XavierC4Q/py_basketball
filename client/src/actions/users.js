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