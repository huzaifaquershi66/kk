import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './orderSlice';
import authReducer from "./authslice"

const store = configureStore({
  reducer: {
    order: orderReducer,
    auth: authReducer,
  },
});

export default store;
