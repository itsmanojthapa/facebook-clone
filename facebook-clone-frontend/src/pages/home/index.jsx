import { useRef, useState } from "react";
import Header from "../../components/header";
import "./style.css";
import useclickOutSide from "../../helpers/clickOutSide";
import LeftHome from "../../components/home/left";
import { useSelector } from "react-redux";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import CreatePost from "../../components/createPost";

export default function Home() {
  const [visible, setVisible] = useState(true);
  const user = useSelector((state) => {
    return state.user;
  });
  const el = useRef(null);
  useclickOutSide(el, () => {
    setVisible(false);
    // el.current.style.display = "none";
  });
  return (
    <div className="home">
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
      {/* {visible && <div className="card" ref={el}></div>} */}
    </div>
  );
}
