import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./userReducer";

const store = configureStore({
  reducer: {
    userReducer: counterReducer,
  },
  devTools: true,
});

export default store;
