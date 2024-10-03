import Picker from "emoji-picker-react";
import { useEffect, useState, useRef } from "react";

export default function EmojiPickerBackgrounds({
  text,
  setText,
  user,
  type2,
  background,
  setBackground,
}) {
  const textRef = useRef();
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const [showBgs, setShowBgs] = useState(false);
  const bgRef = useRef(null);

  useEffect(() => {
    //it sets cursor to prev position
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = ({ emoji }) => {
    const ref = textRef.current;
    ref.focus(); // it will focus on textarea ref
    const start = text.substring(0, ref.selectionStart); //all text before the cursor
    const end = text.substring(ref.selectionStart); // all text after the curso
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };
  const postBackgrounds = [
    "../../../public/images/postbackgrounds/1.jpg",
    "../../../public/images/postbackgrounds/2.jpg",
    "../../../public/images/postbackgrounds/3.jpg",
    "../../../public/images/postbackgrounds/4.jpg",
    "../../../public/images/postbackgrounds/5.jpg",
    "../../../public/images/postbackgrounds/6.jpg",
    "../../../public/images/postbackgrounds/7.jpg",
    "../../../public/images/postbackgrounds/8.jpg",
    "../../../public/images/postbackgrounds/9.jpg",
  ];
  const backgroundHanlder = (i) => {
    bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
    setBackground(postBackgrounds[i]);
    bgRef.current.classList.add("bgHandler");
  };
  const removeBackground = (i) => {
    bgRef.current.style.backgroundImage = "";
    setBackground("");
    bgRef.current.classList.remove("bgHandler");
  };
  return (
    <>
      <div className={type2 ? "images_input" : undefined}>
        <div className={type2 ? undefined : "flex_center"} ref={bgRef}>
          <textarea
            maxLength="100"
            value={text}
            ref={textRef}
            placeholder={`What's on your mind, ${user.first_name}`}
            className={`post_input ${type2 ? "input2" : undefined}`}
            onChange={(e) => setText(e.target.value)}
            style={{
              paddingTop: `${
                background
                  ? Math.abs(textRef.current.value.length * 0.1 - 32)
                  : "0"
              }%`,
            }}></textarea>
        </div>
        <div className={type2 ? undefined : "post_emojis_wrap"}>
          {picker && (
            <div
              className={`comment_emoji_picker rlmove ${
                type2 ? "movepicker2" : "rlmove"
              }`}>
              <Picker onEmojiClick={handleEmoji} />
            </div>
          )}
          {!type2 && (
            <img
              src="../../../public/icons/colorful.png"
              alt=""
              onClick={() => {
                setShowBgs((prev) => !prev);
              }}
            />
          )}
          {!type2 && showBgs && (
            <div className="post_backgrounds">
              <div
                className="no_bg"
                onClick={() => {
                  removeBackground();
                }}>
                {" "}
              </div>
              {postBackgrounds.map((bg, i) => (
                <img
                  src={bg}
                  key={i}
                  alt=""
                  onClick={() => {
                    backgroundHanlder(i);
                  }}
                />
              ))}
            </div>
          )}
          <i
            className={`emoji_icon_large ${type2 ? "moveleft" : undefined}`}
            onClick={() => {
              setPicker((val) => !val);
            }}></i>
        </div>
      </div>
    </>
  );
}
