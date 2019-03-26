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

const INITIAL_STATE = {
  loggedInUser: null,
  loginPending: false,
  loginSuccess: false,
  loginError: '',
  registerPending: false,
  registerSuccess: false,
  registerError: '',
  logoutPending: false,
  logoutSuccess: false,
  logoutError: ''
};

export default(state = INITIAL_STATE, action) => {
  const {type, payload} = action;

  switch (type) {

    case GET_LOGGED_IN_USER:
      return {
        ...state,
        loggedInUser: payload
      }

    case LOGIN:
      return {
        ...state,
        loginPending: true,
        loginError: ''
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        loginPending: false,
        loginSuccess: true,
        loggedInUser: payload
      }

    case LOGIN_ERROR:
      return {
        ...state,
        loginPending: false,
        loginError: payload
      }

    case REGISTER:
      return {
        ...state,
        registerPending: true,
        registerError: ''
      }

    case REGISTER_SUCCESS:
      return {
        ...state,
        registerPending: false,
        registerSuccess: true,
        loggedInUser: payload
      }

    case REGISTER_ERROR:
      return {
        ...state,
        registerPending: false,
        registerError: payload
      }

    case LOGOUT:
      return {
        ...state,
        logoutPending: true,
        logoutError: ''
      }

    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggedInUser: null,
        logoutPending: false,
        logoutSuccess: true
      }

    case LOGOUT_ERROR:
      return {
        ...state,
        logoutPending: false,
        logoutError: payload
      }

    default:
      return state
  }
}