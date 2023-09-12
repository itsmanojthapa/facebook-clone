import { Link, useNavigate, useParams } from "react-router-dom";
import "./style.css";
import axios from "axios";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { profileState, loadingState, errorState } from "../../atom";
import { useEffect, useRef, useState } from "react";
import Header from "../../components/header";
import Cover from "./Cover";
import ProfilePictureInfos from "./ProfilePictureInfos";
import ProfileMenu from "./ProfileMenu";
import PplYouMayKnow from "./PplYouMayKnow";
import CreatePost from "../../components/createPost";
import GridPost from "./GridPost";
import Post from "../../components/post";
import Photos from "./Photos";
import Friends from "../../components/post/Friends";

export default function Profile({ user, visible, setVisible }) {
  const { username } = useParams();
  const navigate = useNavigate();
  let userName = username === undefined ? user.username : username;
  const [profile, setProfile] = useRecoilState(profileState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [error, setError] = useRecoilState(errorState);

  useEffect(() => {
    getProfile();
  }, [userName]);

  let visitor = userName === user.username ? false : true;
  const getProfile = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await axios(
        `http://localhost:8000/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLoading(false);
      if (data.ok === false) {
        navigate("/profile");
      } else {
        setProfile(data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="profile">
      <Header page="profile" />
      <div className="profile_top">
        <div className="profile_container">
          <Cover cover={profile.cover} />
          <ProfilePictureInfos profile={profile} visitor={visitor} />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PplYouMayKnow />
            <div className="profile_grid">
              <div className="profile_left">
                <Photos userName={userName} token={user.token} />
                <Friends friends={profile.friends} />
                <div className="relative_fb_copyright">
                  <Link to="/">Privacy </Link>
                  <span>. </span>
                  <Link to="/">Terms </Link>
                  <span>. </span>
                  <Link to="/">Advertising </Link>
                  <span>. </span>
                  <Link to="/">
                    Ad Choices <i className="ad_choices_icon"></i>{" "}
                  </Link>
                  <span>. </span>
                  <Link to="/"></Link>Cookies <span>. </span>
                  <Link to="/">More </Link>
                  <span>. </span> <br />
                  Meta © 2022
                </div>
              </div>
              <div className="profile_right">
                {!visitor && (
                  <CreatePost
                    user={user}
                    profile={profile}
                    setVisible={setVisible}
                  />
                )}
                <GridPost />
                {profile.posts && profile.posts.length ? (
                  profile.posts.map((post) => (
                    <Post
                      post={post}
                      user={user}
                      key={post._id}
                      profile={profile}
                    />
                  ))
                ) : (
                  <div className="no_posts">No posts available </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
