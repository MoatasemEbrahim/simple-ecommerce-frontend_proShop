import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from '../constants/productConstants';
import productsAPI from '../../api/products';

const listProducts = async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const newProducts = await productsAPI.getProducts();
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: newProducts });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error?.response?.data?.message ? error.response.data.message : error.message,
    });
  }
};

export default listProducts;
