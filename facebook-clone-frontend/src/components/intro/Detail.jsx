import React, { useState } from "react";
import Bio from "./Bio";

export default function Detail({
  details,
  text,
  img,
  value,
  placeholder,
  name,
  handleChange,
  updateDetails,
  infos,
  max,
  rel,
}) {
  const [show, setShow] = useState(false);
  return (
    <>
      <div
        className="add_details_flex no_underline"
        onClick={() => setShow(true)}>
        {value ? (
          <div className="info_profile underline">
            <img src={`../../../public/icons/${img}.png`} alt="" />
            {value}
            <i className="edit_icon"></i>
          </div>
        ) : (
          <div
            onClick={() => {
              setShow(true);
            }}>
            <i className="rounded_plus_icon"></i>
            <span className="underline">Add {text}</span>
          </div>
        )}
      </div>
      {show && (
        <Bio
          placeholder={placeholder}
          name={name}
          handleChange={handleChange}
          updateDetails={updateDetails}
          infos={infos}
          details={details}
          setShow={setShow}
          max={max}
          rel={rel}
        />
      )}
    </>
  );
}
