import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./userReducer";

export default configureStore({
  reducer: {
    userReducer: counterReducer,
  },
});
