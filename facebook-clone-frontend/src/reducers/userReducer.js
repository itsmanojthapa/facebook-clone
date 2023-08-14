import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

let fromCookie = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

export const userReducer = createSlice({
  name: "userReducer",
  initialState: {
    user: fromCookie,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login } = userReducer.actions;

export default userReducer.reducer;
