import React, { useEffect, useState } from "react";
import { downloadAsCsv, getAllUsers } from "../../features/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Form, InputGroup, Table } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import { FaRegFileExcel, FaEye, FaEdit } from "react-icons/fa";
import { VscListUnordered } from "react-icons/vsc";
import { IoClose } from "react-icons/io5";
import "../../utils/style.scss";
import "./User.scss";
import CustomPagination from "../../utils/CustomPagination";

export default function User() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { users, filteredUsers } = useSelector((state) => state.user);

  const [curPage, setCurPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan_name,setPlanName] = useState("");
  const [plan_type,setPlanType] = useState("");

  const resultPerPage = 10;
  const curPageHandler = (p) => setCurPage(p);

  useEffect(() => {
    if (token)
      getAllUsers(dispatch, token, curPage, resultPerPage, query, setLoading,plan_name,plan_type);
  }, [dispatch, token, curPage, resultPerPage, query, setLoading,plan_name,plan_type]);

  const numOfPages = Math.ceil(filteredUsers / resultPerPage);
  return (
    <div>
      <Card className="user-table">
        <Card.Header className="user-header">
          <Form.Group>
            <Form.Select
            value={plan_name}
            onChange={(e) => {
              setPlanName(e.target.value);
              setCurPage(1);
            }}
            >
              <option value="all" >Filter By Plan</option>
              <option value="Individual">Individual</option>
              <option value="Family">Family</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Select
              value={plan_type}
              onChange={(e) => {
                setPlanType(e.target.value);
                setCurPage(1);
              }}
            >
              <option value="all" >Filter By Duration</option>
              <option value="monthly">Monthly</option>
              <option value="annual">Annually</option>
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
          <div className="button">
            <Link>
              <HiPlus /> Add User
            </Link>
            <Button onClick = {()=>{
              downloadAsCsv("User","users");
            }}>
              <FaRegFileExcel /> Export Users
            </Button>
          </div>
        </Card.Header>
        <Card.Body className="user-body">
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email address</th>
                <th>Mobile no</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            {/* {loading ? (
              <div className="loader">Loading...</div>
            ) : ( */}
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td>
                      {user.subscription_plans?.plan_name
                        ? user.subscription_plans?.plan_name
                        : "N/A"}
                    </td>
                    <td>
                      <span className="active">Active</span>
                    </td>
                    <td className="action-link">
                      <Link className="btn btn-info">
                        <VscListUnordered />
                      </Link>
                      <Link className="btn btn-primary">
                        <FaEye />
                      </Link>
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
        <Card.Footer>
          {resultPerPage < filteredUsers && (
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
