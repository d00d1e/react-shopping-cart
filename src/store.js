import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducer";

const initialState = {};
// send info about redux store to chrome dev tools
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

const store = createStore(
  combineReducers({
    products: productsReducer,
    cart: cartReducer, 
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))  // compose middleware
);

export default store;