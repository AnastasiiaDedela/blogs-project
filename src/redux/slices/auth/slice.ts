import { User } from '@/types/user';
import { createSlice } from '@reduxjs/toolkit';

type Auth = {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
};

const initialState: Auth = {
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
export default authSlice.reducer;
