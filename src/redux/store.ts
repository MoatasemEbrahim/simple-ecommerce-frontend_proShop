import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { productsListReducer, productsDetailsReducer } from './reducers/productsReducer';

const reducer = combineReducers({
  productsList: productsListReducer,
  productDetails: productsDetailsReducer,
});
const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
