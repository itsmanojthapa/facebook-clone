import { useRef } from "react";
import Header from "../../components/header";
import "./style.css";
import useclickOutSide from "../../helpers/clickOutSide";
import LeftHome from "../../components/home/left";
import { useSelector } from "react-redux";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import CreatePost from "../../components/createPost";
import SendVerification from "../../components/home/sendVerification";
import CreatePostPopup from "../../components/createPostPopup";

export default function Home() {
  const user = useSelector((state) => {
    return state.user;
  });

  return (
    <div className="base">
      <CreatePostPopup user={user} />
      <Header />
      <div className="home">
        <LeftHome user={user} />
        <div className="home_middle">
          <Stories />
          {!user.id && <SendVerification user={user} />}
          <CreatePost user={user} />
        </div>
        <RightHome user={user} />
      </div>
    </div>
  );
}
