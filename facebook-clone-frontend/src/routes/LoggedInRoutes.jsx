import React from "react";
import { Outlet } from "react-router-dom";
import Login from "../pages/login";
import { useSelector } from "react-redux";

export default function LoggedInRoutes() {
  const user = useSelector((state) => {
    return state.user;
  });
  console.log(!(Object.keys(user).length === 0));
  return !(Object.keys(user).length === 0) ? <Outlet /> : <Login />;
}
