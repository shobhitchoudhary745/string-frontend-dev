import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactions } from "../../features/apiCall";
import { Card, Table } from "react-bootstrap";

export default function Transaction() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { transactions, transactionCount, filteredTransactions } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    if (token) getAllTransactions(dispatch, token);
  }, [dispatch, token]);

  return (
    <div>
      <Card>
        <Card.Header></Card.Header>
        <Card.Body>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email address</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Payment Gateway</th>
                <th>Payment ID</th>
                <th>Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => {
                return (
                  <tr key={index}>
                    <td>{transaction.user.name}</td>
                    <td>{transaction.user.email}</td>
                    <td>{transaction.order.plan_type}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.gateway}</td>
                    <td>{transaction.order.razorpay_order_id}</td>
                    <td>{transaction.createdAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}
