/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { downloadAsCsv, getAllUsers } from "../../features/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Form, InputGroup, Table } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import { FaRegFileExcel, FaEye, FaEdit } from "react-icons/fa";
// import { VscListUnordered } from "react-icons/vsc";
import { IoClose } from "react-icons/io5";
import "../../utils/style.scss";
import "./User.scss";
import CustomPagination from "../../utils/CustomPagination";
import { toast } from "react-toastify";
import { setCurrentPage, setLoading } from "../../features/generalSlice";
import axios from "../../utils/axiosUtil";

export default function User() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { users, filteredUsers } = useSelector((state) => state.user);

  const [curPage, setCurPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [plan_name, setPlanName] = useState("");
  const [plan_type, setPlanType] = useState("");

  const resultPerPage = 10;
  const curPageHandler = (p) => setCurPage(p);

  const deleteUserHandler = async (id) => {
    if (
      window.confirm("Are you sure you want to delete/remove this user?") ===
      true
    ) {
      try {
        dispatch(setLoading());
        const { data } = await axios.delete(`/api/admin/delete-user/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (data.success) {
          dispatch(setLoading());
          getAllUsers(
            dispatch,
            token,
            curPage,
            resultPerPage,
            query,
            plan_name,
            plan_type
          );
          toast.success(data.message);
        }
      } catch (error) {
        dispatch(setLoading());
        toast.error(error.message);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage: "User" }));
  }, []);

  useEffect(() => {
    if (token)
      getAllUsers(
        dispatch,
        token,
        curPage,
        resultPerPage,
        query,
        plan_name,
        plan_type
      );
  }, [curPage, resultPerPage, query, plan_name, plan_type]);

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
              <option value="all">Filter By Plan</option>
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
              <option value="all">Filter By Duration</option>
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
            <Link
              to="/admin/add-users"
              onClick={() => {
                dispatch(setCurrentPage({ currentPage: "Add User" }));
              }}
            >
              <HiPlus /> Add User
            </Link>
            <Button
              style={{ backgroundColor: "#35b8e0", border: "none" }}
              onClick={() => {
                downloadAsCsv("User", "users", token);
              }}
            >
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
                      {/* <Link
                        style={{ backgroundColor: "#35b8e0", border: "none" }}
                        className="btn btn-info"
                      >
                        <VscListUnordered />
                      </Link> */}
                      <Link
                        style={{ backgroundColor: "#caa257", border: "none" }}
                        to={`/admin/user/${user?._id}`}
                        className="btn btn-primary"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        style={{ backgroundColor: "#10c469", border: "none" }}
                        to={`/admin/edit-user/${user?._id}`}
                        className="btn btn-success"
                        onClick={() => {
                          dispatch(
                            setCurrentPage({ currentPage: "Edit User" })
                          );
                        }}
                      >
                        <FaEdit />
                      </Link>
                      <Link
                        style={{ backgroundColor: "#ff5b5b", border: "none" }}
                        onClick={() => deleteUserHandler(user?._id)}
                        className="btn btn-danger"
                      >
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
