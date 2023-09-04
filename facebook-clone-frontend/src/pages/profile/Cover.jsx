import React, { useRef } from "react";
import { useState } from "react";
import useclickOutSide from "../../helpers/clickOutSide";

export default function Cover({ cover, showCoverMeny, SetShowCoverMenu }) {
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const menuRef = useRef();
  useclickOutSide(menuRef, () => {
    setShowCoverMenu(false);
  });

  return (
    <div className="profile_cover">
      {cover && <img src={cover} className="cover" />}
      <div className="udpate_cover_wrapper" ref={menuRef}>
        <div
          className="open_cover_update"
          onClick={() => {
            setShowCoverMenu((val) => !val);
          }}>
          <i className="camera_filled_icon"></i>
          Add Cover Photo
        </div>
        {showCoverMenu && (
          <div className="open_cover_menu">
            <div className="open_cover_menu_item hover1">
              <i className="upload_icon"></i>
              Upload Photo
            </div>
            <div className="open_cover_menu_item hover1">
              <i className="upload_icon"></i>
              Upload Photo
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
