import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import "./Video.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosUtil";
import axios from "axios";
import { setCurrentPage, setLoading } from "../../features/generalSlice";
import { MdClose } from "react-icons/md";
import {
  getAllGenres,
  getAllLanguages,
  getCategories,
  getVideo,
} from "../../features/apiCall";
import { useNavigate, useParams } from "react-router-dom";

function EditVideo() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { genres: gen } = useSelector((state) => state.genre);
  const { categories: cat } = useSelector((state) => state.category);
  const { languages } = useSelector((state) => state.language);
  const { loading } = useSelector((state) => state.general);
  const { video: video1 } = useSelector((state) => state.video);

  useEffect(()=>{
    dispatch(setCurrentPage({ currentPage: "Edit Video" }));
  },[])

  useEffect(() => {
    getVideo(dispatch, token, id);
  }, [dispatch, token, id]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [access, setAccess] = useState("");
  const [genres, setGenres] = useState([]);
  const [genres_id, setGenres_id] = useState([]);
  const [genre, setGenre] = useState("");
  const [categories, setCategories] = useState([]);
  const [categories_id, setCategories_id] = useState([]);
  const [category, setCategory] = useState("");
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
  // const [fileSize, setFileSize] = useState(0);

  useEffect(() => {
    if (token) {
      getAllGenres(dispatch, token);
      getAllLanguages(dispatch, token);
      getCategories(dispatch, token);
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (video1.description) {
      setDescription(video1.description);
      setTitle(video1.title);
      setLanguage(video1.language?._id);
      setKeywords(video1.keywords);
      if (video1.genres.length > 0) {
        const gen_name = video1.genres.map((gen) => gen.name);
        const gen_id = video1.genres.map((gen) => gen._id);
        setGenres(gen_name);
        setGenres_id(gen_id);
      }
      if (video1.category.length > 0) {
        const cat_name = video1.category.map((cat) => cat.name);
        const cat_id = video1.category.map((cat) => cat._id);
        setCategories(cat_name);
        setCategories_id(cat_id);
      }
      setAccess(video1.access);
      setThumbnailPreview(video1.thumbnail_url);
      setVideoPreview(video1.video_url);
    }
  }, [video1]);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    // setFileSize(file.size);

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
    setCategory("");
    setThumbnail("");
    setVideo("");
    setKeywords("");
    setVideoPreview("");
    setThumbnailPreview("");
    setCurrentKeyword("");
    setGenres([]);
    setGenres_id([]);
    setCategories([]);
    setCategories_id([]);
    setProgress(0);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !video &&
      !thumbnail &&
      !title &&
      !access &&
      !description &&
      !genres.length &&
      !language &&
      !keywords.length &&
      !categories.length
    ) {
      toast.warning("Please fill Atleast one fieled");
      return;
    }

    try {
      dispatch(setLoading());
      const { data } = !video
        ? { data: { success: true } }
        : await axiosInstance.post(
            `/api/admin/get-url`,
            {},
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );

      if (data.success) {
        const data2 = !video
          ? { status: 200 }
          : await axios.put(data.data.uploadURL, video, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              onUploadProgress: (progressEvent) => {
                const { loaded, total, estimated } = progressEvent;
                let percent = Math.floor((loaded * 100) / total);

                const hours = Math.floor(estimated / 3600);
                const minutes = Math.floor((estimated % 3600) / 60);
                const seconds = Math.floor(estimated % 60);

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
          formData.append("genres", genres_id);
          formData.append("language", language);
          thumbnail && formData.append("image", thumbnail);
          video && formData.append("video_url", data.data.imageName);
          formData.append("access", access);
          formData.append("categories", categories_id);

          const data3 = await axiosInstance.patch(
            `/api/video/update-video/${id}`,
            formData,
            {
              headers: { authorization: `Bearer ${token}` },
            }
          );
          if (data3.data.success) {
            toast.success("Video Updated Successfully.    ...Redirecting");
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

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    const selectedCategory_id = cat.find(
      (category) => category.name === selectedCategory
    );

    if (!categories.includes(selectedCategory)) {
      setCategories([...categories, selectedCategory]);
      setCategory("");
    }
    if (!categories_id.includes(selectedCategory_id._id)) {
      setCategories_id([...categories_id, selectedCategory_id._id]);
    }
  };

  const handleRemoveCategory = (selectedCategory) => {
    const newCategories = categories.filter((c) => c !== selectedCategory);
    const selectedCategory_id = cat.find(
      (category) => category.name === selectedCategory
    );

    setCategories_id(
      categories_id.filter((c) => c !== selectedCategory_id._id)
    );
    setCategories(newCategories);
  };

  const handleGenreChange = (e) => {
    const selectedGenre = e.target.value;
    const selectedGenre_id = gen.find((genre) => genre.name === selectedGenre);

    if (!genres.includes(selectedGenre)) {
      setGenres([...genres, selectedGenre]);
      setGenre("");
    }
    if (!genres_id.includes(selectedGenre_id._id)) {
      setGenres_id([...genres_id, selectedGenre_id._id]);
    }
  };

  const handleRemoveGenre = (selectedGenre) => {
    const newGenres = genres.filter((c) => c !== selectedGenre);
    const selectedGenre_id = gen.find((genre) => genre.name === selectedGenre);

    setGenres_id(genres_id.filter((c) => c !== selectedGenre_id._id));
    setGenres(newGenres);
  };

  const availableGenres = gen.filter(
    (genre) => genres && !genres.includes(genre.name)
  );
  const availableCategories = cat.filter(
    (category) => categories && !categories.includes(category.name)
  );

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
                  <option key={language._id} value={language._id}>
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
              categories && categories.length > 0 ? "mb-5" : "mb-4"
            }`}
          >
            <Col className="mb-2" sm={12} md={3}>
              <label>Video Categories</label>
            </Col>
            <Col style={{ position: "relative" }} sm={12} md={8}>
              <select
                value={category}
                className="rounded"
                onChange={handleCategoryChange}
              >
                <option value="">Select Category</option>
                {availableCategories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="video_keywords">
                {categories &&
                  categories.map((c, i) => (
                    <li key={i}>
                      <span>{c}</span>
                      <MdClose onClick={() => handleRemoveCategory(c)} />
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
          {progress > 0 && video && (
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
                    "Update Video"
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

export default EditVideo;
