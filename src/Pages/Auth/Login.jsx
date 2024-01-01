import React from "react";
import "./Login.scss";
import { FaLock } from "react-icons/fa6"; 
const Login = () => {
  return (
    <div className="login-main-container">
      <div>
        <img
          style={{ width: "150px", height: "42px" }}
          src="https://stringgeo.com/upload/NewFolder/String%20Geo%20logo%20Icon.png"
          alt="main-logo"
        />
      </div>
      <div className="login-container">
        <h3 style={{ color: "#f9f9f9", fontSize: "24px", fontWeight:"500", margin: "8px" }}>
          SIGN IN
        </h3>
        <input
          className="input-text"
          type="email"
          placeholder="Email Address"
        />
        <input className="input-text" type="password" placeholder="Password" />
        <div style={{ display: "flex", gap:"5px", width: "100%", alignItems: "center" }}>
          <input
            style={{ color: "#ffffff", width: "17px", height: "17px" }}
            type="checkbox"
          />
          <label style={{ color: "#f9f9f9", fontSize: "14px" }}>
            Remember me
          </label>
        </div>
        <button type="submit" className="submit-button">
          LOG IN OR SIGN UP TO CONTINUE
        </button>
        <a
          href="www.mysirg.com"
          style={{ textDecoration: "none", color: "#98a6ad", fontSize: "14px" }}
        >
          <FaLock /> Forgot Your Password?
        </a>
      </div>
    </div>
  );
};

export default Login;
