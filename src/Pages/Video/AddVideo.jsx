import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import "./Video.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosUtil";
import axios from "axios";
import { setLoading } from "../../features/generalSlice";
import { MdClose } from "react-icons/md";
import { getAllGenres, getAllLanguages } from "../../features/apiCall";
import { useNavigate } from "react-router-dom";
import { ReactInternetSpeedMeter } from "react-internet-meter";

function AddVideo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { genres: gen } = useSelector((state) => state.genre);
  const { languages } = useSelector((state) => state.language);
  const { loading } = useSelector((state) => state.general);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [access, setAccess] = useState("");
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [video, setVideo] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [progress, setProgress] = useState(0);
  const [estimatedSecond, setEstimatedSecond] = useState(0);
  const [estimatedMinute, setEstimatedMinute] = useState(0);
  const [estimateHour, setEstimatedHour] = useState(0);
  const [fileSize, setFileSize] = useState(0);
  const [uploadSpeed,setUploadspeed] = useState(0);

  // console.log(uploadSpeed);

  useEffect(() => {
    if (token) {
      getAllGenres(dispatch, token);
      getAllLanguages(dispatch, token);
    }
  }, [token, dispatch]);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setFileSize(file.size);
    // console.log(file.size);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideo(file);
      setVideoPreview(reader.result);
    };
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setThumbnail(file);
      setThumbnailPreview(reader.result);
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
    setLanguage("");
    setAccess("");
    setGenre("");
    setThumbnail("");
    setVideo("");
    setKeywords("");
    setVideoPreview("");
    setThumbnailPreview("");
    setCurrentKeyword("");
    setGenres([]);
    setProgress(0);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !video ||
      !thumbnail ||
      !title ||
      !access ||
      !description ||
      !genres ||
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
            // const connection = navigator.connection;
            // console.log(uploadSpeed);
            const speed = (uploadSpeed * 1024 * 1024) / 8;

            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total);
            let remainingBytes = fileSize - (percent * fileSize) / 100;
            const hours = Math.floor(remainingBytes / speed / 3600);
            const minutes = Math.floor(((remainingBytes / speed) % 3600) / 60);
            const seconds = Math.floor((remainingBytes / speed) % 60);

            setEstimatedSecond(Math.round(seconds));
            setEstimatedMinute(Math.round(minutes));
            setEstimatedHour(Math.round(hours));

            setProgress(percent);
          },
        });

        if (data2.status === 200) {
          const formData = new FormData();

          formData.append("title", title);
          formData.append("description", description);
          formData.append("keywords", keywords);
          formData.append("genres", genres);
          formData.append("language", language);
          formData.append("image", thumbnail);
          formData.append("video_url", data.data.imageName);
          formData.append("access", access);

          const data3 = await axiosInstance.post(
            "/api/video/create-video",
            formData,
            {
              headers: { authorization: `Bearer ${token}` },
            }
          );
          if (data3.data.success) {
            toast.success("Video Uploaded Successfully.    ...Redirecting");
            dispatch(setLoading());
            resetForm();
            setTimeout(() => {
              navigate("/admin/videos");
            }, 1200);
          }
        }
      } else {
        console.log("some error");
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoading());
      toast.error(error.message);
    }
  };

  const handleGenreChange = (e) => {
    const selectedGenre = e.target.value;

    if (!genres.includes(selectedGenre)) {
      setGenres([...genres, selectedGenre]);
      setGenre("");
    }
  };

  const handleRemoveGenre = (selectedGenre) => {
    const newGenres = genres.filter((c) => c !== selectedGenre);
    setGenres(newGenres);
  };

  const availableGenres = gen.filter((genre) => !genres.includes(genre.name));

  return (
    <div>
      <ReactInternetSpeedMeter
        txtSubHeading=""
        outputType="alert"
        customClassName={null}
        txtMainHeading=""
        pingInterval={5000} // milliseconds
        thresholdUnit="megabyte" // "byte" , "kilobyte", "megabyte"
        threshold={1}
        imageUrl="https://www.sammobile.com/wp-content/uploads/2019/03/keyguard_default_wallpaper_silver.png"
        downloadSize="3020575" //bytes
        callbackFunctionOnNetworkDown={(speed) => {}}
        callbackFunctionOnNetworkTest={(speed) => setUploadspeed(speed)}
      />
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
                placeholder="Enter Video Title"
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
                placeholder="Enter Video Description"
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
                {languages.map((language) => (
                  <option key={language._id} value={language.name}>
                    {language.name}
                  </option>
                ))}
              </select>
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Video Access</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <select
                value={access}
                className="rounded"
                onChange={(e) => setAccess(e.target.value)}
              >
                <option value="">Select Access</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </Col>
          </Row>

          <Row
            className={`align-items-center ${
              genres && genres.length > 0 ? "mb-5" : "mb-4"
            }`}
          >
            <Col className="mb-2" sm={12} md={3}>
              <label>Video Genres</label>
            </Col>
            <Col style={{ position: "relative" }} sm={12} md={8}>
              <select
                value={genre}
                className="rounded"
                onChange={handleGenreChange}
              >
                <option value="">Select Genre</option>
                {availableGenres.map((genre) => (
                  <option key={genre._id} value={genre.name}>
                    {genre.name}
                  </option>
                ))}
              </select>
              <div className="video_keywords">
                {genres &&
                  genres.map((c, i) => (
                    <li key={i}>
                      <span>{c}</span>
                      <MdClose onClick={() => handleRemoveGenre(c)} />
                    </li>
                  ))}
              </div>
            </Col>
          </Row>

          <Row
            className={`align-items-center ${
              thumbnailPreview ? "mb-2" : "mb-4"
            }`}
          >
            <Col sm={12} md={3}>
              <Form.Label>Thumbnail</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                // value={thumbnail}
                onChange={handleThumbnailChange}
                type="file"
                accept="image/*"
                placeholder="Select Thumbnail"
              />
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
            className={`align-items-center ${videoPreview ? "mb-0" : "mb-4"}`}
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
                <Form.Label></Form.Label>
              </Col>
              <Col sm={12} md={8} className="edit-video">
                {videoPreview && (
                  <video
                    style={{ height: "300px", width: "100%" }}
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
                placeholder="Enter a Keyword"
                value={currentKeyword}
                onChange={handleKeywordChange}
              />
              <Button type="button" onClick={handleAddKeyword}>
                Add
              </Button>
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
                    {progress > 99
                      ? "Processing..."
                      : `Uploading - ${progress}%`}
                  </Button>
                  <p>
                    Estimated Time to Upload Video:{" "}
                    {estimateHour !== 0 ? `${estimateHour} hours, ` : ""}
                    {estimatedMinute !== 0
                      ? `${estimatedMinute} minutes`
                      : ""}{" "}
                    {estimatedSecond} seconds
                  </p>
                </div>
              </Col>
            </Row>
          )}

          {progress === 0 && (
            <Row className="align-items-center">
              <Col sm={12} md={3}>
                <Form.Label></Form.Label>
              </Col>

              <Col sm={12} md={8}>
                <Button onClick={submitHandler} className="pt-2 pb-2">
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Upload Video"
                  )}
                </Button>
              </Col>
            </Row>
          )}
        </Container>
      </Form>
    </div>
  );
}

export default AddVideo;
