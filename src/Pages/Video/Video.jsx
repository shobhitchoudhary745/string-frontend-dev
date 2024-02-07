import React, { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Card, Form, InputGroup, Table } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { FaEdit, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllGenres,
  getAllLanguages,
  getAllVideos,
} from "../../features/apiCall";
import { setLoading } from "../../features/generalSlice";
import axios from "../../utils/axiosUtil";
import { toast } from "react-toastify";
import "./Video.scss";

const Video = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { videos } = useSelector((state) => state.video);
  const { languages } = useSelector((state) => state.language);
  const { genres: gen } = useSelector((state) => state.genre);
  const [language, setLanguage] = useState("");
  const [genres, setGenres] = useState("");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  
  useEffect(() => {
    if (token) {
      getAllVideos(dispatch, token, language, genres, query);
    }
  }, [dispatch, token, language, genres, query]);

  useEffect(() => {
    getAllLanguages(dispatch, token);
    getAllGenres(dispatch, token);
  }, [token, dispatch]);

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
          getAllVideos(dispatch, token);
          dispatch(setLoading());
          toast.success(data.message);
        }
      } catch (error) {
        dispatch(setLoading());
        toast.error(error.message);
        console.log(error);
      }
    }
  };

  return (
    <>
      <Card className="user-table">
        <Card.Header className="user-header">
          <Form.Group>
            <Form.Select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                // setCurPage(1);
              }}
            >
              <option value="all">Filter By Language</option>
              {languages.map((language) => {
                return (
                  <option value={language.name} key={language._id}>
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
                // setCurPage(1);
              }}
            >
              <option value="all">Filter By Genres</option>
              {gen.map((genre) => {
                return (
                  <option value={genre.name} key={genre._id}>
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
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroup.Text
              style={{ cursor: "pointer" }}
              onClick={() => {
                setQuery(search);
                // setCurPage(1);
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
              {videos.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data.title}</td>
                    {/* <td>
                      {data.description.length > 100
                        ? data.description.slice(0, 100) + "..."
                        : data.description}
                    </td> */}
                    <td>{data.description}</td>
                    <td className="lang">
                      <span>{data.language}</span>
                    </td>
                    <td className="lang">
                      <span>{data?.access}</span>
                    </td>
                    <td>
                      <div className="cat-item">
                        {data.genres &&
                          data.genres.map((genre) => {
                            return <span key={genre._id}>{genre}</span>;
                          })}
                      </div>
                    </td>
                    <td>
                      <img className="poster" src={data.thumbnail_url} alt="" />
                    </td>
                    <td>
                      <div className="action-link">
                        <Link
                          style={{ backgroundColor: "#10c469", border: "none" }}
                          to={`/admin/edit-video/${data._id}`}
                          className="btn btn-success"
                        >
                          <FaEdit />
                        </Link>
                        <Link
                          style={{ backgroundColor: "#ff5b5b", border: "none" }}
                          onClick={() => deleteHandler(data._id)}
                          className="btn btn-danger"
                        >
                          <IoClose />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default Video;
