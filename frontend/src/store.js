import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  serviceCreateReducer,
  serviceDetailsReducer,
  serviceListReducer,
  updateServiceDowntimeReducer,
} from "./reducers/serviceReducers";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userMessagesReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userMessages: userMessagesReducer,
  serviceList: serviceListReducer,
  serviceDetails: serviceDetailsReducer,
  serviceUpdate: updateServiceDowntimeReducer,
  serviceCreate: serviceCreateReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const servicesFromStorage = localStorage.getItem("services")
  ? JSON.parse(localStorage.getItem("services"))
  : [];

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
  serviceList: { services: servicesFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
