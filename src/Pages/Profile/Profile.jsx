import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import "./Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../utils/axiosUtil";
import { setLoading } from "../../features/generalSlice";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../features/authSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, email, profile, mobile, name, id } = useSelector(
    (state) => state.auth
  );

  const { loading } = useSelector((state) => state.general);
  const [mobileNo, setMobileNo] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (name) {
      setMobileNo(mobile);
      setUserEmail(email);
      setUserName(name);
      setUserProfile(profile);
    }
  }, [token]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!image && !userEmail && !mobileNo && !userName && !password) {
      toast.warning("Please Fill Atleast One fieled");
      return;
    }
    const formData = new FormData();
    formData.append("email", userEmail);
    image && formData.append("image", image);
    formData.append("name", userName);
    formData.append("mobile", mobileNo);
    formData.append("password", password);
    try {
      dispatch(setLoading());
      const { data } = await axios.patch(
        `/api/admin/update-user/${id}`,
        formData,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        dispatch(setLoading());
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("mobile", data.user.mobile);
        localStorage.setItem("profile", data.user.avatar);
        localStorage.setItem("name", data.user.name);
        dispatch(
          setToken({
            token,
            email: data.user.email,
            mobile: data.user.mobile,
            profile: data.user.avatar,
            name: data.user.name,
          })
        );
        toast.success("Profile Updated Successfully!    ...Redirecting");
        setTimeout(() => {
          navigate("/");
        }, 1200);
      }
    } catch (error) {
      dispatch(setLoading());
     
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Card className="user-table ">
        <Container className="input-fieleds p-4">
          <Row className="align-items-center mb-4">
            <Col sm={12}>
              {/* <img
                style={{
                  cursor: "pointer",
                  width: "150px",
                  height: "150px",
                  borderRadius: "0.25rem",
                }}
                src={userProfile}
              /> */}

              <LazyLoadImage
                style={{
                  cursor: "pointer",
                  width: "150px",
                  height: "150px",
                  borderRadius: "0.25rem",
                }}
                alt={"Profile"}
                src={`${process.env.REACT_APP_URL}/${userProfile}`}
                effect="blur"
              />
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col className="mb-2" sm={12} md={3}>
              <Form.Label>Profile Image</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                accept="image/*"
              />
            </Col>
          </Row>
          <Row className="align-items-center mb-4">
            <Col className="mb-2" sm={12} md={3}>
              <Form.Label>Name</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
              />
            </Col>
          </Row>
          <Row className="align-items-center mb-4">
            <Col className="mb-2" sm={12} md={3}>
              <Form.Label>Email Address</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                type="text"
              />
            </Col>
          </Row>
          <Row className="align-items-center mb-4">
            <Col className="mb-2" sm={12} md={3}>
              <Form.Label>Mobile Number</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                type="text"
              />
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col className="mb-2" sm={12} md={3}>
              <Form.Label>Password</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
              />
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col className="d-none d-md-block" md={3}>
              <Form.Label></Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Button onClick={submitHandler}>
                {loading ? <Spinner /> : "Save"}
              </Button>
            </Col>
          </Row>
        </Container>
      </Card>
    </div>
  );
}
