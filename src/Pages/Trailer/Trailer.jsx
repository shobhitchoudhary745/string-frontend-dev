import React, { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Card, Form, InputGroup, Spinner, Table } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { FaEdit, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllGenres,
  getAllLanguages,
  getAllTrailers,
  getAllVideos,
} from "../../features/apiCall";
import { setCurrentPage, setLoading } from "../../features/generalSlice";
import axios from "../../utils/axiosUtil";
import { toast } from "react-toastify";
import "./Trailer.scss";
import CustomPagination from "../../utils/CustomPagination";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { MdRemoveCircleOutline } from "react-icons/md";
import axiosInstance from "../../utils/axiosUtil";

const Trailer = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.general);
  const { videos, totalVideoCount } = useSelector((state) => state.video);
  const { trailers } = useSelector((state) => state.trailer);
  console.log(trailers);
  const { languages } = useSelector((state) => state.language);
  const { genres: gen } = useSelector((state) => state.genre);
  const [load,setLoad] = useState(false);

  const [curPage, setCurPage] = useState(1);
  const [language, setLanguage] = useState("");
  const [genres, setGenres] = useState("");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState("");

  const resultPerPage = 10;
  const curPageHandler = (p) => setCurPage(p);

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage: "Trailer" }));
  }, []);

  useEffect(() => {
    if (token) {
      getAllTrailers(dispatch);
      getAllVideos(
        dispatch,
        token,
        language,
        genres,
        query,
        curPage,
        resultPerPage
      );
    }
  }, [language, genres, query, curPage, resultPerPage]);

  useEffect(() => {
    getAllLanguages(dispatch, token);
    getAllGenres(dispatch, token);
  }, []);

  const addVideo = async (id) => {
    // e.preventDefault();
    try {
      setLoad(true)
      const { data } = await axiosInstance.post(
        "/api/trailer/create-trailer",
        { video: id },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        getAllTrailers(dispatch);
        setLoad(false)
        toast.success("Video Added Successfully to Trailer Video");
      }
    } catch (error) {
      setLoad(false)
      toast.error(error.response.data.message);
    }
  };

  const removeVideo = async () => {
    // e.preventDefault();
    const id = trailers[0]._id
    try {
      setLoad(true)
      const { data } = await axiosInstance.delete(
        `/api/trailer/delete-trailer/${id}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        setLoad(false)
        getAllTrailers(dispatch);
        toast.success("Video Removed Successfully From Trailer Video");
      }
    } catch (error) {
      setLoad(false)
      toast.error(error.response.data.message);
    }
  };

  const numOfPages = Math.ceil(totalVideoCount / resultPerPage);
  return (
    <>
      <Card className="user-table">
        <Card.Header className="user-header">
          <Form.Group>
            <Form.Select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
              }}
            >
              <option value="all">Filter By Language</option>
              {languages.map((language) => {
                return (
                  <option value={language._id} key={language._id}>
                    {language.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Select
              value={genres}
              onChange={(e) => {
                setGenres(e.target.value);
              }}
            >
              <option value="all">Filter By Genres</option>
              {gen.map((genre) => {
                return (
                  <option value={genre._id} key={genre._id}>
                    {genre.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <InputGroup className="user-search">
            <Form.Control
              aria-label="Search Input"
              placeholder="Search By title or description"
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (e.target.value === "") {
                  setQuery(e.target.value);
                }
              }}
            />
            <InputGroup.Text
              style={{ cursor: "pointer" }}
              onClick={() => {
                setQuery(search);
              }}
            >
              <FaSearch />
            </InputGroup.Text>
          </InputGroup>
          {/* <div className="button">
            <Link to={"/admin/add-video"}>
              <HiPlus /> Add Video
            </Link>
          </div> */}
        </Card.Header>
        <Card.Body className="user-body">
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" style={{ color: "#caa257" }} />
            </div>
          ) : (
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Title</th>
                  <th>Poster</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {videos.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No Videos Found
                    </td>
                  </tr>
                ) : (
                  videos.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{(curPage - 1) * 10 + (index + 1)}</td>
                        <td>{data.title}</td>
                        <td>
                          {/* <img
                            className="poster"
                            src={data.thumbnail_url}
                            alt=""
                          /> */}
                          <LazyLoadImage
                            alt={"Profile"}
                            src={`${process.env.REACT_APP_URL}/${data.thumbnail_url}`}
                            effect="blur"
                            className="poster"
                          />
                        </td>
                        <td>
                          <div className="action-link">
                            {trailers.length &&
                            trailers[0].video == data._id ? (
                              <Link
                                style={{
                                  border: "none",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "5px",
                                }}
                                onClick={() => {
                                  setCurrent(index);
                                  removeVideo();
                                }}
                                className="btn btn-danger"
                              >
                                {load && current === index ? (
                                  <Spinner />
                                ) : (
                                  <>
                                    <MdRemoveCircleOutline />
                                    Remove
                                  </>
                                )}
                              </Link>
                            ) : (
                              <Link
                                style={{
                                  backgroundColor: "#10c469",
                                  border: "none",
                                }}
                                onClick={() => {
                                  setCurrent(index);
                                  addVideo(data._id);
                                }}
                                className="btn btn-success"
                              >
                                {load && current === index ? (
                                  <Spinner />
                                ) : (
                                  <>
                                    <HiPlus /> Add
                                  </>
                                )}
                              </Link>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
        <Card.Footer>
          {resultPerPage < totalVideoCount && !loading && (
            <CustomPagination
              pages={numOfPages}
              pageHandler={curPageHandler}
              curPage={curPage}
            />
          )}
        </Card.Footer>
      </Card>
    </>
  );
};

export default Trailer;
