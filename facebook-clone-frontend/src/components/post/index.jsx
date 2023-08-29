import "./style.css";
import React from "react";
import { Link } from "react-router-dom";
import { Dots, Public } from "../../svg";

export default function Post({ post }) {
  return (
    <div className="post">
      <div className="post_header">
        <Link
          to={`/profile/ ${post.user.username}`}
          className="post_header_left">
          <img src={post.user.picture} alt="" />
          <div className="header_col">
            <div className="post_profile_name">
              {post.user.first_name + " "}
              {post.user.last_name}
              <div className="updated_p">
                {post.type == "profilePicture" &&
                  `updated ${
                    post.user.gender === "male" ? "his" : "her"
                  } profile picture`}
                {post.type == "cover" &&
                  `updated ${
                    post.user.gender === "male" ? "his" : "her"
                  } cover picture`}
              </div>
            </div>
            <div className="post_profile_privacy_date">
              {post.createdAt}
              <Public color="#828387" />
            </div>
          </div>
        </Link>
        <Dots color="#828387" />
      </div>
      {post.background ? (
        <div
          className="post_bg"
          style={{ backgroundImage: `url(${post.background})` }}>
          <div className="post_bg_text">{post.text}</div>
        </div>
      ) : (
        <>
          <div className="post_text">{post.text}</div>
          {post.images && post.images.length && (
            <div
              className={
                post.images.length === 1
                  ? "grid_1"
                  : post.images.length === 2
                  ? "grid_2"
                  : post.images.length === 3
                  ? "grid_3"
                  : post.images.length === 4
                  ? "grid_4"
                  : "grid_5"
              }>
              {post.images.slice(0, 5).map((image, i) => {
                return <img src={image.url} key={i} className={`img-${i}`} />;
              })}
              {post.images.length > 5 && (
                <div className="more-pics-shadow">
                  +{post.images.length - 5}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
