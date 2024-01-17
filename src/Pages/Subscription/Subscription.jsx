import React, { useState } from "react";
import "./Subscription.scss";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Card, Table } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import AddSubscriptionModal from "./AddSubscriptionModal";

const Subscription = () => {
  const [modalShow, setModalShow] = useState(false);
  let transactions = [];
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
              <tr>
                <td>Individual</td>
                <td>₹ 99</td>
                <td>₹ 999</td>
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
