import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import productsListReducer from './reducers/productReducers';
import cartReducers from './reducers/cartReducers';
import userAuthReducer from './reducers/userReducers';

const reducer = combineReducers({
  productsList: productsListReducer,
  cart: cartReducers,
  userInfo: userAuthReducer,
});

const stringCartItems = localStorage.getItem('cartItems');
const cartItems = stringCartItems ? JSON.parse(stringCartItems) : [];

const stringUserInfo = localStorage.getItem('userInfo');
const userInfo = stringUserInfo ? JSON.parse(stringUserInfo) : {};

const stringShippingAddress = localStorage.getItem('shippingAddress');
const shippingAddress = stringShippingAddress ? JSON.parse(stringShippingAddress) : {};

const initialState = {
  cart: { cartItems, shippingAddress, paymentMethod: 'PayPal' },
  userInfo: { userInfo },
};

const middleware = [thunk];

const store = createStore(
  reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
