import React, { useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCategory, getCategoryVideo } from "../../features/apiCall";
import { FaPlus } from "react-icons/fa";
import { setLoading } from "../../features/generalSlice";
import axios from "../../utils/axiosUtil";
import { toast } from "react-toastify";
import { MdRemoveCircleOutline } from "react-icons/md";

const ViewCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { category } = useSelector((state) => state.category);
  const { videos_category } = useSelector((state) => state.video);

  console.log(category);
  console.log(videos_category);

  useEffect(() => {
    if (token) {
      getCategory(dispatch, token, id);
      getCategoryVideo(dispatch, token, id);
    }
  }, [token, dispatch, id]);

  const addVideo = async (video_id) => {
    try {
      dispatch(setLoading());
      const { data } = await axios.post(
        `/api/category/add-category-video/${id}`,
        { video_id },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        getCategory(dispatch, token, id);
        dispatch(setLoading());
        toast.success("Video Added Successfully.");
      }
    } catch (error) {
      dispatch(setLoading());
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const removeVideo = async (video_id) => {
    try {
      dispatch(setLoading());
      const { data } = await axios.post(
        `/api/category/remove-category-video/${id}`,
        { video_id },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        getCategory(dispatch, token, id);
        dispatch(setLoading());
        toast.success("Video Removed Successfully.");
      }
    } catch (error) {
      dispatch(setLoading());
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <Card className="user-table ">
      <Card.Header>
        <span style={{ color: "#f9f9f9" }}>{category?.name}</span>
      </Card.Header>
      <Card.Body className="user-body">
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
            {videos_category.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.title}</td>
                  <td>
                    <img className="poster" src={data.thumbnail_url} alt="" />
                  </td>
                  <td>
                    <div className="action-link">
                      {category.video_array
                        .map((video) => {
                          return video.video;
                        })
                        .includes(data._id) ? (
                        <Link
                          style={{
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                          onClick={() => removeVideo(data._id)}
                          className="btn btn-danger"
                        >
                          <MdRemoveCircleOutline />
                          Remove
                        </Link>
                      ) : (
                        <Link
                          style={{ backgroundColor: "#10c469", border: "none" }}
                          onClick={() => addVideo(data._id)}
                          className="btn btn-success"
                        >
                          <FaPlus /> Add
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ViewCategory;
