import { useState } from "react";
import Header from "../../components/header";
import "./style.css";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import CreatePost from "../../components/createPost";
import SendVerification from "../../components/home/sendVerification";
import Post from "../../components/post";

export default function Home({ user, posts, setVisible }) {
  return (
    <div className="base">
      <Header page="home" />
      <div className="home">
        <LeftHome user={user} />
        <div className="home_middle">
          <Stories />
          {!user.id && <SendVerification user={user} />}
          <CreatePost setVisible={setVisible} user={user} />
          <div className="posts">
            {posts[0] &&
              posts.map((post, i) => <Post post={post} user={user} key={i} />)}
          </div>
        </div>
        <RightHome user={user} />
      </div>
    </div>
  );
}
