import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "userReducer",
  initialState: {
    user: null,
  },
  reducers: {
    LOGIN: (state, action) => {
      state.user = action.payload;
      return user;
    },
    default: () => {
      return user;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
