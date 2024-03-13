import React, { useState } from "react";
import "./Login.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import axiosInstance from "../../utils/axiosUtil";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit_1 = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/api/user/send-code", {
        email,
      });

      if (data.success) {
        toast.success(data.message);
        setStage(2);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
    }
  };

  const handleSubmit_2 = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/api/user/validate-code", {
        email,
        code,
      });

      if (data.success) {
        toast.success(data.message);
        setStage(3);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
    }
  };

  const handleSubmit_3 = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/api/user/validate-code", {
        email,
        password: newPassword,
        confirmPassword,
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
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
      {stage === 1 && (
        <div className="card-box">
          <div className="text-center">
            <h3>FORGOT PASSWORD</h3>
          </div>
          <Form onSubmit={handleSubmit_1}>
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

            <Button type="submit" className="submit-button">
              {loading ? (
                <Spinner as="span" animation="border" size="sm" />
              ) : (
                "SEND OTP"
              )}
            </Button>
            <Link to="/login" className="forgot-password">
              <span>Go back to Login</span>
            </Link>
          </Form>
        </div>
      )}
      {stage === 2 && (
        <div className="card-box">
          <div className="text-center">
            <h3>VERIFY OTP</h3>
          </div>
          <Form onSubmit={handleSubmit_2}>
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
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="input-text"
                type="number"
                placeholder="Enter OTP"
                required
              />
            </Form.Group>

            <Button type="submit" className="submit-button">
              {loading ? (
                <Spinner as="span" animation="border" size="sm" />
              ) : (
                "Verify OTP"
              )}
            </Button>
            <Link to="/login" className="forgot-password">
              <span>Go back to Login</span>
            </Link>
          </Form>
        </div>
      )}
      {stage === 3 && (
        <div className="card-box">
          <div className="text-center">
            <h3>VERIFY OTP</h3>
          </div>
          <Form onSubmit={handleSubmit_3}>
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
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input-text"
                type="text"
                placeholder="New Password"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-text"
                type="text"
                placeholder="Confirm Password"
                required
              />
            </Form.Group>

            <Button type="submit" className="submit-button">
              {loading ? (
                <Spinner as="span" animation="border" size="sm" />
              ) : (
                "Reset Password"
              )}
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
