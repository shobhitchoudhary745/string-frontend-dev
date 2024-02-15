import React, { useEffect } from "react";
import "./Subscription.scss";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Card, Table } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlans } from "../../features/apiCall";
import { setCurrentPage, setLoading } from "../../features/generalSlice";
import axios from "../../utils/axiosUtil";
import { toast } from "react-toastify";

const Subscription = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { plans } = useSelector((state) => state.plan);

  console.log(plans);

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage: "Subscription Plans" }));
  }, []);

  useEffect(() => {
    if (token) getAllPlans(dispatch, token);
  }, [dispatch, token]);

  const deleteHandler = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this plan?\nThis action cannot be undone."
      ) === true
    ) {
      try {
        dispatch(setLoading());
        const { data } = await axios.delete(`/api/plan/delete-plan/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (data.success) {
          getAllPlans(dispatch, token);
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
            <Link to={"/admin/add-subscription"}>
              <HiPlus /> Add Plan
            </Link>
          </div>
        </Card.Header>
        <Card.Body className="user-body">
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Plan Name</th>
                <th>Monthly Price</th>
                <th>Yearly Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data.name}</td>
                    <td>₹ {data.prices[0]?.inr_price}</td>
                    <td>₹ {data.prices[1]?.inr_price}</td>
                    <td>
                      <span className="active">Active</span>
                    </td>
                    <td className="action-link">
                      <Link
                        style={{ backgroundColor: "#10c469", border: "none" }}
                        to={`/admin/edit-subscription/${data._id}`}
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

export default Subscription;
