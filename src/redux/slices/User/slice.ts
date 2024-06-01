import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    error: null,
    loading: false,
  },
  reducers: {},
});

export default userSlice.reducer;
