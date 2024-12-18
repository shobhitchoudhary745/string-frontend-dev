/* eslint-disable react-hooks/exhaustive-deps */
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
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../utils/axiosUtil";
import { setCurrentPage, setLoading } from "../../features/generalSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function AddInnerCarousel() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.general);

  const [video_id, SetVideo_id] = useState("");
  const [type, setType] = useState("Inner");
  const [thumbnail, setThumbnail] = useState("");
  const [mobilethumbnail, setMobileThumbnail] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [mobilethumbnailPreview, setMobileThumbnailPreview] = useState("");

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage: "Add Carousel" }));
    SetVideo_id(id);
  }, []);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setThumbnail(file);
      setThumbnailPreview(reader.result);
    };
  };

  const handleMobileThumbnailChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setMobileThumbnail(file);
      setMobileThumbnailPreview(reader.result);
    };
  };
  const resetForm = () => {
    setThumbnail("");
    setThumbnailPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      video_id!="without-video"&&formData.append("video_id", video_id);
      formData.append("tag", type);
      formData.append("image", thumbnail);
      formData.append("image", mobilethumbnail);

      dispatch(setLoading());
      const { data } = await axios.post(
        "/api/carousel/add-carousel",
        formData,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success("Carousel Uploaded Successfully.    ...Redirecting");
        dispatch(setLoading());
        resetForm();
        setTimeout(() => {
          navigate("/admin/carousels");
        }, 1200);
      }
    } catch (error) {
      dispatch(setLoading());
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Card className="user-table ">
        <Container className="input-fieleds p-4">
          {video_id!="without-video"?<Row className="align-items-center mb-4">
            <Col className="mb-2" sm={12} md={3}>
              <label>Video Id</label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                style={{ color: "#6c757d" }}
                value={video_id}
                readOnly
              />
            </Col>
          </Row>:<></>}

          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Carousel Type</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              {/* <Form.Control
                style={{ color: "#6c757d" }}
                value={type}
                readOnly
              /> */}
              <select
                className="rounded"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Inner">Inner</option>
                <option value="Outer">Outer</option>
              </select>
            </Col>
          </Row>

          <Row
            className={`align-items-center ${
              thumbnailPreview ? "mb-0" : "mb-1"
            }`}
          >
            <Col sm={12} md={3}>
              <Form.Label>Poster</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                onChange={handleThumbnailChange}
                type="file"
                accept="image/*"
                placeholder="Select Poster To Upload"
              />
            </Col>
          </Row>
          <Row
            className={`align-items-center ${
              thumbnailPreview ? "mb-0" : "mb-4"
            }`}
          >
            <Col sm={12} md={3}>
              <Form.Label></Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <label style={{ color: "#6c757d" }}>
                (Recommend 16 x 9 Resolution Image.)
              </label>
            </Col>
          </Row>
          {thumbnailPreview && (
            <Row className="align-items-center mb-2">
              <Col sm={12} md={3}>
                <Form.Label></Form.Label>
              </Col>
              <Col sm={12} md={8} className="edit-video">
                {thumbnailPreview && (
                  <img
                    style={{
                      height: "250px",
                      width: "300px",
                      borderRadius: "7px",
                      objectFit: "fill",
                    }}
                    src={thumbnailPreview}
                    alt="thumbnail"
                  />
                )}
              </Col>
            </Row>
          )}

          <Row
            className={`align-items-center ${
              mobilethumbnailPreview ? "mb-0" : "mb-1"
            }`}
          >
            <Col sm={12} md={3}>
              <Form.Label>Mobile Poster</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                onChange={handleMobileThumbnailChange}
                type="file"
                accept="image/*"
                placeholder="Select Poster To Upload"
              />
            </Col>
          </Row>
          <Row
            className={`align-items-center ${
              mobilethumbnailPreview ? "mb-0" : "mb-4"
            }`}
          >
            <Col sm={12} md={3}>
              <Form.Label></Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <label style={{ color: "#6c757d" }}>
                (Recommend 375 x 400 Resolution Image.)
              </label>
            </Col>
          </Row>
          {mobilethumbnailPreview && (
            <Row className="align-items-center mb-2">
              <Col sm={12} md={3}>
                <Form.Label></Form.Label>
              </Col>
              <Col sm={12} md={8} className="edit-video">
                {mobilethumbnailPreview && (
                  <img
                    style={{
                      height: "250px",
                      width: "300px",
                      borderRadius: "7px",
                      objectFit: "fill",
                    }}
                    src={mobilethumbnailPreview}
                    alt="thumbnail"
                  />
                )}
              </Col>
            </Row>
          )}

          <Row className="align-items-center mb-4">
            <Col className="d-none d-md-block" md={3}>
              <Form.Label></Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Button onClick={handleSubmit}>
                {loading ? <Spinner /> : "Add Carousel"}
              </Button>
            </Col>
          </Row>
        </Container>
      </Card>
    </div>
  );
}
