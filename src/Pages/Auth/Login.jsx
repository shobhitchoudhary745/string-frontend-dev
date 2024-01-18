import React, { useState } from "react";
import "./Login.scss";
import { FaLock } from "react-icons/fa6";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../features/authSlice";
import { Form, Button, Spinner } from "react-bootstrap";
import axiosInstance from "../../utils/axiosUtil";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/api/admin/admin-login", {
        email,
        password,
      });

      if (data.success) {
        setLoading(false);
        toast.success(data.message)
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        dispatch(setToken({ token: data.accessToken }));
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
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

          <Button type="submit" className="submit-button">
            {loading ? (
              <Spinner as="span" animation="border" size="sm" />
            ) : (
              "LOGIN OR SIGN UP TO CONTINUE"
            )}
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
