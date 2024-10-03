import React from "react";

export default function GridPost() {
  return (
    <div className="createPost">
      <div
        className="createPost_header"
        style={{ justifyContent: "space-between" }}>
        <div className="left_header_grid">Post</div>
        <div className="flex">
          <div className="gray_btn">
            <i className="equalize_icon"></i>
          </div>
          <div className="gray_btn">
            <i className="manage_icon"></i>
            Manage Posts
          </div>
        </div>
      </div>
      <div className="create_splitter"></div>
      <div className="createPost_body grid2">
        <div className="view_type active_grid">
          <div className="view_type active">
            <i className="list_icon filter_blue"></i>
            List View
          </div>
        </div>
        <div className="view_type">
          <div className="grid_icon"></div>
          Grid view
        </div>
      </div>
    </div>
  );
}
