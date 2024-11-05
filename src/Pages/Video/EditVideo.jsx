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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "../../utils/helper";

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

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage: "Edit Video" }));
  }, []);

  useEffect(() => {
    getVideo(dispatch, token, id);
  }, [dispatch, token, id]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [nickName, setNickName] = useState("");
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
  const [file, setFile] = useState("");
  const [files, setFiles] = useState([]);
  const [parts, setParts] = useState([]);
  const [progres, setProgres] = useState(languages.map((lan) => 0));
  const [currentLanguage, setCurrentLanguage] = useState([]);
  const [currentUrl, setCurrentUrl] = useState([]);

  useEffect(() => {
    setProgres(languages.map((lan) => 0));
  }, [languages]);

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
      setNickName(video1?.nick_name||"");
      // setLanguage(video1.language?._id);
      setCurrentLanguage(video1?.language?.map((lan) => lan._id));
      setCurrentUrl(
        video1?.video_url?.map((url) => {
          return {
            language: url?.language?._id,
            value: url?.value,
          };
        })
      );
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
      setStatus(video1?.status);
      setAccess(video1.access);
      setThumbnailPreview(
        `${process.env.REACT_APP_URL}/${video1.thumbnail_url}`
      );
      setVideoPreview(
        `${process.env.REACT_APP_URL}/admin-uploads/${video1?.video_url[0]?.value}`
      );
    }
  }, [video1]);

  const handleVideoChange = (e) => {
    setFile(e.target.files[0]);
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
    // setLanguage("");
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
      // !access &&
      !description &&
      !genres.length &&
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
          console.log("gvgvgvgvgv", status);
          formData.append("status", status);
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
      }
    } catch (error) {
      dispatch(setLoading());
      toast.error(error.message);
    }
  };

  const startUpload = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let temp = [];
        for (let file of files) {
          if (file) {
            temp.push(axiosInstance.post("/api/video/start-upload", {}));
          }
        }
        const response = await Promise.all(temp);
        // const response = await axiosInstance.post("/api/video/start-upload", {
        //   // fileName: file.name,
        //   // access: "Paid",
        // });

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

    const response = await axiosInstance.post("/api/video/upload", formData);

    return response.data;
  };

  const uploadFileInChunks = async (e) => {
    try {
      e.preventDefault();
      if (nickName && nickName.length < 6) {
        toast.warning("NickName must be of 6 Characters");
        return;
      }

      if (
        !files.length &&
        !thumbnail &&
        !title &&
        // !access &&
        !description &&
        !genres.length &&
        !keywords.length &&
        !categories.length
      ) {
        toast.warning("Please fill Atleast one fieled");
        return;
      }

      dispatch(setLoading());
      await axiosInstance.post(
        "/api/video/check-uniqueness",
        {
          nick_name: nickName,
          id,
          update: "true",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = !files.length ? true : await startUpload();
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
          }
        );
      }
      const formData = new FormData();
      let language = [],
        urls = [];
      for (let count = 0; count < files.length; ++count) {
        if (files[count]) {
          language.push(languages[count]._id);
          urls.push({
            language: languages[count]._id,
            value: data[count].fileName.split("/")[1],
          });
        }
      }
      language = Array.from(new Set([...language, ...currentLanguage]));

      const curr = urls.map((url) => url.language);
      for (let u of currentUrl) {
        if (!curr.includes(u.language)) urls.push(u);
      }

      formData.append("title", title);
      formData.append("description", description);
      formData.append("keywords", keywords);
      formData.append("genres", genres_id);
      formData.append("language", JSON.stringify(language));
      thumbnail && formData.append("image", thumbnail);
      formData.append("video_url", JSON.stringify(urls));
      formData.append("access", access);
      formData.append("categories", categories_id);
      formData.append("status", status);
      formData.append("nick_name", nickName);

      const data4 = await axiosInstance.patch(
        `/api/video/update-video/${id}`,
        formData,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (data4.data.success) {
        toast.success("Video Updated Successfully.    ...Redirecting");
        dispatch(setLoading());
        resetForm();
        setTimeout(() => {
          navigate("/admin/videos");
        }, 1200);
      }
    } catch (error) {
      dispatch(setLoading());
      toast.error(error?.response?.data?.message || "Something went wrong");
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

  const handleChange = (value) => {
    setDescription(value);
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
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
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
                maxLength={10}
                onChange={(e) =>
                  setNickName(e.target.value.trim().replaceAll(" ", ""))
                }
                type="text"
                placeholder="Enter Nick Name"
              />
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
                {availableGenres
                  // .filter((genre) => genre.name != "Carousel")
                  .map((genre) => (
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

          <Row className={`align-items-center mb-1`}>
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

          {languages.map((data, index) => {
            return (
              <>
                <Row className="align-items-center mb-4" key={index}>
                  <Col className="mb-2" sm={12} md={3}>
                    <label>Video Language ({languages[index]?.name})</label>
                  </Col>
                  <Col sm={12} md={8}>
                    <select
                      // value={language}
                      className="rounded"
                      // onChange={(e) => setLanguage(e.target.value)}
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
              </>
            );
          })}

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
              {/* <div className="video_keywords">
                {keywords &&
                  keywords.map((k, index) => (
                    <li key={index}>
                      <span>{k}</span>
                      <MdClose onClick={() => handleRemoveKeyword(index)} />
                    </li>
                  ))}
              </div> */}
            </Col>
          </Row>

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
                    "Update"
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
