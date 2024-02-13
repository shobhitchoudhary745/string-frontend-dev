import React, { useEffect } from "react";
// import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Card, Table } from "react-bootstrap";
// import { IoClose } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// import { getAllPages } from "../../features/apiCall";
import { setCurrentPage, setLoading } from "../../features/generalSlice";
// import axios from "../../utils/axiosUtil";
// import { toast } from "react-toastify";

const Gateway = () => {
  const dispatch = useDispatch();
  //   const { token } = useSelector((state) => state.auth);
  //   const { pages } = useSelector((state) => state.page);

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage: "Payment Gateways" }));
  }, []);

  //   useEffect(() => {
  //     if (token) getAllPages(dispatch, token);
  //   }, [token, dispatch]);

  //   const deleteHandler = async (id) => {
  //     if (
  //       window.confirm(
  //         "Are you sure you want to Delete this Page?\nThis action cannot be undone."
  //       ) === true
  //     ) {
  //       try {
  //         dispatch(setLoading());
  //         const { data } = await axios.delete(
  //           `/api/page/delete-page/${id}`,
  //           {
  //             headers: {
  //               authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );
  //         if (data.success) {
  //           getAllPages(dispatch, token);
  //           dispatch(setLoading());
  //           toast.success(data.message);
  //         }
  //       } catch (error) {
  //         dispatch(setLoading());
  //         toast.error(error.message);
  //         console.log(error);
  //       }
  //     }
  //   };

  return (
    <>
      <Card className="user-table">
        {/* <Card.Header className="user-header">
          <div className="button">
            <Link to={"/admin/add-page"}>
              <HiPlus /> Add Page
            </Link>
          </div>
        </Card.Header> */}
        <Card.Body className="user-body">
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Gateway Name</th>
                {/* <th>Page Type</th> */}
                <th>Status</th>
                <th>Actions</th>
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
                <td className="action-link-1">
                  <Link
                    style={{ backgroundColor: "#10c469", border: "none" }}
                    className="btn btn-success"
                  >
                    <FaEdit />
                  </Link>
                </td>
              </tr>
              <tr>
                <td>Paytm</td>
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
                <td className="action-link-1">
                  <Link
                    style={{ backgroundColor: "#10c469", border: "none" }}
                    className="btn btn-success"
                  >
                    <FaEdit />
                  </Link>
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
