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
import { useEffect, useState } from "react";
import { postsState, loadingState, errorState } from "./atom";
import { useRecoilState } from "recoil";
import CreatePostPopup from "./components/createPostPopup";

function App() {
  const user = useSelector((state) => state.user);
  const [posts, setPosts] = useRecoilState(postsState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [error, setError] = useRecoilState(errorState);
  const [visible, setVisible] = useState(false);

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
      {visible && <CreatePostPopup user={user} setVisible={setVisible} />}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route
            path="/"
            element={
              <Home
                user={user}
                posts={posts}
                visible={visible}
                setVisible={setVisible}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile user={user} visible={visible} setVisible={setVisible} />
            }
            exact
          />
          <Route
            path="/profile/:username"
            element={
              <Profile user={user} visible={visible} setVisible={setVisible} />
            }
            exact
          />
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
