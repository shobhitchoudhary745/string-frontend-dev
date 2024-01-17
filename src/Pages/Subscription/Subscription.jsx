import React, { useEffect, useState } from "react";
import "./Subscription.scss";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Card, Table } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import AddSubscriptionModal from "./AddSubscriptionModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlans } from "../../features/apiCall";

const Subscription = () => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { plans, filteredPlans } = useSelector((state) => state.plan);

  const [curPage, setCurPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const resultPerPage = 10;
  const curPageHandler = (p) => setCurPage(p);

  useEffect(() => {
    if (token)
      getAllPlans(dispatch, token, curPage, resultPerPage, query, setLoading);
  }, [dispatch, token, curPage, resultPerPage, query, setLoading,modalShow]);

  const numOfPages = Math.ceil(filteredPlans / resultPerPage);

  return (
    <>
      <Card className="user-table">
        <Card.Header className="user-header">
          <div className="button">
            <Link onClick={() => setModalShow(true)}>
              <HiPlus /> Add Plan
            </Link>
          </div>
        </Card.Header>
        <Card.Body className="user-body">
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Plan Name</th>
                <th>Monthly Price</th>
                <th>Yearly Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data.name}</td>
                    <td>₹ {data.prices[0].price}</td>
                    <td>₹ {data.prices[1].price}</td>
                    <td>
                      <span className="active">Active</span>
                    </td>
                    <td className="action-link">
                      <Link className="btn btn-success">
                        <FaEdit />
                      </Link>
                      <Link className="btn btn-danger">
                        <IoClose />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
        <AddSubscriptionModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Card>
    </>
  );
};

export default Subscription;
