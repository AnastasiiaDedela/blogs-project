import { createSlice } from '@reduxjs/toolkit';

type CommentsStates = {
  limit: number;
  offset: number;
};

const initialState: CommentsStates = {
  limit: 3,
  offset: 0,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setOffset(state, action) {
      state.offset = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
    },
  },
});

export const { setLimit, setOffset } = commentsSlice.actions;
export default commentsSlice.reducer;
