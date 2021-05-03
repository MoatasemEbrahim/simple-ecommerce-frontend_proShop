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
import { CART_RESET_ITEMS, RESET_SHIPPING_ADDRESS, RESET_PAYMENT_METHOD } from '../constants/cartConstants';
import usersAPI from '../../api/users';

export const login = (email:string, password:string) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const userInfo = await usersAPI.login({ email, password });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: userInfo });
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error?.response?.data?.message ? error.response.data.message : error.message,
    });
  }
};

export const logout = (historyObj) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGOUT_REQUEST });
    await usersAPI.logout();
    dispatch({ type: USER_LOGOUT_SUCCESS });
    dispatch({ type: CART_RESET_ITEMS });
    dispatch({ type: RESET_SHIPPING_ADDRESS });
    dispatch({ type: RESET_PAYMENT_METHOD });
    historyObj.push('/');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload: error?.response?.data?.message ? error.response.data.message : error.message,
    });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const userInfo = await usersAPI.register(userData);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: userInfo });
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error?.response?.data?.message ? error.response.data.message : error.message,
    });
  }
};

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });
    const userInfo = await usersAPI.updateProfile(userData);
    dispatch({ type: USER_UPDATE_SUCCESS, payload: userInfo });
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    return true;
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error?.response?.data?.message ? error.response.data.message : error.message,
    });
    return false;
  }
};

export const resetUserErrors = (dispatch) => {
  dispatch({ type: USER_ERROR_RESET });
};
