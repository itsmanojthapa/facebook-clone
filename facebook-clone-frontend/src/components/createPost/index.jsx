import "./style.css";
import { Feeling, LiveVideo, Photo } from "../../svg";

export default function CreatePost({ user, setVisible }) {
  return (
    <div className="createPost">
      <div
        className="createPost_header"
        onClick={() => {
          setVisible(true);
        }}>
        <img src={user.picture} alt="" />
        <div className="open_post">What's on your mind, {user?.first_name}</div>
      </div>
      <div className="create_splitter"></div>
      <div className="createPost_body">
        <div className="createPost_icon hover1">
          <LiveVideo color="#f3425f" />
          Live Video
        </div>
        <div className="createPost_icon hover1">
          <Photo color="#4bbf67" />
          Photo/Video
        </div>
        <div className="createPost_icon hover1">
          <Feeling color="#f7b928" />
          Feeling/Activity
        </div>
      </div>
    </div>
  );
}
