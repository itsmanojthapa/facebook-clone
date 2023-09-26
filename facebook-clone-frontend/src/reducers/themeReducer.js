import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

let fromCookie = Cookies.get("darkTheme")
  ? JSON.parse(Cookies.get("darkTheme"))
  : false;

export const themeReducer = createSlice({
  name: "darkTheme",
  initialState: { darkTheme: fromCookie }, // Change the initialState to an object
  reducers: {
    DARK: (state, action) => {
      state.darkTheme = true;
    },
    LIGHT: (state, action) => {
      state.darkTheme = false;
    },
  },
});

export const { DARK, LIGHT } = themeReducer.actions;

export default themeReducer.reducer;
