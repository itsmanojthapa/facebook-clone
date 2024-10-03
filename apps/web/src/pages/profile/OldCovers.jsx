import React, { useRef } from "react";
import { useSelector } from "react-redux";
import useclickOutSide from "../../helpers/clickOutSide";

export default function OldCovers({ photos, setCoverPicture, setShow }) {
  const user = useSelector((state) => {
    return state.user;
  });
  const Ref = useRef(null);
  useclickOutSide(Ref, () => setShow(false));

  return (
    <div className="blur">
      <div className="postBox selectCoverBox" ref={Ref}>
        <div className="box_header">
          <div
            className="small_circle"
            onClick={() => {
              setShow(false);
            }}>
            {" "}
            <i className="exit_icon"></i>{" "}
          </div>
          <span>Select photo</span>
        </div>
        <div className="selectCoverBox_links">
          <div className="selectCoverBox_link">Recent Photos</div>
          <div className="selectCoverBox_link">Photo Albums</div>
        </div>
        <div className="old_pictures_wrap scrollbar">
          <div className="old_pictures">
            {photos.resources &&
              photos.resources
                .filter(
                  (img) =>
                    img.folder ===
                    `facebook-clone/${user.username}/cover_pictures`
                )
                .map((img) => (
                  <img
                    src={img.secure_url}
                    key={img.public_id}
                    alt=""
                    onClick={() => {
                      setCoverPicture(img.secure_url);
                      setShow(false);
                    }}
                  />
                ))}
          </div>
          <div className="old_pictures">
            {photos.resources &&
              photos.resources
                .filter(
                  (img) =>
                    img.folder !==
                    `facebook-clone/${user.username}/cover_pictures`
                )
                .map((img) => (
                  <img
                    src={img.secure_url}
                    key={img.public_id}
                    alt=""
                    onClick={() => {
                      setCoverPicture(img.secure_url);
                      setShow(false);
                    }}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
