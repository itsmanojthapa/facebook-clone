import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function NotLoggedInRoutes() {
  const user = useSelector((state) => {
    return state.user;
  });
  return Object.keys(user).length === 0 ? <Outlet /> : <Navigate to="/" />;
}
