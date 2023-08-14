import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

let fromCookie = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

export const userReducer = createSlice({
  name: "userReducer",
  initialState: {
    user: fromCookie,
  },
  reducers: {
    LOGIN: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { LOGIN } = userReducer.actions;

export default userReducer.reducer;
