import React, { useEffect } from "react";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Card, Spinner, Table } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllDirectors } from "../../features/apiCall";
import { setCurrentPage, setLoading } from "../../features/generalSlice";
import axios from "../../utils/axiosUtil";
import { toast } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Director = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { directors } = useSelector((state) => state.director);
  const { loading } = useSelector((state) => state.general);

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage: "Directors" }));
  }, []);

  useEffect(() => {
    if (token) getAllDirectors(dispatch, token);
  }, []);

  const deleteHandler = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this Director?\nThis action cannot be undone."
      ) === true
    ) {
      try {
        dispatch(setLoading());
        const { data } = await axios.delete(
          `/api/director/delete-director/${id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.success) {
          getAllDirectors(dispatch, token);
          dispatch(setLoading());
          toast.success(data.message);
        }
      } catch (error) {
        dispatch(setLoading());
        toast.error(error.message);
    
      }
    }
  };

  return (
    <>
      <Card className="user-table">
        <Card.Header className="user-header">
          <div className="button">
            <Link to={"/admin/add-director"}>
              <HiPlus /> Add Director
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
                  <th>Director Name</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {directors.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No Directors Found
                    </td>
                  </tr>
                ) : (
                  directors.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data.name}</td>
                        <td>
                        <LazyLoadImage
                            alt={"Profile"}
                            src={`${process.env.REACT_APP_URL}/${data.profile_url}`}
                            className="poster"
                            effect="blur"
                          />
                        </td>
                        <td >
                          <Link
                            style={{
                              backgroundColor: "#10c469",
                              border: "none",
                            }}
                            to={`/admin/edit-director/${data._id}`}
                            className="btn btn-success m-1"
                          >
                            <FaEdit />
                          </Link>
                          <Link
                            style={{
                              backgroundColor: "#ff5b5b",
                              border: "none",
                            }}
                            onClick={() => deleteHandler(data._id)}
                            className="btn btn-danger m-1"
                          >
                            <IoClose />
                          </Link>
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
    </>
  );
};

export default Director;
