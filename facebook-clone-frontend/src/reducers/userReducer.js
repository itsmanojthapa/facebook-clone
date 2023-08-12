import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "userReducer",
  initialState: {
    user: null,
  },
  reducers: {
    LOGIN: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { LOGIN } = counterSlice.actions;

export default counterSlice.reducer;
