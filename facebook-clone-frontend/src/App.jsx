import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Activate from "./pages/home/Activate";
import Reset from "./pages/reset";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [posts, setPosts] = useRecoilState(postsState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [error, setError] = useRecoilState(errorState);
  useEffect(() => {
    getAllposts();
  }, []);

  const getAllposts = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await axios("http://localhost:8000/getAllpost", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setPosts(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element={<Home user={user} posts={posts} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/activate/:token" element={<Activate user={user} />} />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/reset" element={<Reset user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const postsState = atom({
  key: "postsState",
  default: {
    posts: {},
  },
});

const loadingState = atom({
  key: "loadingState",
  default: {
    loading: false,
  },
});
const errorState = atom({
  key: "errorState",
  default: {
    error: "",
  },
});
