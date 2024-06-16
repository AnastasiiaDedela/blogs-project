import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem('@token', token);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('@token');
    },
  },
});

export const { login, logout } = authSlice.actions;
// export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
