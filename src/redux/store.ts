import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { productsListReducer, productsDetailsReducer } from './reducers/productReducers';
import { cartReducers } from './reducers/cartReducers';

const reducer = combineReducers({
  productsList: productsListReducer,
  productDetails: productsDetailsReducer,
  cart: cartReducers,
});

const stringCartItems = localStorage.getItem('cartItems');
const cartItems = stringCartItems ? JSON.parse(stringCartItems) : [];

const initialState = { cart: { cartItems } };

const middleware = [thunk];

const store = createStore(
  reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
