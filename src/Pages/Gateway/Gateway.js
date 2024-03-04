/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../features/generalSlice";

const Gateway = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage: "Payment Gateways" }));
  }, []);

  return (
    <>
      <Card className="user-table">
        <Card.Body className="user-body">
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Gateway Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Razorpay</td>
                <td>
                  <span
                    className="rounded px-2 py-1"
                    style={{
                      backgroundColor: "#10c469",
                    }}
                  >
                    Active
                  </span>
                </td>
              </tr>
              <tr>
                <td>Paypal</td>
                <td>
                  <span
                    className="rounded px-2 py-1"
                    style={{
                      backgroundColor: "#10c469",
                    }}
                  >
                    Active
                  </span>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default Gateway;
