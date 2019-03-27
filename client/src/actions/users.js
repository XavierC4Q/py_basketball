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

/** GET LOGGED IN USER ACTIONS*/
const loggedInUserAction = (user) => ({
  type: GET_LOGGED_IN_USER,
  payload: user
});

export const getLoggedInUser = () => async (dispatch) => {
  try {
    const user = await axios.get('/auth/user/');
    localStorage.setItem('user', JSON.stringify(user.data));
    dispatch(loggedInUserAction(user.data));
  } catch {
    localStorage.removeItem('user');
    return null
  }
};

/**LOGIN USER ACTIONS */
const loginUserAction = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user
});

const loginErrorAction = (error) => ({
  type: LOGIN_ERROR,
  payload: error
});

export const loginUser = (auth) => (dispatch) => {
  /**Trigger pending state for login */
  dispatch({
    type: LOGIN
  });
  setTimeout(async () => {
    try {
      await axios.post('/auth/login/', auth);
      const user = await axios.get('/auth/user/');
      localStorage.setItem('user', JSON.stringify(user.data));
      dispatch(loginUserAction(user.data));
    } catch {
      dispatch(loginErrorAction('Wrong username/password'));
    }
  }, 2500);
};

/**REGISTER USER ACTIONS */
const registerUserAction = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user
});

const registerErrorAction = (err) => ({
  type: REGISTER_ERROR,
  payload: err
});

export const registerUser = (newUser) => (dispatch) => {
  /**Trigger pending state for register */
  dispatch({
    type: REGISTER
  });

  setTimeout(async () => {
    try {
      const success = await axios.post('/auth/register/', newUser);
      localStorage.setItem('user', JSON.stringify(success.data));
      dispatch(registerUserAction(success.data));
    } catch (err) {
      dispatch(registerErrorAction(err));
    }
  }, 2500);
};

/**LOGOUT USER ACTIONS */
const logoutErrorAction = (err) => ({
  type: LOGOUT_ERROR,
  payload: err
});

export const logoutUser = () => (dispatch) => {
  /**Trigger logout pending state */
  dispatch({
    type: LOGOUT
  });

  setTimeout(async () => {
    try {
      await axios.post('/auth/logout/');
      localStorage.removeItem('user');
      dispatch({
        type: LOGOUT_SUCCESS
      });
    } catch (err) {
      dispatch(logoutErrorAction(err));
    }
  }, 1200);
};