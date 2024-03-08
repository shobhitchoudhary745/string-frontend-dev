import React, { useEffect, useState } from "react";
import { Button, Card, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCategory, getCategoryVideo } from "../../features/apiCall";
import { FaEdit } from "react-icons/fa";
import { setLoading } from "../../features/generalSlice";
import axios from "../../utils/axiosUtil";
import { toast } from "react-toastify";
import { MdRemoveCircleOutline } from "react-icons/md";
import { HiPlus } from "react-icons/hi";

const ViewCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.general);
  const { token } = useSelector((state) => state.auth);
  const { category } = useSelector((state) => state.category);
  const { videos_category } = useSelector((state) => state.video);
  const [current, setCurrent] = useState(-1);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (token) {
      getCategory(dispatch, token, id);
      getCategoryVideo(dispatch, token, id);
    }
  }, [token, dispatch, id]);

  const addVideo = async (video_id) => {
    try {
      setLoad(true);
      const { data } = await axios.post(
        `/api/category/add-category-video/${id}`,
        { video_id },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        setLoad(false);
        getCategory(dispatch, token, id);
        toast.success("Video Added Successfully.");
      }
    } catch (error) {
      setLoad(false);
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const removeVideo = async (video_id) => {
    try {
      setLoad(true);
      const { data } = await axios.post(
        `/api/category/remove-category-video/${id}`,
        { video_id },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        setLoad(false);
        getCategory(dispatch, token, id);
        toast.success("Video Removed Successfully.");
      }
    } catch (error) {
      setLoad(false);
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <Card className="user-table ">
      <Card.Header>
        <div className="d-flex justify-content-between">
          <span style={{ color: "#f9f9f9" }}>{category?.name}</span>
          <Button style={{ backgroundColor: "#10c469", border: "none" }}>
            <Link
              style={{ color: "#f9f9f9" }}
              to={`/admin/edit-sequence/${id}`}
            >
              <FaEdit style={{ color: "#f9f9f9" }} /> <span>Edit Sequence</span>
            </Link>
          </Button>
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
                <th>S No</th>
                <th>Title</th>
                <th>Poster</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos_category.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No Video in This Category
                  </td>
                </tr>
              ) : (
                videos_category.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.title}</td>
                      <td>
                        <img
                          className="poster"
                          src={`${process.env.REACT_APP_URL}/${data.thumbnail_url}`}
                          alt=""
                        />
                      </td>
                      <td>
                        <div className="action-link">
                          {category.video_array &&
                          category.video_array
                            .map((video, index) => {
                              return video.video._id;
                            })
                            .includes(data._id) ? (
                            <Link
                              style={{
                                border: "none",
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                              }}
                              onClick={() => {
                                setCurrent(index);
                                removeVideo(data._id);
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
    </Card>
  );
};

export default ViewCategory;
