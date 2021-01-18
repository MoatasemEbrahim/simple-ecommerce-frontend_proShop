import { Reducer } from 'redux';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_ERROR_RESET,
} from '../constants/userConstants';

const userAuthReducer:Reducer = (state = { }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT_REQUEST:
    case USER_UPDATE_REQUEST:
      return { ...state, loading: true };

    case USER_LOGOUT_SUCCESS:
      return { loading: false, userInfo: {} };

    case USER_LOGOUT_FAIL:
    case USER_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    case USER_ERROR_RESET: {
      const newState = { ...state };
      delete newState.error;
      return { ...newState };
    }

    default:
      return state;
  }
};

export default userAuthReducer;
