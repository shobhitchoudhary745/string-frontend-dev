import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactions } from "../../features/apiCall";
import { Card, Form, InputGroup, Table } from "react-bootstrap";
import CustomPagination from "../../utils/CustomPagination";
import { FaRegFileExcel, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Transaction() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { transactions, filteredTransactions } = useSelector(
    (state) => state.transaction
  );

  const [curPage, setCurPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const resultPerPage = 10;
  const curPageHandler = (p) => setCurPage(p);

  useEffect(() => {
    if (token)
      getAllTransactions(
        dispatch,
        token,
        curPage,
        resultPerPage,
        query,
        setLoading
      );
  }, [dispatch, token, curPage, resultPerPage, query, setLoading]);

  const numOfPages = Math.ceil(filteredTransactions / resultPerPage);
  return (
    <div>
      <Card className="user-table">
        <Card.Header className="user-header">
          <Form.Group>
            <Form.Select
            // value={status}
            // onChange={(e) => {
            //   setStatus(e.target.value);
            //   setCurPage(1);
            // }}
            >
              <option value="all">Filter By Gateway</option>
              <option value="razorpay">Razorpay</option>
              <option value="paypal">Paypal</option>
            </Form.Select>
          </Form.Group>
          <InputGroup className="user-search">
            <Form.Control
              aria-label="Search Input"
              placeholder="Search By name or email"
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <InputGroup.Text
              style={{ cursor: "pointer" }}
              onClick={() => {
                setQuery(searchInput);
                setCurPage(1);
              }}
            >
              <FaSearch />
            </InputGroup.Text>
          </InputGroup>
          <InputGroup className="user-search">
            <Form.Control
              aria-label="Search Input"
              placeholder="Search By name or email"
              type="date"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <FaSearch />
          </InputGroup>
          <div className="button">
            <Link>
              <FaRegFileExcel /> Export Transactions
            </Link>
          </div>
        </Card.Header>
        <Card.Body className="user-body">
          <Table responsive striped bordered hover>
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
                    <td>{transaction.razorpay_payment_id}</td>
                    <td>{transaction.createdAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
        <Card.Footer>
          {resultPerPage < filteredTransactions && (
            <CustomPagination
              pages={numOfPages}
              pageHandler={curPageHandler}
              curPage={curPage}
            />
          )}
        </Card.Footer>
      </Card>
    </div>
  );
}
