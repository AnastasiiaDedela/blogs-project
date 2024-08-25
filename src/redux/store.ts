import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/login/slice';
import userSlice from './slices/User/slice';
import postsSlice from './slices/posts/slice';
import searchSlice from './slices/search/slice';
const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    posts: postsSlice,
    search: searchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
