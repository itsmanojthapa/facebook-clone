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
import Intro from "../../components/intro";
import { useMediaQuery } from "react-responsive";

export default function Profile({ user, visible, setVisible }) {
  const { username } = useParams();
  const navigate = useNavigate();
  let userName = username === undefined ? user.username : username;
  const [profile, setProfile] = useRecoilState(profileState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [error, setError] = useRecoilState(errorState);
  const [photos, setPhotos] = useState({});

  useEffect(() => {
    getProfile();
  }, [userName]);

  let visitor = userName === user.username ? false : true;
  const path = `facebook-clone/${userName}/*`;
  const max = 30;
  const sort = "desc";

  const [othername, setOthername] = useState();
  useEffect(() => {
    setOthername(profile?.details?.otherName);
  }, [profile]);

  const getProfile = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await axios.get(
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
        try {
          const path = `facebook-clone/${userName}/*`;
          const max = 30;
          const sort = "desc";

          const images = await axios.post(
            "http://localhost:8000/listImages",
            { path: path, max: max, sort: sort },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setPhotos(images.data);
        } catch (error) {}
        setProfile(data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error.response.data.message);
    }
  };
  const profileTop = useRef(null);
  const leftSide = useRef(null);
  const [height, setHeight] = useState();
  const [leftHeight, setLeftHeight] = useState();
  const [scrollHeight, setScrollHeight] = useState();

  useEffect(() => {
    setHeight(profileTop.current.clientHeight + 300);
    setLeftHeight(leftSide.current.clientHeight);
    window.addEventListener("scroll", getScroll, { passive: true });
  }, [loading, scrollHeight]);

  const check = useMediaQuery({
    query: "(min-width:901px)",
  });

  const getScroll = () => {
    setScrollHeight(window.pageYOffset);
  };
  return (
    <div className="profile">
      <Header page="profile" />
      <div className="profile_top" ref={profileTop}>
        <div className="profile_container">
          <Cover cover={profile.cover} visitor={visitor} photos={photos} />
          <ProfilePictureInfos
            profile={profile}
            visitor={visitor}
            photos={photos}
            othername={othername}
          />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PplYouMayKnow />

            <div
              className={`profile_grid ${
                check && scrollHeight >= height && leftHeight > 1000
                  ? "scrollFixed showLess"
                  : check &&
                    scrollHeight >= height &&
                    leftHeight < 1000 &&
                    "scrollFixed showMore"
              }`}>
              <div className="profile_left" ref={leftSide}>
                <Intro
                  detailss={profile.details}
                  visitor={visitor}
                  setOthername={setOthername}
                />
                <Photos
                  userName={userName}
                  token={user.token}
                  photos={photos}
                />
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
