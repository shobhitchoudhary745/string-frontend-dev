import React, { useEffect } from "react";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Card, Table } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoupons } from "../../features/apiCall";
import { setCurrentPage, setLoading } from "../../features/generalSlice";
import axios from "../../utils/axiosUtil";
import { toast } from "react-toastify";

const Coupon = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { coupons } = useSelector((state) => state.coupon);

  useEffect(()=>{
    dispatch(setCurrentPage({ currentPage: "Coupons" }));
  },[])

  useEffect(() => {
    if (token) getAllCoupons(dispatch, token);
  }, [token, dispatch]);

  const deleteHandler = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this Coupon?\nThis action cannot be undone."
      ) === true
    ) {
      try {
        dispatch(setLoading());
        const { data } = await axios.delete(
          `/api/coupon/delete-coupon/${id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.success) {
          getAllCoupons(dispatch, token);
          dispatch(setLoading());
          toast.success(data.message);
        }
      } catch (error) {
        dispatch(setLoading());
        toast.error(error.message);
        console.log(error);
      }
    }
  };

  return (
    <>
      <Card className="user-table">
        <Card.Header className="user-header">
          <div className="button">
            <Link to={"/admin/add-coupon"}>
              <HiPlus /> Add Coupon
            </Link>
          </div>
        </Card.Header>
        <Card.Body className="user-body">
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Coupon Code</th>
                <th>Number of Users Allow</th>
                <th>Coupon Used</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data.coupon_code}</td>
                    <td>{data.allow}</td>
                    <td>{data.uses}</td>
                    <td>{data.expiry}</td>
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
                        style={{ backgroundColor: "#10c469", border: "none" }}
                        to={`/admin/edit-coupon/${data._id}`}
                        className="btn btn-success"
                      >
                        <FaEdit />
                      </Link>
                      <Link
                        style={{ backgroundColor: "#ff5b5b", border: "none" }}
                        onClick={() => deleteHandler(data._id)}
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
      </Card>
    </>
  );
};

export default Coupon;
