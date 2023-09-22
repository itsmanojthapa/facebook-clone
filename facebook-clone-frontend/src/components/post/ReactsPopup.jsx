import "../../../public/reacts/love.gif";
import { reactPost } from "../../functions/post";
import { useSelector } from "react-redux";

const reactsArray = [
  {
    name: "like",
    image: "../../public/reacts/like.gif",
  },
  {
    name: "love",
    image: "../../../public/reacts/love.gif",
  },
  {
    name: "haha",
    image: "../../../public/reacts/haha.gif",
  },
  {
    name: "wow",
    image: "../../../public/reacts/wow.gif",
  },
  {
    name: "sad",
    image: "../../../public/reacts/sad.gif",
  },
  {
    name: "angry",
    image: "../../../public/reacts/angry.gif",
  },
];
export default function ReactsPopup({ visible, setVisible, reactHandler }) {
  return (
    <>
      {visible && (
        <div
          className="reacts_popup"
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}>
          {reactsArray.map((react, i) => (
            <div
              className="react"
              key={i}
              onClick={() => {
                reactHandler(react.name);
              }}>
              <img src={react.image} alt="" />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
