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

import "./Video.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosUtil";
import axios from "axios";
import { setLoading } from "../../features/generalSlice";
import { useNavigate } from "react-router-dom";

function Video() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const { loading } = useSelector((state) => state.general);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("Hindi");
  const [category, setCategory] = useState("Big Expose");
  const [thumbnail, setThumbnail] = useState("");
  const [video, setVideo] = useState("");
  const [keywords, setKeywords] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!video) {
      toast.warning("Video is required");
      return;
    }

    try {
      dispatch(setLoading());
      const { data } = await axiosInstance.post(
        `/api/admin/get-url`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
      
        const data2 = await axios.put(data.data.uploadURL, video, {
          "Content-Type": "multipart/form-data",
        });

        if (data2.status==200) {
          
          const data3 = await axiosInstance.post(
            "/api/admin/create-video",
            {
              title,
              description,
              keywords,
              category,
              language,
              thumbnail_url: thumbnail,
              video_url: data.data.imageName,
            },
            {
              headers: { authorization: `Bearer ${token}` },
            }
          );
          if(data3.data.success){
            toast.success("Video Uploaded Successfully");
            dispatch(setLoading());
          }
        }
      }
      else{
        console.log("some error")
      }
    } catch (error) {
      console.log(error)
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
              <Form.Label>Video Title</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                required
              />
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Video Description</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                required
              />
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col className="mb-2" sm={12} md={3}>
              <label>Video Language</label>
            </Col>
            <Col sm={12} md={8}>
              <select
                value={language}
                className="rounded"
                defaultValue="Hindi"
                onChange={(e) => {
                  setLanguage(e.target.value);
                }}
              >
                <option value="Hindi">Hindi</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="English">English</option>
              </select>
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col className="mb-2" sm={12} md={3}>
              <label>Video Category</label>
            </Col>
            <Col sm={12} md={8}>
              <select
                value={category}
                className="rounded"
                defaultValue="Hindi"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option value="Big Expose">Big Expose</option>
                <option value="Podcast">Podcast</option>
                <option value="Sanatan Dharma">Sanatan Dharma</option>
                <option value="Truth">Truth</option>
              </select>
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Thumbnail Url</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                type="text"
                required
              />
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Video</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                // value={video}
                onChange={(e) => setVideo(e.target.files[0])}
                type="file"
                required
                accept="video/*"
              />
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Keywords</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
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

export default Video;
