/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Spinner, Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllAbouts } from "../../features/apiCall";
import { setCurrentPage } from "../../features/generalSlice";

import { LazyLoadImage } from "react-lazy-load-image-component";

const About = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { abouts } = useSelector((state) => state.about);
  const { loading } = useSelector((state) => state.general);

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage: "About" }));
  }, []);

  useEffect(() => {
    if (token) getAllAbouts(dispatch, token);
  }, []);

  return (
    <>
      <Card className="user-table">
        <Card.Header className="user-header"></Card.Header>
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
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {abouts.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No About Image Found
                    </td>
                  </tr>
                ) : (
                  abouts.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <LazyLoadImage
                            alt={"Profile"}
                            src={`${process.env.REACT_APP_URL}/${data.image_url}`}
                            className="poster"
                            effect="blur"
                          />
                        </td>
                        <td>
                          <Link
                            style={{
                              backgroundColor: "#10c469",
                              border: "none",
                            }}
                            to={`/admin/edit-about/${data._id}`}
                            className="btn btn-success m-1"
                          >
                            <FaEdit />
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

export default About;
