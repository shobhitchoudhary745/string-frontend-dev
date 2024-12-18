/* eslint-disable react-hooks/exhaustive-deps */
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
  getAllVideos,
} from "../../features/apiCall";
import { setCurrentPage, setLoading } from "../../features/generalSlice";
import axios from "../../utils/axiosUtil";
import { toast } from "react-toastify";
import "./Video.scss";
import CustomPagination from "../../utils/CustomPagination";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Video = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.general);
  const { videos, totalVideoCount } = useSelector((state) => state.video);
  const { languages } = useSelector((state) => state.language);
  const { genres: gen } = useSelector((state) => state.genre);

  const [curPage, setCurPage] = useState(1);
  const [language, setLanguage] = useState("");
  const [genres, setGenres] = useState("");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const resultPerPage = 10;
  const curPageHandler = (p) => setCurPage(p);

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage: "Videos" }));
  }, []);

  useEffect(() => {
    if (token) {
      getAllVideos(
        dispatch,
        token,
        language,
        genres,
        query,
        curPage,
        resultPerPage,
        
      );
    }
  }, [language, genres, query, curPage, resultPerPage]);

  useEffect(() => {
    getAllLanguages(dispatch, token);
    getAllGenres(dispatch, token);
  }, []);

  const deleteHandler = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this Video?\nThis action cannot be undone."
      ) === true
    ) {
      try {
        dispatch(setLoading());
        const { data } = await axios.delete(`/api/video/delete-video/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (data.success) {
          getAllVideos(
            dispatch,
            token,
            language,
            genres,
            query,
            curPage,
            resultPerPage
          );
          dispatch(setLoading());
          toast.success(data.message);
        }
      } catch (error) {
        dispatch(setLoading());
        toast.error(error.message);
        
      }
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
              {gen
                .filter((g) => g.name != "Carousel")
                .map((genre) => {
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
              placeholder="Search By title"
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
          <div className="button">
            <Link to={"/admin/add-video"}>
              <HiPlus /> Add Video
            </Link>
          </div>
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
                  <th>Title</th>
                  <th>Description</th>
                  <th>Language</th>
                  <th>Access</th>
                  <th>Genres</th>
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
                        <td>{data.title}</td>

                        <td>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: data.description.slice(0, 500),
                            }}
                          />
                        </td>
                        <td className="lang">
                          {data?.language?.map((lan, ind) => {
                            return <span className="m-1" key={ind}>{lan?.name}</span>;
                          })}
                        </td>
                        <td className="lang">
                          <span>{data?.access}</span>
                        </td>
                        <td>
                          <div className="cat-item">
                            {data.genres &&
                              data.genres.map((genre, i) => {
                                return <span key={i}>{genre?.name}</span>;
                              })}
                          </div>
                        </td>
                        <td>
                          <LazyLoadImage
                            alt={"Profile"}
                            src={`${process.env.REACT_APP_URL}/${data.thumbnail_url}`}
                            effect="blur"
                            className="poster"
                          />
                        </td>
                        <td>
                          <div className="action-link">
                            <Link
                              style={{
                                backgroundColor: "#10c469",
                                border: "none",
                              }}
                              to={`/admin/edit-video/${data._id}`}
                              className="btn btn-success"
                            >
                              <FaEdit />
                            </Link>
                            <Link
                              style={{
                                backgroundColor: "#ff5b5b",
                                border: "none",
                              }}
                              onClick={() => deleteHandler(data._id)}
                              className="btn btn-danger"
                            >
                              <IoClose />
                            </Link>
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

export default Video;
