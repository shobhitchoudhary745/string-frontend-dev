import React, { useState } from "react";
import "./Login.scss";
import { FaLock } from "react-icons/fa6";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../features/authSlice";
import { Form, Button } from "react-bootstrap";
import axiosInstance from "../../utils/axiosUtil";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/api/admin/admin-login", {
        email,
        password,
      });
    
      if (data.success) {
        localStorage.setItem("token",data.accessToken);
        localStorage.setItem("refreshToken",data.refreshToken);
        dispatch(
          setToken({ token: data.accessToken })
        );
      navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return token ? (
    <Navigate to="/" />
  ) : (
    <div className="wrapper-page">
      <div className="text-center">
        <Link to="https://stringgeo.com">
          <img
            style={{ width: "150px", height: "42px" }}
            src="https://stringgeo.com/upload/NewFolder/String%20Geo%20logo%20Icon.png"
            alt="main-logo"
          />
        </Link>
      </div>
      <div className="card-box">
        <div className="text-center">
          <h3>SIGN IN</h3>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-text"
              type="email"
              placeholder="Email Address"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-text"
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>

          <Button
            type="submit"
            className="submit-button"
          >
            LOGIN OR SIGN UP TO CONTINUE
          </Button>
          <Link to="/forgot-password" className="forgot-password">
            <FaLock style={{ fontSize: "11px" }} />
            <span>Forgot your password?</span>
          </Link>
        </Form>
      
      </div>
      
    </div>
  );
};

export default Login;
