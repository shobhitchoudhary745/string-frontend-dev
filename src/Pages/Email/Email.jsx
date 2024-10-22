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
  const [fontFamily, setFontFamily] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");
  const [link3, setLink3] = useState("");
  const [link4, setLink4] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !title ||
      !description ||
      !fontFamily ||
      !link1 ||
      !link2 ||
      !link3 ||
      !link4 ||
      !image1 ||
      !image2 ||
      !image3 ||
      !image4
    ) {
      toast.warning("Please Add All Fieleds.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("subject", title);
      formData.append("text", description);
      formData.append("fontFamily", fontFamily);
      formData.append("link1", link1);
      formData.append("link2", link2);
      formData.append("link3", link3);
      formData.append("link4", link4);
      formData.append("image", image1);
      formData.append("image", image2);
      formData.append("image", image3);
      formData.append("image", image4);
      dispatch(setLoading());
      const { data } = await axios.post(
        "/api/admin/send-bulk-email",
        formData,
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
              <Form.Label>Text</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                style={{ minHeight: "100px" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                as="textarea"
              />
            </Col>
          </Row>
          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Font Family</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                type="text"
              />
            </Col>
          </Row>
          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Image 1</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                onChange={(e) => setImage1(e.target.files[0])}
                type="file"
                accept="image/*"
              />
            </Col>
          </Row>
          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Link 1</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                value={link1}
                onChange={(e) => setLink1(e.target.value)}
                type="text"
              />
            </Col>
          </Row>
          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Image 2</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                onChange={(e) => setImage2(e.target.files[0])}
                type="file"
                accept="image/*"
              />
            </Col>
          </Row>
          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Link 2</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                value={link2}
                onChange={(e) => setLink2(e.target.value)}
                type="text"
              />
            </Col>
          </Row>
          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Image 3</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                onChange={(e) => setImage3(e.target.files[0])}
                type="file"
                accept="image/*"
              />
            </Col>
          </Row>
          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Link 3</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                value={link3}
                onChange={(e) => setLink3(e.target.value)}
                type="text"
              />
            </Col>
          </Row>
          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Image 4</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                onChange={(e) => setImage4(e.target.files[0])}
                type="file"
                accept="image/*"
              />
            </Col>
          </Row>
          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Link 4</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                value={link4}
                onChange={(e) => setLink4(e.target.value)}
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
