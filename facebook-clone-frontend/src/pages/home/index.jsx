import { useState } from "react";
import Header from "../../components/header";
import "./style.css";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import CreatePost from "../../components/createPost";
import SendVerification from "../../components/home/sendVerification";
import CreatePostPopup from "../../components/createPostPopup";
import Post from "../../components/post";

export default function Home({ user, posts }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="base">
      {visible && <CreatePostPopup user={user} setVisible={setVisible} />}
      <Header />
      <div className="home">
        <LeftHome user={user} />
        <div className="home_middle">
          <Stories />
          {!user.id && <SendVerification user={user} />}
          <CreatePost setVisible={setVisible} user={user} />
          <div className="posts">
            {posts[0] &&
              posts.map((post) => <Post post={post} key={post._id} />)}
            <div className="div">Hello World</div>
          </div>
        </div>
        <RightHome user={user} />
      </div>
    </div>
  );
}
