/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Card, Spinner, Table } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
// import { FaEdit, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarousels } from "../../features/apiCall";
import { setCurrentPage, setLoading } from "../../features/generalSlice";
import axios from "../../utils/axiosUtil";
import { toast } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { MdRemoveCircleOutline } from "react-icons/md";

const Carousel = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { carousels } = useSelector((state) => state.carousel);
  const { loading } = useSelector((state) => state.general);

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage: "Carousel" }));
  }, []);

  useEffect(() => {
    if (token) getAllCarousels(dispatch);
  }, []);

  const deleteHandler = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this Carousel?\nThis action cannot be undone."
      ) === true
    ) {
      try {
        dispatch(setLoading());
        const { data } = await axios.delete(
          `/api/carousel/delete-carousel/${id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.success) {
          getAllCarousels(dispatch);
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
          <div className="button">
            <Link to={"/admin/add-carousel"}>
              <HiPlus /> Add New Carousel
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
                  <th>Carousel Video Title</th>
                  <th>Carousel Poster</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {carousels.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No Carousel Found
                    </td>
                  </tr>
                ) : (
                  carousels.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data.video_id.title}</td>
                        <td>
                          <LazyLoadImage
                            alt={"Profile"}
                            src={data.poster_url}
                            effect="blur"
                            className="poster"
                          />
                        </td>
                        <td >
                          <Link
                            style={{
                              backgroundColor: "#ff5b5b",
                              border: "none",
                            }}
                            onClick={() => deleteHandler(data._id)}
                            className="btn btn-danger"
                          >
                            <MdRemoveCircleOutline /> Remove
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

export default Carousel;