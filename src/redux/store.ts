import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/auth/slice';
import postsSlice from './slices/posts/slice';
import searchSlice from './slices/search/slice';
import commentsSlice from './slices/comments/slice';
const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postsSlice,
    search: searchSlice,
    comments: commentsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
