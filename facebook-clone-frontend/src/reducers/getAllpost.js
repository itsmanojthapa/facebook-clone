import { createSlice } from "@reduxjs/toolkit";

export const allpostReducer = createSlice({
  name: "allpost",
  initialState: {
    posts: [],
    loading: false,
    error: "",
  },
  reducers: {
    POSTS_REQUEST: (state, action) => {
      state.error = "";
      state.loading = true;
      state.posts = action.payload;
      return state;
    },
    POSTS_SUCCESS: (state, action) => {
      state.error = "";
      state.loading = false;
      state.posts = action.payload;
      return state;
    },
    POSTS_ERROR: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      return state;
    },
  },
});

export const { POSTS_REQUEST, POSTS_SUCCESS, POSTS_ERROR } =
  allpostReducer.actions;

export default allpostReducer.reducer;
