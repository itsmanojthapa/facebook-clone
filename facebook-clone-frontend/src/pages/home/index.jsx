import { useRef } from "react";
import Header from "../../components/header";
import "./style.css";
import useclickOutSide from "../../helpers/clickOutSide";
import LeftHome from "../../components/home/left";
import { useSelector } from "react-redux";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import CreatePost from "../../components/createPost";

export default function Home() {
  const user = useSelector((state) => {
    return state.user;
  });

  return (
    <div className="base">
      <Header />
      <div className="home">
        <LeftHome user={user} />
        <div className="home_middle">
          <Stories />
          <CreatePost user={user} />
        </div>
        <RightHome user={user} />
      </div>
    </div>
  );
}
