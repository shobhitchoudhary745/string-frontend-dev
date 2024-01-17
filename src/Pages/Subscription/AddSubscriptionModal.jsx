import React, { useState } from "react";
import { Button, Container, Modal, Form, Spinner } from "react-bootstrap";
import "./Subscription.scss";
import axios from "../../utils/axiosUtil";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../features/generalSlice";
import { getAllPlans } from "../../features/apiCall";

export default function AddSubscriptionModal(props) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.general);

  const [name, setName] = useState("");
  const [allow_devices, setAllow_devices] = useState(0);
  const [monthly_price, setMonthly_price] = useState(0);
  const [yearly_price, setYearly_price] = useState(0);
  const [usd_price_monthly, setUsd_Monthly_price] = useState(0);
  const [usd_price_yearly, setUsd_Yearly_price] = useState(0);

  const resetForm = () => {
    setName("");
    setAllow_devices(0);
    setMonthly_price(0);
    setYearly_price(0);
    setUsd_Monthly_price(0);
    setUsd_Yearly_price(0);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading());
      const { data } = await axios.post(
        "/api/plan/create-plan",
        {
          name,
          allow_devices,
          monthly_price,
          yearly_price,
          usd_price_monthly,
          usd_price_yearly,
        },
        { headers: { authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        getAllPlans(dispatch, token);
        dispatch(setLoading());
        window.alert(data.message);
        resetForm();
        props.onHide();
      }
    } catch (err) {
      dispatch(setLoading());
      window.alert(err);
      console.log(err);
    }
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Plan
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={submitHandler}>
        <Modal.Body>
          <Container className="small-container">
            <div className="inner-div">
              <Form.Group>
                <Form.Label>Plan Name (Unique)</Form.Label>
                <Form.Control
                  value={name}
                  placeholder="Enter Plan Name"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Allowed Devices</Form.Label>
                <Form.Control
                  value={allow_devices}
                  placeholder="Enter Allowed Devices"
                  onChange={(e) => setAllow_devices(e.target.value)}
                  type="number"
                  required
                  min={1}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Monthly Price - INR</Form.Label>
                <Form.Control
                  placeholder="Enter Monthly Price"
                  value={monthly_price}
                  onChange={(e) => setMonthly_price(e.target.value)}
                  required
                  type="number"
                  min={1}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Yearly Price - INR</Form.Label>
                <Form.Control
                  value={yearly_price}
                  placeholder="Enter Yearly Price"
                  onChange={(e) => setYearly_price(e.target.value)}
                  required
                  type="number"
                  min={1}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Monthly Price - USD</Form.Label>
                <Form.Control
                  placeholder="Enter Monthly Price"
                  value={usd_price_monthly}
                  onChange={(e) => setUsd_Monthly_price(e.target.value)}
                  required
                  type="number"
                  min={1}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Yearly Price - USD</Form.Label>
                <Form.Control
                  value={usd_price_yearly}
                  placeholder="Enter Yearly Price"
                  onChange={(e) => setUsd_Yearly_price(e.target.value)}
                  required
                  type="number"
                  min={1}
                />
              </Form.Group>
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>
            Close
          </Button>
          <Button
            variant="success"
            type="submit"
            disabled={loading ? true : false}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
