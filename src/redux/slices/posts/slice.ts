import { createSlice } from '@reduxjs/toolkit';

type PostsStates = {
  limit: number;
  offset: number;
  tags: string[];
};

const initialState: PostsStates = {
  limit: 4,
  offset: 0,
  tags: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedTags(state, action) {
      state.tags = action.payload;
    },
    setOffset(state, action) {
      state.offset = action.payload;
    },
  },
});

export const { setSelectedTags, setOffset } = postsSlice.actions;
export default postsSlice.reducer;
