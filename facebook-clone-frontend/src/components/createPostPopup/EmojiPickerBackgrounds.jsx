import Picker from "emoji-picker-react";
import { useEffect, useState } from "react";

export default function EmojiPickerBackgrounds({ textRef, text, setText }) {
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
    <div className="post_emojis_wrap">
      {picker && (
        <div className="comment_emoji_picker rlmove">
          <Picker onEmojiClick={handleEmoji} />
        </div>
      )}
      <img src="../../../public/icons/colorful.png" alt="" />
      <i
        className="emoji_icon_large"
        onClick={() => {
          setPicker((val) => !val);
        }}></i>
    </div>
  );
}
