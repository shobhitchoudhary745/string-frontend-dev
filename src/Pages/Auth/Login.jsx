import React, { useState } from "react";
import "./Login.scss";
import { FaLock } from "react-icons/fa6";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../features/authSlice";
import { Form, Button, Spinner, InputGroup } from "react-bootstrap";
import axiosInstance from "../../utils/axiosUtil";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/api/admin/admin-login", {
        email,
        password,
      });

      if (data.success) {
        // console.log(data);
        setLoading(false);
        toast.success(data.message);
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("mobile", data.user.mobile);
        localStorage.setItem("profile", data.user.avatar);
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("id", data.user._id);
        // localStorage.setItem("refreshToken", data.refreshToken);
        dispatch(
          setToken({
            token: data.accessToken,
            email: data.user.email,
            mobile: data.user.mobile,
            profile: data.user.avatar,
            name: data.user.name,
            id: data.user._id,
          })
        );
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return token ? (
    <Navigate to="/" />
  ) : (
    <div className="wrapper-page">
      <div className="text-center">
        <Link to="https://www.stringevolve.in">
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
          <Form.Group className="mb-3 input-group grp">
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-text"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            />
            <InputGroup.Text
              className="icon"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </InputGroup.Text>
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
