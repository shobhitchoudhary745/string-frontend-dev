/* eslint-disable react-hooks/exhaustive-deps */
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
} from "../../features/apiCall";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import { modules, formats } from "../../utils/helper";

function AddFreeVideo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { languages } = useSelector((state) => state.language);
  const { loading } = useSelector((state) => state.general);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [nickName, setNickName] = useState("");
  const [language, setLanguage] = useState("");
  const [access, setAccess] = useState("");
  const [genres, setGenres] = useState([]);
  const [genres_id, setGenres_id] = useState([]);
  const [genre, setGenre] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [categories_id, setCategories_id] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  const [video, setVideo] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [progress, setProgress] = useState(0);
  const [progres, setProgres] = useState(languages.map((lan) => 0));
  const [estimatedSecond, setEstimatedSecond] = useState(0);
  const [estimatedMinute, setEstimatedMinute] = useState(0);
  const [estimateHour, setEstimatedHour] = useState(0);
  const [video_type, setVideoType] = useState("shorts");
  const [long_video, setLongVideo] = useState("");
  const [file, setFile] = useState("");
  const [parts, setParts] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (token) {
      getAllGenres(dispatch, token);
      getCategories(dispatch, token);
      getAllLanguages(dispatch, token);
    }
  }, [token, dispatch]);

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage: "Add Free Video" }));
  }, []);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
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

  const handler = (e) => {
    const input = e.target.value;
    const alphanumericPattern = /^[a-zA-Z0-9]+$/;
    if (alphanumericPattern.test(input || e.target.value == "")) {
      setLongVideo(e.target.value);
    }
  };

  const handleFileChange = (e, index) => {
    setFile(e.target.files[0]);
    let temp = [...files];
    temp[index] = e.target.files[0];
    setFiles(temp);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideo(file);
      setVideoPreview(reader.result);
    };
  };

  const startUpload = (video) => {
    return new Promise(async (resolve, reject) => {
      try {
        let temp = [];

        for (let file of files) {
          if (file) {
            temp.push(
              axiosInstance.post("/api/video/start-upload", {
                video_type: video_type ? video_type : "shorts",
                access: "Free",
              })
            );
          }
        }

        const response = await Promise.all(temp);

        const data = [];
        let j = 0;

        for (let i = 0; i < files.length; ++i) {
          if (files[i]) {
            data.push({
              fileName: response[j]?.data?.fileName,
              uploadId: response[j]?.data?.UploadId,
            });
            j += 1;
          } else data.push({});
        }

        resolve(data);

        // setFileName(response.data.fileName);
      } catch (error) {
        reject(error);
      }
    });
  };

  const uploadChunk = async (chunk, partNumber, fileName, uploadId) => {
    const formData = new FormData();
    formData.append("file", chunk);
    formData.append("uploadId", uploadId);
    formData.append("partNumber", partNumber);
    formData.append("fileName", fileName);
    formData.append("video_type", video_type);
    formData.append("access", "free");

    const response = await axiosInstance.post("/api/video/upload", formData);

    return response.data;
  };

  const uploadFileInChunks = async (e) => {
    try {
      e.preventDefault();
      if (genres && !genres.includes("Carousel") && !keywords.length) {
        toast.warning("Please add atleast one keyword for better SEO.");
        return;
      }
      if (video_type === "shorts" && long_video.length < 24) {
        toast.warning("Enter Valid Long Video URL");
        return;
      }
      if (nickName.length < 6) {
        toast.warning("NickName must be of 6 Characters");
        return;
      }
      if (
        !files.length ||
        !thumbnail ||
        !title ||
        // !access ||
        !description ||
        !(language || files.length)
      ) {
        toast.warning("All fields are required");
        return;
      }
      await axiosInstance.post(
        "/api/free-video/check-uniqueness",
        {
          nick_name: nickName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const video_extension = video_type == "shorts" ? "" : "";
      dispatch(setLoading());
      const data = await startUpload(video_extension);
      for (let counter = 0; counter < files.length; ++counter) {
        if (!files[counter]) continue;
        const chunkSize = 100 * 1024 * 1024;
        const totalChunks = Math.ceil(files[counter].size / chunkSize);
        let currentUploaded = 0;

        const uploadParts = [];

        for (let i = 0; i < totalChunks; i++) {
          const start = i * chunkSize;
          const end = Math.min(start + chunkSize, files[counter].size);
          const chunk = files[counter].slice(start, end);

          const partNumber = i + 1;
          const uploadData = await uploadChunk(
            chunk,
            partNumber,
            data[counter].fileName,
            data[counter].uploadId
          );

          uploadParts.push({
            ETag: uploadData.ETag,
            PartNumber: partNumber,
          });

          currentUploaded += chunkSize;
          if (files[counter].size <= currentUploaded) {
            setProgres((p) => {
              let arr = [...p];
              p[counter] = 100;
              return arr;
            });
          } else {
            setProgres((p) => {
              let arr = [...p];
              p[counter] = parseFloat(
                (currentUploaded / files[counter].size) * 100
              ).toFixed(2);
              return arr;
            });
          }
        }

        setParts(uploadParts);
        // completeUpload(uploadParts, data);
        const { data3 } = await axiosInstance.post(
          "/api/video/complete-upload",
          {
            uploadId: data[counter].uploadId,
            fileName: data[counter].fileName,
            parts: uploadParts,
            video_type: video_type ? video_type : "shorts",
          }
        );
      }
      const formData = new FormData();

      if (genres && genres.includes("Carousel")) {
        setCategory("");
        setCategories([]);
        setCategories_id([]);
        setKeywords([]);
        setCurrentKeyword("");
      }

      let lan = [],
        urls = [];
      if (video_type != "shorts") {
        for (let count = 0; count < files.length; ++count) {
          if (files[count]) {
            lan.push(languages[count]._id);
            urls.push({
              language: languages[count]._id,
              value: data[count].fileName.split("/")[1],
            });
          }
        }
      } else {
        lan.push(language);
        urls.push({
          language,
          value: data[0].fileName.split("/")[1],
        });
      }

      formData.append("title", title);
      formData.append("description", description);
      formData.append("keywords", keywords);
      formData.append("genres", genres_id);
      formData.append("language", JSON.stringify(lan));
      formData.append("image", thumbnail);
      formData.append("video_url", JSON.stringify(urls));
      formData.append("access", access);
      formData.append("categories", categories_id);
      formData.append("video_type", video_type);
      formData.append("status", status);
      formData.append("nick_name", nickName);
      long_video &&
        video_type === "shorts" &&
        formData.append("long_video_url", "/video/" + long_video);

      const data4 = await axiosInstance.post(
        "/api/free-video/create-video",
        formData,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (data4.data.success) {
        toast.success("Video Uploaded Successfully.    ...Redirecting");
        dispatch(setLoading());
        resetForm();
        setTimeout(() => {
          navigate("/admin/free-videos");
        }, 1200);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message||"Something went wrong");
    }
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

  const handleChange = (value) => {
    setDescription(value);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLanguage("");
    setAccess("");
    setGenre("");
    setCategory("");
    setCategories([]);
    setCategories_id([]);
    setThumbnail("");
    setVideo("");
    setKeywords("");
    setVideoPreview("");
    setThumbnailPreview("");
    setCurrentKeyword("");
    setGenres([]);
    setGenres_id([]);
    setProgress(0);
  };

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
              <ReactQuill
                value={description}
                onChange={handleChange}
                modules={modules}
                formats={formats}
                style={{ border: "1px solid black", color: "black" }}
              />
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Status</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <select onChange={(e) => setStatus(e.target.value)}>
                <option value="Active">Active</option>
                <option value="InActive">InActive</option>
              </select>
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Nick Name</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                value={nickName}
                onChange={(e) =>
                  setNickName(e.target.value.trim().replaceAll(" ", ""))
                }
                type="text"
                placeholder="Enter Nick Name"
              />
            </Col>
          </Row>

          <Row className={`align-items-center mb-4`}>
            <Col className="mb-2" sm={12} md={3}>
              <label>Video Type</label>
            </Col>
            <Col style={{ position: "relative" }} sm={12} md={8}>
              <select
                value={video_type}
                className="rounded"
                onChange={(e) => {
                  setVideoType(e.target.value);
                  setFiles([]);
                }}
              >
                <option value="shorts">Shorts</option>
                <option value="full_length">Full Length</option>
              </select>
            </Col>
          </Row>

          {video_type === "shorts" && (
            <Row className={`align-items-center mb-4`}>
              <Col sm={12} md={3}>
                <Form.Label>Video URL</Form.Label>
              </Col>
              <Col sm={12} md={8}>
                <Form.Control
                  value={long_video}
                  onChange={(e) => handler(e)}
                  placeholder="Enter URL"
                  maxLength={24}
                />
              </Col>
            </Row>
          )}

          <Row className={`align-items-center `}>
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

          <Row className={`align-items-center mb-4`}>
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

          {video_type === "shorts" ? (
            <>
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

              <Row
                className={`align-items-center ${
                  videoPreview ? "mb-4" : "mb-4"
                }`}
              >
                <Col sm={12} md={3}>
                  <Form.Label>Video</Form.Label>
                </Col>
                <Col sm={12} md={8}>
                  <Form.Control
                    className="choose-video"
                    onChange={(e) => {
                      handleVideoChange(e);
                      setFile(e.target.files[0]);
                      setFiles((p) => {
                        let temp = [];
                        temp.push(e.target.files[0]);
                        return temp;
                      });
                    }}
                    type="file"
                    accept="video/*"
                  />
                </Col>
              </Row>
            </>
          ) : (
            <>
              {languages.map((data, index) => {
                return (
                  <div key={index}>
                    <Row className="align-items-center mb-4">
                      <Col className="mb-2" sm={12} md={3}>
                        <label>Video Language ({languages[index]?.name})</label>
                      </Col>
                      <Col sm={12} md={8}>
                        <select
                          // value={language}
                          className="rounded"
                          onChange={(e) => setLanguage(e.target.value)}
                          value={languages[index]._id}
                          disabled
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
                    <Row
                      className={`align-items-center ${
                        videoPreview ? "mb-4" : "mb-4"
                      }`}
                    >
                      <Col sm={12} md={3}>
                        <Form.Label>Video</Form.Label>
                      </Col>
                      <Col sm={12} md={8}>
                        <Form.Control
                          className="choose-video"
                          onChange={(e) => {
                            handleFileChange(e, index);
                          }}
                          type="file"
                          accept="video/*"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col sm={12} md={3}></Col>
                      <Col sm={12} md={9}>
                        {progres[index] != 0 && (
                          <progress
                            style={{ width: "88%" }}
                            max="100"
                            value={progres[index]}
                          />
                        )}
                      </Col>
                    </Row>
                  </div>
                );
              })}
            </>
          )}

          {genres && genres.includes("Carousel") ? (
            ""
          ) : (
            <Row
              className={`align-items-center ${
                keywords && keywords.length > 0 ? "mb-3" : "mb-3"
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
              </Col>
            </Row>
          )}
          <Row
            className={`align-items-center ${
              keywords.length ? "mb-3" : "mb-0"
            }`}
          >
            <Col sm={12} md={3}>
              <Form.Label></Form.Label>
            </Col>

            <Col sm={12} md={8}>
              <div className="d-flex flex-wrap gap-0">
                {keywords &&
                  keywords.map((k, index) => (
                    <p
                      key={k}
                      style={{ backgroundColor: "#313133" }}
                      className="mx-2 rounded p-1"
                    >
                      <span className="p-2">{k}</span>
                      <MdClose
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRemoveKeyword(index)}
                      />
                    </p>
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
                <Button
                  disabled={loading}
                  onClick={uploadFileInChunks}
                  className="pt-2 pb-2"
                >
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

export default AddFreeVideo;
