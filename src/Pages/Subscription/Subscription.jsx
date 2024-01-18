import React, { useEffect, useState } from "react";
import "./Subscription.scss";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Card, Table } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import AddSubscriptionModal from "./AddSubscriptionModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlans } from "../../features/apiCall";
import EditSubscriptionModal from "./EditSubscriptionModal";
import { setLoading } from "../../features/generalSlice";
import axios from "../../utils/axiosUtil";
import { setPlan } from "../../features/planSlice";
import { toast } from "react-toastify";

const Subscription = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { plans } = useSelector((state) => state.plan);

  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);

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
            <Link onClick={() => setModalShow(true)}>
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
                    <td>₹ {data.prices[0].price}</td>
                    <td>₹ {data.prices[1].price}</td>
                    <td>
                      <span className="active">Active</span>
                    </td>
                    <td className="action-link">
                      <Link
                        onClick={() => {
                          dispatch(setPlan({ plan: data }));
                          setEditModalShow(true);
                        }}
                        className="btn btn-success"
                      >
                        <FaEdit />
                      </Link>
                      <Link
                        onClick={() => deleteHandler(data._id)}
                        className="btn btn-danger"
                      >
                        <IoClose />
                      </Link>
                    </td>
                    <EditSubscriptionModal
                      show={editModalShow}
                      onHide={() => setEditModalShow(false)}
                    />
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>

        <AddSubscriptionModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Card>
    </>
  );
};

export default Subscription;
