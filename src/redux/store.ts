import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/login/slice';
import userSlice from './slices/User/slice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  },
});

export default store;
