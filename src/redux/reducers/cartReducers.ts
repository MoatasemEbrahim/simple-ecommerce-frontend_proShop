import { Reducer } from 'redux';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
} from '../constants/cartConstants';

export const cartReducers:Reducer = (state = { cartItems: [] }, action) => {
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

    default:
      return state;
  }
};

export default cartReducers;
