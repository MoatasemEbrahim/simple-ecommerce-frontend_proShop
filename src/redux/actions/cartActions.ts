import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  UPDATE_SHIPPING_ADDRESS,
  UPDATE_PAYMENT_METHOD,
  CART_RESET_ITEMS,
} from '../constants/cartConstants';
import productsAPI from '../../api/products';

export const addToCart = (id:string, qty:number) => async (dispatch, getState) => {
  try {
    const {
      name, imageURL, price, countInStock,
    } = await productsAPI.getProductById(id);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        productId: id,
        name,
        image: imageURL,
        price,
        countInStock,
        qty,
      },
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  } catch (error) {
    console.warn(error.message);
  }
};

export const removeFromCart = (id:string) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: {
      productId: id,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const resetCartItems = (dispatch) => {
  dispatch({
    type: CART_RESET_ITEMS,
  });

  localStorage.setItem('cartItems', JSON.stringify([]));
};

export const updateShippingAddress = (shippingAddress) => (dispatch) => {
  dispatch({
    type: UPDATE_SHIPPING_ADDRESS,
    payload: shippingAddress,
  });

  localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
};

export const updatePaymentMethod = (paymentMethod) => (dispatch) => {
  dispatch({
    type: UPDATE_PAYMENT_METHOD,
    payload: paymentMethod,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
};
