import { Formik, Form } from "formik";
import LoginInput from "../inputs/loginInput";
import { useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LOGIN } from "../../reducers/userReducer";
import SyncLoader from "react-spinners/SyncLoader";
import Cookies from "js-cookie";

const loginInfos = {
  email: "",
  password: "",
};

export default function LoginForm({ setVisible }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  // console.log(login);
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const loginValidation = Yup.object({
    //schema to validate data
    email: Yup.string()
      .required("Email address is required.")
      .email("Must be a valid email.")
      .max(100),
    password: Yup.string().required("Password is required"),
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`http://localhost:8000/login`, {
        email,
        password,
      });
      setError("");
      console.log(data);
      dispatch(LOGIN({ ...data }));
      Cookies.set("user", JSON.stringify(data));
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/facebook.svg" alt="" />
        <span>
          Facebook helps you connect and share with the people in your life.
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            onSubmit={() => {
              loginSubmit();
            }}
            validationSchema={loginValidation}>
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email address or phone number"
                  onChange={handleLoginChange}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  bottom
                />
                <button type="submit" className="blue_btn">
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/forgot" className="forgot_password">
            Forgotten password ?
          </Link>
          {error && <div className="error_text">{error}</div>}
          <SyncLoader color="#1876f2" loading={loading} size={13} />
          {loading && <div className="loading_">{loading} </div>}
          <div className="sign_splitter"></div>
          <button
            onClick={() => {
              setVisible(true);
            }}
            className="blue_btn open_signup">
            Create Account
          </button>
        </div>
        <Link to="/" className="sign_extra">
          <b>Create a Page </b>
          for a celebrity, brand or business.
        </Link>
      </div>
    </div>
  );
}
