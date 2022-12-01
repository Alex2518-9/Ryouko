import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productsReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { authReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  auth: authReducer
});

let initialState = {};

const middleware = [thunk];
const store = configureStore(
  { reducer, initialState },
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
