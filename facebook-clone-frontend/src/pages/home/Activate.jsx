import { useEffect, useRef, useState } from "react";
import Header from "../../components/header";
import "./style.css";
import useclickOutSide from "../../helpers/clickOutSide";
import LeftHome from "../../components/home/left";
import { useSelector } from "react-redux";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import CreatePost from "../../components/createPost";
import ActivateForm from "./activateForm";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Activate() {
  const user = useSelector((state) => {
    return state.user;
  });
  const [success, setSuccess] = useState("adfa");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("flase");

  const { token } = useParams();
  console.log("Token is : " + token);
  const activateAccount = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:8000/activate",
        { token },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(data.message);
      Cookies.set("user", JSON.stringify({ ...user, verified: true }));
      dispatch(LOGIN({ ...user, verified: true }));
      setTimeout(() => {
        navigator("/");
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    activateAccount();
  }, [token]);

  return (
    <div className="base">
      {success && (
        <ActivateForm
          type="success"
          Header="Account verification succeded"
          text={success}
          loading={loading}
        />
      )}
      {error && (
        <ActivateForm
          type="error"
          Header="Account verification failed"
          text={error}
          loading={loading}
        />
      )}
      <Header />
      <div className="home">
        <LeftHome user={user} />
        <div className="home_middle">
          <Stories />
          <CreatePost user={user} />
        </div>
        <RightHome user={user} />
      </div>
    </div>
  );
}
