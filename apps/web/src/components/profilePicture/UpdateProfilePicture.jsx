import { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helpers/getCroppedImg";
import { useSelector, useDispatch } from "react-redux";
import { uploadImages } from "../../functions/uploadImages";
import { updateprofilePicture } from "../../functions/user";
import { createPost } from "../../functions/post";
import PulseLoader from "react-spinners/PulseLoader";
import Cookies from "js-cookie";
import { UPDATE_PICTURE_URL } from "../../reducers/userReducer";

export default function UpdateProfilePicture({
  image,
  setImage,
  setError,
  setShow,
  pRef,
}) {
  const user = useSelector((state) => {
    return state.user;
  });
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const slider = useRef(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const zoomIn = () => {
    if (zoom < 3) {
      slider.current.stepUp();
      setZoom(zoom + 0.2);
    }
  };
  const zoomOut = () => {
    if (zoom > 1) {
      slider.current.stepDown();
      setZoom(zoom - 0.2);
    }
  };

  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(image, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setImage(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );

  const updateProfilePicture = async () => {
    try {
      setLoading(true);
      let img = await getCroppedImage();
      let blob = await fetch(img).then((b) => b.blob());
      const path = `facebook-clone/${user.username}/profile_pictures`;
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
      const res = await uploadImages(formData, path, user.token);
      const update_picture = await updateprofilePicture(res[0].url, user.token);
      if (update_picture === "ok") {
        const new_post = await createPost(
          "profilePicture",
          null,
          description,
          { url: res[0].url },
          user.id,
          user.token
        );
        if (new_post === "ok") {
          console.log("OK");
          pRef.current.style.backgroundImage = `url(${res[0].url})`;
          Cookies.set("user", JSON.stringify({ ...user, picture: res[0].url }));
          useDispatch(UPDATE_PICTURE_URL(res[0].url));
          setLoading(false);
          setShow(false);
          setImage("");
        } else {
          setLoading(false);
          setError(new_post);
        }
      } else {
        setError(update_picture);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.response.data.error);
    }
  };

  return (
    <div className="postBox update_img">
      <div className="box_header">
        <div
          className="small_circle "
          onClick={() => {
            setImage("");
          }}>
          <i className="exit_icon"></i>
        </div>
        <span>Update profile picture</span>
      </div>
      <div className="update_image_desc">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="textarea_blue details_imput"></textarea>
      </div>
      <div className="update_center">
        <div className="crooper">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape="round"
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="slider">
          <div
            className="slider_circle"
            onClick={() => {
              zoomOut();
            }}>
            <i className="minus_icon"></i>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            step={0.2}
            value={zoom}
            ref={slider}
            onChange={(e) => {
              setZoom(e.target.value);
            }}
          />
          <div
            className="slider_circle"
            onClick={() => {
              zoomIn();
            }}>
            <i className="plus_icon"></i>
          </div>
        </div>
      </div>
      <div className="flex_up">
        <div
          className="gray_btn"
          onClick={() => {
            getCroppedImage("show");
          }}>
          <i className="crop_icon"></i>Crop photo
        </div>
        <div className="gray_btn">
          <i className="temp_icon"></i>Make Temporary
        </div>
      </div>
      <div className="flex_p_t">
        <i className="public_icon"></i>
        Your Profile picture is public
      </div>
      <div
        className="update_submit_wrap"
        onClick={() => {
          setImage("");
        }}>
        <div className="blue_link">Cancel</div>
        <button
          className="blue_btn"
          disabled={loading}
          onClick={() => {
            updateProfilePicture();
          }}>
          {loading ? <PulseLoader color="#fff" size={5} /> : "Save"}
        </button>
      </div>
    </div>
  );
}
