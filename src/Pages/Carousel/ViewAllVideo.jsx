/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Card, Form, InputGroup, Spinner, Table } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCarousels,
  getAllGenres,
  getAllLanguages,
  getAllVideos,
} from "../../features/apiCall";
import { setCurrentPage } from "../../features/generalSlice";
import CustomPagination from "../../utils/CustomPagination";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ViewAllVideo = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.general);
  const { videos, totalVideoCount } = useSelector((state) => state.video);
  const { languages } = useSelector((state) => state.language);
  const { genres: gen } = useSelector((state) => state.genre);
  const { carousels } = useSelector((state) => state.carousel);

  const filtered_genre = gen.filter((genre) => genre.name === "Carousel");
  const set_genre = filtered_genre ? filtered_genre[0]?._id : "";

  const [curPage, setCurPage] = useState(1);
  const [language, setLanguage] = useState("");
  const [genres, setGenres] = useState(set_genre ? set_genre : "");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const resultPerPage = 10;
  const curPageHandler = (p) => setCurPage(p);

  useEffect(() => {
    dispatch(
      setCurrentPage({ currentPage: "Add Carousel" })
    );
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
        true
      );
    }
  }, [language, genres, query, curPage, resultPerPage]);

  useEffect(() => {
    getAllLanguages(dispatch, token);
    getAllGenres(dispatch, token);
    getAllCarousels(token, dispatch);
  }, []);

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
                  <th>Poster</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {videos.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No Videos Found In `keyword=Carousel`
                    </td>
                  </tr>
                ) : (
                  videos.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data.title}</td>
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
                            {carousels.length > 0 &&
                            carousels
                              .map((carousel) => {
                                return (
                                  carousel.video_id && carousel.video_id._id
                                );
                              })
                              .includes(data._id) ? (
                              <Link
                                style={{
                                  backgroundColor: "#ff5b5b",
                                  border: "none",
                                }}
                                className="btn btn-primary"
                              >
                                Already Added
                              </Link>
                            ) : (
                              <Link
                                style={{
                                  backgroundColor: "#10c469",
                                  border: "none",
                                }}
                                to={`/admin/add-inner-carousel/${data._id}`}
                                className="btn btn-danger"
                              >
                                {loading ? (
                                  <Spinner
                                    animation="border"
                                    style={{ color: "#caa257" }}
                                  />
                                ) : (
                                  <span>
                                    <HiPlus /> Add
                                  </span>
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

export default ViewAllVideo;
