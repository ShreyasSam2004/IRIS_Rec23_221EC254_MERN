// reducers/index.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import alertsReducer from "./alertsSlice";
import usersReducer from "./usersSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  alerts: alertsReducer,
  users: usersReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

