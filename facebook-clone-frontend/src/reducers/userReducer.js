import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

let fromCookie = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

export const userReducer = createSlice({
  name: "user",
  initialState: {
    ...fromCookie,
  },
  reducers: {
    LOGIN: (state, action) => {
      state.user = action.payload;
    },
    UPDATE_PICTURE_URL: (state, action) => {
      state.user.picture.url = action.payload;
    },
  },
});

export const { LOGIN, UPDATE_PICTURE_URL } = userReducer.actions;

export default userReducer.reducer;
