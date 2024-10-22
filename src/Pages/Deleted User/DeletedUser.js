/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../features/generalSlice";
import CustomPagination from "../../utils/CustomPagination";
import { getAllDeletedUsers } from "../../features/apiCall";

const DeletedUser = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.general);
  const { token } = useSelector((state) => state.auth);

  const resultPerPage = 10;
  const curPageHandler = (p) => setCurPage(p);
  const { deletedUsers, filterDeletedUsers } = useSelector(
    (state) => state.deleted_user
  );
  const [curPage, setCurPage] = useState(1);
  const numOfPages = Math.ceil(filterDeletedUsers / resultPerPage);

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage: "Deleted User" }));
  }, []);

  useEffect(() => {
    if (token) getAllDeletedUsers(dispatch, token, curPage);
  }, [curPage]);

  return (
    <>
      <Card className="user-table">
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
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {deletedUsers?.map((user, ind) => {
                  return (
                    <tr key={ind}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.reason}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Card.Body>
        <Card.Footer>
          {resultPerPage < filterDeletedUsers && !loading && (
            <CustomPagination
              pages={numOfPages}
              pageHandler={curPageHandler}
              curPage={curPage}
            />
          )}
        </Card.Footer>
      </Card>
    </>
  );
};

export default DeletedUser;
