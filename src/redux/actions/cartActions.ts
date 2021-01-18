import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  UPDATE_SHIPPING_ADDRESS,
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

export const updateShippingAddress = (shippingAddress) => (dispatch) => {
  dispatch({
    type: UPDATE_SHIPPING_ADDRESS,
    payload: shippingAddress,
  });

  localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
};
