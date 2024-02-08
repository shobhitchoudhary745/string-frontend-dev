import React, { useEffect, useState } from "react";
import { getQueries } from "../../features/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, InputGroup, Table } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import "../../utils/style.scss";
import CustomPagination from "../../utils/CustomPagination";
import { toast } from "react-toastify";
import { setLoading } from "../../features/generalSlice";
import axios from "../../utils/axiosUtil";

export default function Query() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { queries, totalQueryCount } = useSelector((state) => state.query);

  const [curPage, setCurPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");

  const resultPerPage = 10;
  const curPageHandler = (p) => setCurPage(p);

  const deleteQueryHandler = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this Query?") === true
    ) {
      try {
        dispatch(setLoading());
        const { data } = await axios.delete(`/api/query/delete-query/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (data.success) {
          dispatch(setLoading());
          getQueries(dispatch, token, curPage, resultPerPage, query);
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
    if (token) getQueries(dispatch, token, curPage, resultPerPage, query);
  }, [token, curPage, resultPerPage, query, dispatch]);

  const numOfPages = Math.ceil(totalQueryCount / resultPerPage);
  return (
    <div>
      <Card className="user-table">
        <Card.Header className="user-header">
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
              }}
            >
              <FaSearch />
            </InputGroup.Text>
          </InputGroup>
        </Card.Header>
        <Card.Body className="user-body">
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile no</th>
                <th>Company</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {queries && queries.length > 0 ? (
                queries.map((query, index) => {
                  return (
                    <tr key={index}>
                      <td>{query.name}</td>
                      <td>{query.email}</td>
                      <td>{query.mobile}</td>
                      <td>{query.company_name ? query.company_name : "N/A"}</td>
                      <td>{query.address}</td>
                      <td className="action-link-1">
                        <Link
                          style={{ backgroundColor: "#caa257", border: "none" }}
                          className="btn btn-primary"
                        >
                          <FaEye />
                        </Link>
                        <Link
                          style={{ backgroundColor: "#ff5b5b", border: "none" }}
                          onClick={() => deleteQueryHandler(query?._id)}
                          className="btn btn-danger"
                        >
                          <IoClose />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Queries Found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
        <Card.Footer>
          {resultPerPage < totalQueryCount && (
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
