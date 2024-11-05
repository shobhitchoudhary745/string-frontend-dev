import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getQuery } from "../../features/apiCall";
import { useParams } from "react-router-dom";
import "../../utils/style.scss";
import { setCurrentPage } from "../../features/generalSlice";

const ViewQuery = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { query } = useSelector((state) => state.query);

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage: "Queries" }));
  }, []);

  useEffect(() => {
    if (token) getQuery(dispatch, token, id);
  }, []);

  return (
    <Container fluid>
      <Card className="card">
        <Card.Header className="card-view">
          <Card.Title>Query - Details</Card.Title>
        </Card.Header>
        <Card.Body className="card-view">
          <Row>
            <Col md={4}>
              <p className="mb-0">
                <strong>Submitted By</strong>
              </p>
              <p>{query?.name}</p>
            </Col>
            <Col md={4}>
              <p className="mb-0">
                <strong>Email</strong>
              </p>
              <p>{query?.email}</p>
            </Col>
            <Col md={4}>
              <p className="mb-0">
                <strong>Mobile Number</strong>
              </p>
              <p>{query?.mobile}</p>
            </Col>
            {query?.company_name && (
              <Col md={4}>
                <p className="mb-0">
                  <strong>Company Name</strong>
                </p>
                <p>{query?.company_name}</p>
              </Col>
            )}
            <Col md={4}>
              <p className="mb-0">
                <strong>Address</strong>
              </p>
              <p>{query?.address}</p>
            </Col>
            {query?.createdAt && (
              <Col md={4}>
                <p className="mb-0">
                  <strong>Submitted At</strong>
                </p>
                <p>
                  {new Date(query.createdAt).toLocaleDateString() +
                    " " +
                    new Date(query.createdAt).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                </p>
              </Col>
            )}
            <Col md={4}>
              <p className="mb-0">
                <strong>Message</strong>
              </p>
              <p>{query?.message}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewQuery;
