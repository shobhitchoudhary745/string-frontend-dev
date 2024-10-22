/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadAsCsv,
  getAllTransactions,
  getFilteredTransactions,
} from "../../features/apiCall";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import CustomPagination from "../../utils/CustomPagination";
import { FaRegFileExcel, FaSearch } from "react-icons/fa";
import { LiaFileDownloadSolid } from "react-icons/lia";
import "./Transaction.scss";
import { setCurrentPage } from "../../features/generalSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Transaction() {
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
  const [month, setMonth] = useState("Download Transaction");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const resultPerPage = 10;
  const curPageHandler = (p) => setCurPage(p);

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage: "Transaction" }));
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
        "COMPLETED"
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
                downloadAsCsv("Transaction", "transactions", token, from, to);
              }}
            >
              <FaRegFileExcel /> Export Transactions
            </Button>
          </div>
          <Container>
            <div className="d-flex gap-3">
              <div md={"3"}>
                <InputGroup
                  style={{
                    border: "1px solid #313133",
                    backgroundColor: "#313133",
                    borderRadius: "5px",
                  }}
                  className="user-search d-flex align-items-center"
                >
                  <Form.Label className="m-2" style={{ color: "#f9f9f9" }}>
                    From
                  </Form.Label>
                  <Form.Control
                    aria-label="Search Input"
                    type="date"
                    value={from}
                    onChange={(e) => {
                      if (new Date() < new Date(e.target.value)) {
                        toast.warning(
                          "From must be lesser or equal to current date"
                        );
                        return;
                      }
                      setFrom(e.target.value);
                    }}
                  />
                </InputGroup>
              </div>
              <div md={"3"}>
                <InputGroup
                  style={{
                    border: "1px solid #313133",
                    backgroundColor: "#313133",
                    borderRadius: "5px",
                  }}
                  className="user-search d-flex align-items-center"
                >
                  <Form.Label className="m-2" style={{ color: "#f9f9f9" }}>
                    To
                  </Form.Label>
                  <Form.Control
                    aria-label="Search Input"
                    type="date"
                    value={to}
                    onChange={(e) => {
                      if (from && new Date(from) > new Date(e.target.value)) {
                        toast.warning(
                          "To Date must be greater or equal than From"
                        );
                        return;
                      }
                      if (!from) {
                        toast.warning("Please Select From Date First");
                        return;
                      }
                      setTo(e.target.value);
                    }}
                  />
                </InputGroup>
              </div>
              <div md={"3"} className="d-flex align-items-end">
                <Button
                  disabled={!(from && to)}
                  style={{
                    backgroundColor: "#35b8e0",
                    border: "none",
                    height: "44px",
                  }}
                  onClick={() => {
                    getFilteredTransactions(dispatch, token, from, to);
                  }}
                >
                  Download Transactions
                </Button>
              </div>
            </div>
          </Container>
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
                          {transaction?.user ? (
                            <Link to={`/admin/user/${transaction?.user?._id}`}>
                              {transaction?.user?.name}
                            </Link>
                          ) : (
                            <p className="m-0">Deleted User</p>
                          )}
                        </td>
                        <td>
                          {transaction?.user
                            ? transaction.user.email
                            : "Deleted User"}
                        </td>
                        <td>{transaction?.order?.plan_type}</td>
                        <td>
                          {transaction?.gateway === "Razorpay"
                            ? `₹ ${transaction?.amount}`
                            : `$ ${transaction?.amount}`}
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
