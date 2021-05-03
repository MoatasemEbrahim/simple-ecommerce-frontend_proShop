import { Reducer } from 'redux';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  UPDATE_SHIPPING_ADDRESS,
  UPDATE_PAYMENT_METHOD,
  CART_RESET_ITEMS,
  RESET_SHIPPING_ADDRESS,
  RESET_PAYMENT_METHOD,
} from '../constants/cartConstants';

const cartReducers:Reducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const item = action.payload;
      const existItem = state.cartItems.find(
        (productData) => productData.productId === item.productId,
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((productData) => {
            if (productData.productId !== existItem.productId) {
              return productData;
            }
            return item;
          }),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };
    }

    case CART_REMOVE_ITEM: {
      const newCartItems = state.cartItems.filter(
        (item) => item.productId !== action?.payload.productId,
      );
      return { ...state, cartItems: newCartItems };
    }

    case CART_RESET_ITEMS:
      return { ...state, cartItems: [] };

    case UPDATE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case RESET_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: '',
      };

    case UPDATE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case RESET_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: '',
      };

    default:
      return state;
  }
};

export default cartReducers;
