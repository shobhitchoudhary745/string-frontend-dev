import React, { useEffect, useState } from "react";
import "./Whatsapp.scss";
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

const Whatsapp = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.general);
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!message) {
      toast.warning("Please Add All Fieleds.");
      return;
    }
    try {
      dispatch(setLoading());
      const { data } = await axios.post(
        "/api/admin/send-whatsapp-message",
        { message },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        dispatch(setLoading());
        toast.success("Message Send Successfully");
      }
    } catch (error) {
      dispatch(setLoading());
      
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage: "Whatsapp" }));
  }, []);
  return (
    <div>
      <Card className="user-table ">
        <Container className="input-fieleds p-4">
          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Message Body</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                style={{ minHeight: "200px" }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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

export default Whatsapp;
