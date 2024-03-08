/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Card, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../features/generalSlice";
import { getUser } from "../../features/apiCall";
import { useParams } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ViewUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user, user_transactions } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage: "Users" }));
  }, []);

  useEffect(() => {
    getUser(dispatch, token, id);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }) +
      " " +
      date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
  };

  return (
    <div>
      <Container className="view_user">
        <Card>
          <LazyLoadImage alt={"Profile"} src={`${process.env.REACT_APP_URL}/${user.avatar}`} effect="blur" />
          <div className="user_info">
            <div className="user_name">
              <h4>{user.name}</h4>
              <span className="active">Active</span>
            </div>
            <div className="user_details">
              <span>
                <span className="field_head">Email Address:</span> {user.email}
              </span>
              <span>
                <span className="field_head">Mobile Number:</span> {user.mobile}
              </span>
              <span style={{ marginTop: "1rem" }}>
                <span className="field_head">Address:</span> {user.address}
              </span>
            </div>
          </div>
        </Card>
        <Card>
          <h3>Subscription Plan</h3>
          {user_transactions &&
            user_transactions.map((transaction, index) => {
              if (transaction.order.status === "Active") {
                return (
                  <div key={index} className="sub_plans">
                    <ul className="list_group">
                      <li className="list_group_item">
                        <div className="avatar">
                          <FaCircle />
                        </div>
                        <div className="user_desc">
                          <span>
                            {transaction.order.plan_name} -{" "}
                            {transaction.order.plan_type}
                          </span>
                          <span>
                            {transaction.order.status === "Active"
                              ? "Current Plan"
                              : "Upcoming Plan"}
                          </span>
                        </div>
                      </li>
                      <li className="list_group_item">
                        <div className="avatar">
                          <FaCircle />
                        </div>
                        <div className="user_desc">
                          <span>
                            {formatDate(transaction.order.expiry_date)}
                          </span>
                          <span>Subscription expires on</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                );
              } else return <></>;
            })}
          {user_transactions.length === 0 && (
            <div className="sub_plans">
              <ul className="list_group">
                <li
                  className="list_group_item"
                  style={{
                    borderBottomLeftRadius: "0.25rem",
                    borderBottomRightRadius: "0.25rem",
                  }}
                >
                  <div className="avatar">
                    <FaCircle color="red" />
                  </div>
                  <div className="user_desc">
                    <span>No Active Plan</span>
                    <span>Current Plan</span>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </Card>
      </Container>
      <Card className="user-table" style={{ marginTop: "20px" }}>
        <Card.Header className="user-header">
          <h4>User Transactions</h4>
        </Card.Header>
        <Card.Body className="user-body">
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Email Address</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Payment Gateway</th>
                <th>Payment ID</th>
                <th>Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {user_transactions.map((transaction, index) => {
                return (
                  <tr key={index}>
                    <td>{transaction.user.email}</td>
                    <td>{transaction.order.plan_name}</td>
                    <td>
                      {transaction.gateway === "Razorpay"
                        ? `₹${transaction.order.inr_price}`
                        : `$${transaction.order.usd_price}`}
                    </td>
                    <td>{transaction.gateway}</td>
                    <td>{transaction.payment_id}</td>
                    <td>{formatDateTime(transaction.createdAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ViewUser;
