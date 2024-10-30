/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card, Col, Form, Row, Spinner, Table, Button } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../utils/axiosUtil";
import { setCurrentPage, setLoading } from "../../features/generalSlice";
import { useNavigate } from "react-router-dom";
import {
  getAllInnerCarousels,
  getAllOuterCarousels,
} from "../../features/apiCall";

export default function EditCarousel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.general);
  const [tag, setTag] = useState("Inner");
  const { carousels } = useSelector((state) => state.carousel);
  console.log(carousels);
  const [sequence, setSequence] = useState([]);

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage: "Edit Carousel Sequence" }));
  }, []);
  useEffect(() => {
    if (tag === "Inner" && token) getAllInnerCarousels(token, dispatch);
    if (tag === "Outer" && token) getAllOuterCarousels(token, dispatch);
  }, [tag]);

  useEffect(() => {
    setSequence([...carousels]);
  }, [carousels]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading());
      const { data } = await axios.patch(
        `/api/carousel/edit-carousel-sequence`,
        { carousel: sequence.sort((a, b) => a.sequence - b.sequence) },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success("Carousel Uploaded Successfully.    ...Redirecting");
        dispatch(setLoading());

        setTimeout(() => {
          navigate("/admin/carousels");
        }, 1200);
      }
    } catch (error) {
      dispatch(setLoading());
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Card className="user-table ">
        <Card.Header className="user-header">
          <Form.Group>
            <Form.Select
              value={tag}
              onChange={(e) => {
                setTag(e.target.value);
              }}
            >
              <option value="Inner">Inner</option>
              <option value="Outer">Outer</option>
            </Form.Select>
          </Form.Group>
        </Card.Header>
        <Card.Body className="user-body">
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" style={{ color: "#caa257" }} />
            </div>
          ) : (
            <>
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Poster</th>
                    <th>Edit Sequence</th>
                  </tr>
                </thead>
                <tbody>
                  {sequence?.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center">
                        No Carousel Found
                      </td>
                    </tr>
                  ) : (
                    sequence?.map((data, index) => {
                      return (
                        <tr className="input-fieleds" key={index}>
                          <td>
                            <LazyLoadImage
                              alt={"Profile"}
                              src={`${process.env.REACT_APP_URL}/${data?.poster_url}`}
                              effect="blur"
                              className="poster"
                            />
                          </td>
                          <td>
                            <Form.Control
                              onChange={(e) => {
                                let temp = [...sequence];
                                const updatedItem = {
                                  ...temp[index],
                                  sequence: e.target.value,
                                };
                                temp[index] = updatedItem;
                                setSequence(temp);
                              }}
                              value={sequence[index]?.sequence}
                              min={1}
                              type="number"
                            />
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </Table>
              {sequence.length > 0 ? (
                <Row className="align-items-center mb-4">
                  <Col className="input-fieleds" sm={12} md={8}>
                    <Button onClick={submitHandler}>
                      {loading ? <Spinner /> : "Update"}
                    </Button>
                  </Col>
                </Row>
              ) : (
                <></>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
