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

import "./Page.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../utils/axiosUtil";
import { setCurrentPage, setLoading } from "../../features/generalSlice";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "../../utils/helper";

export default function AddPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const { loading } = useSelector((state) => state.general);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [type, setType] = useState("Company");

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage: "Add Page" }));
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title || !description || !type) {
      toast.warning("Please Enter All Fieleds");
      return;
    }
    try {
      dispatch(setLoading());
      const { data } = await axios.post(
        "/api/page/create-page",
        {
          title,
          description,
          status,
          type,
        },
        { headers: { authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        dispatch(setLoading());
        toast.success("Page created Successfully.    Redirecting...");
        setTimeout(() => {
          navigate("/admin/pages");
        }, 1200);
      }
    } catch (error) {
     
      dispatch(setLoading());
      toast.error(error.response.data.message || error.message);
    }
  };

  const handleChange = (value) => {
    setDescription(value);
    
  };

  return (
    <div>
      <Card className="user-table ">
        <Container className="input-fieleds p-4">
          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Page Title</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                type="text"
              />
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Description</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <ReactQuill
                value={description}
                onChange={handleChange}
                modules={modules}
                formats={formats}
                style={{ border: "1px solid black" }}
              />
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col className="mb-2" sm={12} md={3}>
              <label>Type</label>
            </Col>
            <Col sm={12} md={8}>
              <select
                value={type}
                className="rounded"
                defaultValue="Company"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option value="Company">Company</option>
                <option value="Help">Help</option>
                <option value="T & C">T & C</option>
                <option value="Social">Social</option>
              </select>
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col className="mb-2" sm={12} md={3}>
              <label>Status</label>
            </Col>
            <Col sm={12} md={8}>
              <select
                value={status}
                className="rounded"
                defaultValue="Active"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
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
