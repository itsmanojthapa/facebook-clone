import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { errorState, loadingState, photosState } from "../../atom";
import axios from "axios";

export default function Photos({ userName, token }) {
  const [loading, setLoading] = useRecoilState(loadingState);
  const [error, setError] = useRecoilState(errorState);
  const [photos, setPhotos] = useRecoilState(photosState);

  useEffect(() => {
    getPhotos();
  }, [userName]);

  const path = `facebook-clone/${userName}/*`;
  const max = 30;
  const sort = "desc";
  const getPhotos = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await axios.post(
        "http://localhost:8000/listImages",
        { path: path, max: max, sort: sort },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      setPhotos(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  console.log(photos);
  return (
    <div className="profile_card">
      <div className="profile_card_header">
        Photos
        <div className="profile_header_link">See all photos</div>
      </div>
      <div className="profile_card_count">
        {photos.total_count === 0
          ? ""
          : photos.total_count === 1
          ? "1 Photo"
          : `${photos.total_count} photos`}
      </div>
      <div className="profile_card_grid">
        {photos.resources &&
          photos.resources.slice(0, 9).map((img) => (
            <div className="profile_photo_card" key={img.public_id}>
              <img src={img.secure_url} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
}
