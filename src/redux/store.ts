import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/login/slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
