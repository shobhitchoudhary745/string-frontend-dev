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

import "./Director.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../utils/axiosUtil";
import { setCurrentPage, setLoading } from "../../features/generalSlice";
import { useNavigate } from "react-router-dom";

export default function AddDirector() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const { loading } = useSelector((state) => state.general);

  const [name, setName] = useState("");
  const [profile, setProfile] = useState();

  useEffect(()=>{
    dispatch(setCurrentPage({ currentPage: "Add Director" }));
  },[])

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !profile) {
      toast.warning("All Fieleds are required");
      return;
    }
    try {
      dispatch(setLoading());
      const formData = new FormData();
      formData.append("name",name);
      profile&&formData.append("image",profile);
      const { data } = await axios.post(
        "/api/director/create-director",
        formData,
        { headers: { authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        dispatch(setLoading());
        toast.success("Director created Successfully.    Redirecting...");
        setTimeout(() => {
          navigate("/admin/directors");
        }, 1200);
      }
    } catch (error) {
      dispatch(setLoading());
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    <div>
      <Card className="user-table ">
        <Container className="input-fieleds p-4">
          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Director Name</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col className="mb-2" sm={12} md={3}>
              <label>Profile</label>
            </Col>
            <Col sm={12} md={8}>
            <Form.Control
                
                onChange={(e) => setProfile(e.target.files[0])}
                type="file"
                accept="image/*"
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
