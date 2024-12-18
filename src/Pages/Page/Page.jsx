import React, { useEffect } from "react";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Card, Spinner, Table } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllPages } from "../../features/apiCall";
import { setCurrentPage, setLoading } from "../../features/generalSlice";
import axios from "../../utils/axiosUtil";
import { toast } from "react-toastify";

const Page = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { pages } = useSelector((state) => state.page);
  const { loading } = useSelector((state) => state.general);

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage: "Pages" }));
  }, []);

  useEffect(() => {
    if (token) getAllPages(dispatch, token);
  }, []);

  const deleteHandler = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to Delete this Page?\nThis action cannot be undone."
      ) === true
    ) {
      try {
        dispatch(setLoading());
        const { data } = await axios.delete(`/api/page/delete-page/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (data.success) {
          getAllPages(dispatch, token);
          dispatch(setLoading());
          toast.success(data.message);
        }
      } catch (error) {
        dispatch(setLoading());
        toast.error(error.message);
       
      }
    }
  };

  return (
    <>
      <Card className="user-table">
        <Card.Header className="user-header">
          {/* <div className="button">
            <Link to={"/admin/add-page"}>
              <HiPlus /> Add Page
            </Link>
          </div> */}
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
                  <th>Page Title</th>
                  <th>Page Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No Pages Found
                    </td>
                  </tr>
                ) : (
                  pages.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data.title}</td>
                        <td>{data.type}</td>
                        <td>
                          <span
                            className="rounded px-2 py-1"
                            style={{
                              backgroundColor: `${
                                data.status === "Active" ? "#10c469" : "#ff5b5b"
                              }`,
                            }}
                          >
                            {data.status}
                          </span>
                        </td>
                        <td className="action-link-1">
                          <Link
                            style={{
                              backgroundColor: "#10c469",
                              border: "none",
                            }}
                            to={`/admin/edit-page/${data._id}`}
                            className="btn btn-success"
                          >
                            <FaEdit />
                          </Link>
                          {/* <Link
                            style={{
                              backgroundColor: "#ff5b5b",
                              border: "none",
                            }}
                            onClick={() => deleteHandler(data._id)}
                            className="btn btn-danger"
                          >
                            <IoClose />
                          </Link> */}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default Page;
