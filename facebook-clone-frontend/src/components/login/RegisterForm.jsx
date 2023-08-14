import { Form, Formik } from "formik";
import { useState, useEffect } from "react";
import RegisterInput from "../inputs/registerInput";
import * as Yup from "yup";
import DateOfBirthSelect from "./DateOfBirthSelect";
import GenderSelect from "./GenderSelect";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import SyncLoader from "react-spinners/SyncLoader";
//https://www.davidhu.io/react-spinners/

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reducers/userReducer";

export default function RegisterForm({ setVisible }) {
  const navigate = useNavigate();
  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  };
  const [user, setUser] = useState(userInfos);
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const years = Array.from(new Array(108), (val, index) => bYear - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDay = () => {
    return new Date(bYear, bMonth, 0).getDate() + 1;
  };
  const days = Array.from(new Array(getDay()), (val, index) => index + 1);
  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What's your First name ?")
      .min(2, "Fisrt name must be between 2 and 16 characters.")
      .max(16, "Fisrt name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
    last_name: Yup.string()
      .required("What's your Last name ?")
      .min(2, "Last name must be between 2 and 16 characters.")
      .max(16, "Last name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
  });
  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer.user);
  // console.log(userState);

  const registerSubmit = async () => {
    try {
      const { data } = await axios.post(`http://localhost:8000/register`, {
        first_name,
        last_name,
        email,
        password,
        bYear,
        bMonth,
        bDay,
        gender,
      });
      setError("");
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch(login({ ...rest }));
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 1000 * 5);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      console.log(error);
      setError(error.response.data.message);
    }
  };
  let dateeroo = () => {
    let current_date = new Date();
    let picked_date = new Date(bYear, bMonth, bDay);
    let atleast14 = new Date(
      new Date().getFullYear() - 14 + "-" + bMonth + "-" + bDay
    );
    let noMoreThan70 = new Date(
      new Date().getFullYear() - 70 + "-" + bMonth + "-" + bDay
    );
    let err1 = false,
      err2 = false;

    if (current_date - picked_date < current_date - atleast14) {
      err1 = true;
      setDateError(
        "it looks like you've enetered the wrong info. Please make sure that you use your real date of birth."
      );
    } else if (current_date - picked_date > current_date - noMoreThan70) {
      err1 = true;
      setDateError(
        "it looks like you've enetered the wrong info. Please make sure that you use your real date of birth."
      );
    } else {
      err1 = false;
      setDateError("");
    }
    if (gender === "") {
      err2 = true;
      setGenderError(
        "Please choose a gender. You can change who can see this later."
      );
    } else {
      err2 = false;
      setGenderError("");
    }
    if (!(err1 || err2)) {
      registerSubmit();
    }
  };
  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i
            onClick={() => {
              setVisible(false);
            }}
            className="exit_icon"></i>
          <span>Sign Up</span>
          <span>it's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          onSubmit={() => {}}
          validationSchema={registerValidation}>
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Surname"
                  name="last_name"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Mobile number or email address"
                  name="email"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="New password"
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  handleRegisterChange={handleRegisterChange}
                  dateError={dateError}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                />
              </div>
              <div className="reg_infos">
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Data Policy &nbsp;</span>
                and <span>Cookie Policy.</span> You may receive SMS
                notifications from us and can opt out at any time.
              </div>
              <div className="reg_btn_wrapper">
                <button
                  type="submit"
                  onClick={dateeroo}
                  className="blue_btn open_signup">
                  Sign Up
                </button>
              </div>
              <SyncLoader color="green" loading={loading} size={13} />
              {error && <div className="error_text">{error} </div>}
              {success && <div className="success_text">{success} </div>}
              {loading && <div className="loading_">{loading} </div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
