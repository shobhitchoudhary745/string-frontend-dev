import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";

import "./Language.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../utils/axiosUtil";
import { setCurrentPage, setLoading } from "../../features/generalSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AddLanguage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const { loading } = useSelector((state) => state.general);

  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");

  useEffect(()=>{
    dispatch(setCurrentPage({ currentPage: "Add Language" }));
  },[])

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.warning("Please Enter Language Name");
      return;
    }
    try {
      dispatch(setLoading());
      const { data } = await axios.post(
        "/api/language/create-language",
        {
          name,
          status,
        },
        { headers: { authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        dispatch(setLoading());
        toast.success("Language created Successfully.    Redirecting...");
        setTimeout(() => {
          navigate("/admin/languages");
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
              <Form.Label>Language Name</Form.Label>
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
