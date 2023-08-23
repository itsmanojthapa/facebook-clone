import Picker from "emoji-picker-react";
import { useEffect, useState, useRef } from "react";

export default function EmojiPickerBackgrounds({ text, setText, user, type2 }) {
  const textRef = useRef();
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();

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
  return (
    <>
      <div className={type2 ? "images_input" : undefined}>
        <div className={type2 ? undefined : "flex_center"}>
          <textarea
            maxLength="100"
            value={text}
            ref={textRef}
            placeholder={`What's on your mind, ${user.first_name}`}
            className={`post_input ${type2 ? "input2" : undefined}`}
            onChange={(e) => setText(e.target.value)}></textarea>
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
          {!type2 && <img src="../../../public/icons/colorful.png" alt="" />}
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
