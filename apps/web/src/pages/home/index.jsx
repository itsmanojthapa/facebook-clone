import { useState } from "react";
import Header from "../../components/header";
import "./style.css";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import CreatePost from "../../components/createPost";
import SendVerification from "../../components/home/sendVerification";
import Post from "../../components/post";
import { useEffect } from "react";
import { useRef } from "react";
import { loadingState } from "../../atom";
import { HashLoader } from "react-spinners";
import { useRecoilState } from "recoil";

export default function Home({ user, posts, setVisible }) {
  const middle = useRef(null);
  const [height, setHeight] = useState();
  const [loading, setLoading] = useRecoilState(loadingState);

  useEffect(() => {
    window.addEventListener("scroll", scrollHeight);
    setHeight(middle.current.clientHeight);
  });

  const scrollHeight = () => {
    if (middle.current) {
      setHeight(middle.current.clientHeight);
    }
  };

  return (
    <div className="home" style={{ height: `${height + 150}px` }}>
      <Header page="home" />
      <div className="home">
        <LeftHome user={user} />
        <div className="home_middle" ref={middle}>
          <Stories />
          {!user.id && <SendVerification user={user} />}
          <CreatePost setVisible={setVisible} user={user} />
          {loading ? (
            <div className="sekelton_loader">
              <HashLoader color="#1876f2" />
            </div>
          ) : (
            <div className="posts">
              {posts[0] &&
                posts.map((post, i) => (
                  <Post post={post} user={user} key={i} />
                ))}
            </div>
          )}
        </div>
        <RightHome user={user} />
      </div>
    </div>
  );
}
