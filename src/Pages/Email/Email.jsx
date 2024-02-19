import React, { useEffect, useState } from "react";
import "./Email.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setLoading } from "../../features/generalSlice";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "../../utils/axiosUtil";

const Email = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.general);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.warning("Please add Subject and description");
      return;
    }
    try {
      dispatch(setLoading());
      const { data } = await axios.post(
        "/api/admin/send-bulk-email",
        {
          subject: title,
          description,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        dispatch(setLoading());
        toast.success("Email Send Successfully");
      }
    } catch (error) {
      dispatch(setLoading());
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage: "Send Email" }));
  }, []);
  return (
    <div>
      <Card className="user-table ">
        <Container className="input-fieleds p-4">
          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Subject</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
              />
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Description</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                style={{ height: "220px" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                as="textarea"
              />
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col className="d-none d-md-block" md={3}>
              <Form.Label></Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Button onClick={submitHandler}>
                {loading ? <Spinner /> : "Send"}
              </Button>
            </Col>
          </Row>
        </Container>
      </Card>
    </div>
  );
};

export default Email;
