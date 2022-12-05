import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productsReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  deleteProductReducer,
  updateProductReducer,
  productReviewsReducer,
  reviewsReducer
} from "./reducers/productReducers";
import {
  authReducer,
  forgotPasswordReducer,
  userReducer,
  allUserReducer,
  userDetailsReducer
} from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducer";
import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  allOrderReducer,
  orderReducer
} from "./reducers/orderReducer";


const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  order: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  deleteProduct: deleteProductReducer,
  updateProduct: updateProductReducer,
  allOrder: allOrderReducer,
  order: orderReducer,
  allUser: allUserReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewsReducer
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];
const store = configureStore(
  { reducer, initialState },
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
