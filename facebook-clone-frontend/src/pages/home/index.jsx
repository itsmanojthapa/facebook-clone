import { useRef, useState } from "react";
import Header from "../../components/header";
import "./style.css";
import useclickOutSide from "../../helper/clickOutSide";

export default function Home() {
  const { visible, setVisible } = useState(true);
  const el = useRef(null);
  let call = () => {
    useState(false);
  };
  useclickOutSide(el, () => {
    // setVisible(false);
    el.current.style.display = "none";
  });
  return (
    <>
      <Header />

      {!visible && <div className="card" ref={el}></div>}
    </>
  );
}
