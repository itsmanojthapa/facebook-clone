import "./style.css";
import { Link } from "react-router-dom";

export default function Friends({ friends }) {
  return (
    <div className="profile_card">
      <div className="profile_card_header">
        Friends
        <div className="profile_header_link">See all friends</div>
      </div>
      {friends && (
        <div className="profile_card_count">
          {friends.length === 0
            ? ""
            : friends.length === 1
            ? "1 Photo"
            : `${friends.length} photos`}
        </div>
      )}
      <div className="profile_card_grid">
        {friends &&
          friends.slice(0, 9).map((friend, i) => (
            <Link
              key={i}
              to={`/profile/${friend.username}`}
              className="profile_photo_card">
              <img src={friend.picture} alt="" />
              <span>
                {friend.first_name}
                {friend.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}
