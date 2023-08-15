// import { useDispatch, useSelector } from "react-redux";
// import { login } from "./userReducer";

// const dispatch = useDispatch();
// const user = useSelector((state) => state.userReducer.user);
// dispatch(login({ name: "New User" }));
// console.log(user);

import { configureStore } from "@reduxjs/toolkit";
import user from "./userReducer";

export default configureStore({
  reducer: {
    user: user,
  },
});
