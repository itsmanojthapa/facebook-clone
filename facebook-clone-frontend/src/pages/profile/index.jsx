import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import axios from "axios";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { profileState, loadingState, errorState } from "../../atom";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import Cover from "./Cover";
import ProfilePictureInfos from "./ProfilePictureInfos";
import ProfileMenu from "./ProfileMenu";
import PplYouMayKnow from "./PplYouMayKnow";
import CreatePost from "../../components/createPost";
import GridPost from "./GridPost";

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
          <ProfilePictureInfos profile={profile} />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PplYouMayKnow />
            <div className="profile_grid">
              <div className="profile_left profile_right">
                <CreatePost
                  user={user}
                  profile={profile}
                  setVisible={setVisible}
                />
                <GridPost />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
