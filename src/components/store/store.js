import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './orderSlice';
import authReducer from "./authslice"
import vectorreducer from "./vectorSlice"

const store = configureStore({
  reducer: {
    order: orderReducer,
    auth: authReducer,
    vector:vectorreducer

  },

});

export default store;
