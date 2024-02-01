import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import "./Video.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosUtil";
import axios from "axios";
import { setLoading } from "../../features/generalSlice";
import { MdClose } from "react-icons/md";

function Video() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const { loading } = useSelector((state) => state.general);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("Hindi");
  const [category, setCategory] = useState("Big Expose");
  const [thumbnail, setThumbnail] = useState("");
  const [video, setVideo] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [progress, setProgress] = useState(0);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideo(file);
      setVideoPreview(reader.result);
    };
  };

  const handleKeywordChange = (e) => {
    setCurrentKeyword(e.target.value);
  };

  const handleAddKeyword = () => {
    if (currentKeyword.trim() !== "") {
      setKeywords(
        Array.from(new Set([...keywords, currentKeyword.toLowerCase()]))
      );
      setCurrentKeyword("");
    }
  };

  const handleRemoveKeyword = (index) => {
    const newKeywords = [...keywords];
    newKeywords.splice(index, 1);
    setKeywords(newKeywords);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLanguage("Hindi");
    setCategory("Big Expose");
    setThumbnail("");
    setVideo("");
    setKeywords("");
    setVideoPreview("");
    setProgress(0);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !video ||
      !thumbnail ||
      !title ||
      !description ||
      !category ||
      !language ||
      !keywords
    ) {
      toast.warning("All fields are required");
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
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total);
            setProgress(percent);
          },
        });

        if (data2.status === 200) {
          const formData = new FormData();
          formData.append("title",title);
          formData.append("description",description);
          formData.append("keywords",keywords);
          formData.append("category",category);
          formData.append("language",language);
          formData.append("image",thumbnail);
          formData.append("video_url",data.data.imageName);
          const data3 = await axiosInstance.post(
            "/api/admin/create-video",
            formData,
            {
              headers: { authorization: `Bearer ${token}` },
            }
          );
          if (data3.data.success) {
            toast.success("Video Uploaded Successfully");
            dispatch(setLoading());
            resetForm();
          }
        }
      } else {
        console.log("some error");
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoading());
      toast.error(error.response.data.message || error.message);
    }
  };

  const lang = ["Hindi", "English", "Tamil", "Telugu", "Malayalam"];
  const cat = ["Big Expose", "Small Expose", "Dramas", "Comedy"];

  return (
    <div>
      <Form className="user-table">
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
                // placeholder="Enter Video Title"
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
                as="textarea"
                // placeholder="Enter Video Description"
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
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="">Select Language</option>
                {lang.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
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
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {cat.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Thumbnail Url</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                // value={thumbnail}
                onChange={(e) => setThumbnail(e.target.files[0])}
                type="file"
                accept="image/*"
                // placeholder="Enter Thumbnail Url"
              />
            </Col>
          </Row>

          <Row
            className={`align-items-center ${videoPreview ? "mb-1" : "mb-4"}`}
          >
            <Col sm={12} md={3}>
              <Form.Label>Video</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                className="choose-video"
                onChange={handleVideoChange}
                type="file"
                accept="video/*"
              />
              
            </Col>
          </Row>
          {videoPreview && (
            <Row className="align-items-center mb-1">
              <Col sm={12} md={3}>
                <Form.Label>Preview</Form.Label>
              </Col>
              <Col sm={12} md={8} className="edit-video">
                {videoPreview && (
                  <video
                    style={{ height: "300px" }}
                    src={videoPreview}
                    controls
                  />
                )}
              </Col>
            </Row>
          )}

          <Row
            className={`align-items-center ${
              keywords && keywords.length > 0 ? "mb-5" : "mb-3"
            }`}
          >
            <Col sm={12} md={3}>
              <Form.Label>Keywords</Form.Label>
            </Col>
            <Col
              style={{ display: "flex", gap: "10px", position: "relative" }}
              sm={12}
              md={8}
            >
              <Form.Control
                type="text"
                // placeholder="Enter a Keyword"
                value={currentKeyword}
                onChange={handleKeywordChange}
              />
              <Button onClick={handleAddKeyword}>Add</Button>
              <div className="video_keywords">
                {keywords &&
                  keywords.map((k, index) => (
                    <li key={index}>
                      <span>{k}</span>
                      <MdClose onClick={() => handleRemoveKeyword(index)} />
                    </li>
                  ))}
              </div>
            </Col>
          </Row>
          {progress > 0 && (
            <Row className="align-items-center">
              <Col sm={12} md={3}>
                <Form.Label></Form.Label>
              </Col>

              <Col sm={12} md={8}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                    width: "100%",
                  }}
                >
                  <progress
                    style={{ width: "100%" }}
                    max="100"
                    value={progress}
                  />
                  <Button style={{ width: "100%" }} variant="success">
                    {progress > 99 ? "Processing..." : `Uploading ${progress}%`}
                  </Button>
                </div>
              </Col>
            </Row>
          )}

          {progress == 0 && (
            <Row className="align-items-center">
              <Col sm={12} md={3}>
                <Form.Label></Form.Label>
              </Col>

              <Col sm={12} md={8}>
                <Button onClick={submitHandler} className="submit-button">
                  {loading ? <Spinner /> : "Upload"}
                </Button>
              </Col>
            </Row>
          )}
        </Container>
      </Form>
    </div>
  );
}

export default Video;
