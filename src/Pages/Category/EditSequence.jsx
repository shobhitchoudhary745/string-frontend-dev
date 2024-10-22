import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategory } from "../../features/apiCall";
import { Button, Card, Col, Form, Row, Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "../../utils/axiosUtil";
import { setLoading } from "../../features/generalSlice";

const EditSequence = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.general);
  const { token } = useSelector((state) => state.auth);
  const { category } = useSelector((state) => state.category);
  const [array, setArray] = useState([]);
 

  useEffect(() => {
    if (token) {
      getCategory(dispatch, token, id);
    }
  }, [token]);

  useEffect(() => {
    if (category.name) {
      setArray([...category.video_array]);
    }
  }, [category]);

  const submitHandler = async (e) => {
    // e.preventDafault();
    let temp = [];
    for (let i of array) {
      temp.push(parseInt(i.sequence));
      if (i.sequence == "" || i.sequence == 0) {
        toast.warning(
          "please fill all sequence and sequence value must be non zero"
        );
        return;
      }
    }
    if (Array.from(new Set(temp)).length < array.length) {
      toast.warning("Please fill unique sequence to each fieled");
      return;
    }

    try {
      dispatch(setLoading());
      const video_array = array.map((data) => {
        return {
          _id: data._id,
          sequence: data.sequence,
          video: data.video._id,
        };
      });
     

      const { data } = await axios.patch(
        `/api/category/shuffle-category-sequence/${id}`,
        {
          video_array,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        dispatch(setLoading());
        toast.success("Sequence Updated Successfully");
        getCategory(dispatch, token, id);
      }
    } catch (error) {
      dispatch(setLoading());
      toast.error(error.response.data.message);
    }
  };

  return (
    <Card className="user-table ">
      <Card.Header>
        <div className="d-flex justify-content-between">
          <span style={{ color: "#f9f9f9" }}>{category?.name}</span>
        </div>
      </Card.Header>
      <Card.Body className="user-body">
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>S No</th>
              <th>Title</th>
              <th>Poster</th>
              <th>Sequence</th>
            </tr>
          </thead>
          <tbody>
            {array.length > 0 &&
              category.video_array?.map((video, index) => {
                return (
                  <tr className="input-fieleds" key={index}>
                    <td>{index + 1}</td>
                    <td>{video.video.title}</td>
                    <td>
                      <img
                        className="poster"
                        src={`${process.env.REACT_APP_URL}/${video.video.thumbnail_url}`}
                        alt=""
                      />
                    </td>
                    <td>
                      <Form.Control
                        value={array[index].sequence}
                        onChange={(e) => {
                          let inputValue = e.target.value;

                          if (inputValue.length > 1) {
                            inputValue = inputValue.slice(0, 1);
                          }
                          let temp = array.map((item, i) => {
                            if (i === index) {
                              return { ...item, sequence: inputValue };
                            } else {
                              return item;
                            }
                          });
                          setArray(temp);
                        }}
                        type="number"
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <Row className="align-items-center mb-4">
          <Col className="input-fieleds" sm={12} md={8}>
            <Button onClick={submitHandler}>
              {loading ? <Spinner /> : "Update"}
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default EditSequence;
