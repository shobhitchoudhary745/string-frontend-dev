import React from "react";
import "./Login.scss";
import { FaLock } from "react-icons/fa6";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../features/authSlice";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  return token ? (
    <Navigate to="/" />
  ) : (
    <div className="login-main-container">
      <div>
        <img
          style={{ width: "150px", height: "42px" }}
          src="https://stringgeo.com/upload/NewFolder/String%20Geo%20logo%20Icon.png"
          alt="main-logo"
        />
      </div>
      <div className="login-container">
        <h3
          style={{
            color: "#f9f9f9",
            fontSize: "24px",
            fontWeight: "500",
            margin: "8px",
          }}
        >
          SIGN IN
        </h3>
        <input
          className="input-text"
          type="email"
          placeholder="Email Address"
        />
        <input className="input-text" type="password" placeholder="Password" />
        <div
          style={{
            display: "flex",
            gap: "5px",
            width: "100%",
            alignItems: "center",
          }}
        >
          <input
            style={{ color: "#ffffff", width: "17px", height: "17px" }}
            type="checkbox"
          />
          <label style={{ color: "#f9f9f9", fontSize: "14px" }}>
            Remember me
          </label>
        </div>
        <button
          onClick={() => {
            localStorage.setItem("token", "dummytoken");
            dispatch(setToken({ token: "dummytoken" }));
            navigate("/");
          }}
          type="submit"
          className="submit-button"
        >
          LOG IN OR SIGN UP TO CONTINUE
        </button>
        <div
          style={{ color: "#98a6ad", fontSize: "14px" }}
          className="d-flex gap-1 align-items-center"
        >
          <FaLock />{" "}
          <span style={{ marginTop: "2px" }}>Forgot Your Password?</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
