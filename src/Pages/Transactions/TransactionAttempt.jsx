/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { downloadAsCsv, getAllTransactions } from "../../features/apiCall";
import {
  Button,
  Card,
  Form,
  InputGroup,
  Spinner,
  Table,
} from "react-bootstrap";
import CustomPagination from "../../utils/CustomPagination";
import { FaRegFileExcel, FaSearch } from "react-icons/fa";
import { LiaFileDownloadSolid } from "react-icons/lia";
import "./Transaction.scss";
import { setCurrentPage } from "../../features/generalSlice";
import { Link } from "react-router-dom";

export default function TransactionAttempt() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.general);
  const { transactions, filteredTransactions } = useSelector(
    (state) => state.transaction
  );

  const [curPage, setCurPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [gateway, setGateway] = useState("");
  const [date, setData] = useState("");

  const resultPerPage = 10;
  const curPageHandler = (p) => setCurPage(p);

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage: "Attempt History" }));
  }, [dispatch]);

  useEffect(() => {
    if (token)
      getAllTransactions(
        dispatch,
        token,
        curPage,
        resultPerPage,
        gateway,
        date,
        query,
       "ALL"
      );
  }, [curPage, resultPerPage, gateway, query, date]);

  const numOfPages = Math.ceil(filteredTransactions / resultPerPage);

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const month = dateTime.toLocaleString("default", { month: "short" });
    const day = dateTime.getDate();
    const year = dateTime.getFullYear();
    const time = dateTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return `${day} ${month}, ${year} ${time}`;
  };

  return (
    <div>
      <Card className="user-table">
        <Card.Header className="user-header">
          <Form.Group>
            <Form.Select
              value={gateway}
              onChange={(e) => {
                setGateway(e.target.value);
                setCurPage(1);
              }}
            >
              <option value="all">Filter By Gateway</option>
              <option value="Razorpay">Razorpay</option>
              <option value="Paypal">Paypal</option>
            </Form.Select>
          </Form.Group>
          <InputGroup className="user-search">
            <Form.Control
              aria-label="Search Input"
              placeholder="Search By PaymentId"
              type="search"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                if (e.target.value === "") {
                  setQuery(e.target.value);
                }
              }}
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
              type="date"
              value={date}
              onChange={(e) => setData(e.target.value)}
            />
          </InputGroup>
          <div className="button">
            <Button
              style={{ backgroundColor: "#35b8e0", border: "none" }}
              onClick={() => {
                downloadAsCsv("Transaction", "transactions", token);
              }}
            >
              <FaRegFileExcel /> Export Transactions
            </Button>
          </div>
        </Card.Header>
        <Card.Body className="user-body">
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" style={{ color: "#caa257" }} />
            </div>
          ) : (
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Plan</th>
                  <th>Amount</th>
                  <th>Payment Gateway</th>
                  <th>Payment ID</th>
                  <th>Payment Date</th>
                  <th>Invoice</th>
                </tr>
              </thead>
              <tbody>
                {transactions &&
                  transactions.length > 0 &&
                  transactions.map((transaction, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {transaction?.user?<Link to={`/admin/user/${transaction?.user?._id}`}>
                            {transaction?.user?.name}
                          </Link>:<p className="m-0">Deleted User</p>}
                        </td>
                        <td>{transaction?.user?transaction.user.email:"Deleted User"}</td>
                        <td>{transaction?.order?.plan_type}</td>
                        <td>
                          {transaction?.gateway === "Razorpay"
                            ? `₹ ${transaction?.amount}`
                            : `₹0`}
                        </td>
                        <td>{transaction?.gateway}</td>
                        <td>
                          {transaction?.payment_id
                            ? transaction.payment_id
                            : transaction.razorpay_payment_id}
                        </td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          {formatDateTime(transaction?.createdAt)}
                        </td>
                        <td>
                          <a
                            className="p-2 rounded"
                            style={{
                              color: "#f9f9f9",
                              backgroundColor: "#ff5b5b",
                            }}
                            href={`${process.env.REACT_APP_URL}/${transaction?.invoice_url}`}
                          >
                            <LiaFileDownloadSolid />
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                {transactions.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No Transactions Found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
        <Card.Footer>
          {resultPerPage < filteredTransactions && !loading && (
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
