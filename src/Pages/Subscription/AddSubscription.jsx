import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setLoading } from "../../features/generalSlice";
import { toast } from "react-toastify";
import axios from "../../utils/axiosUtil";
import { useEffect } from "react";

const AddSubscription = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.general);

  const [name, setName] = useState("");
  const [allow_devices, setAllow_devices] = useState(0);
  const [monthly_price, setMonthly_price] = useState(0);
  const [yearly_price, setYearly_price] = useState(0);
  const [usd_price_monthly, setUsd_Monthly_price] = useState(0);
  const [usd_price_yearly, setUsd_Yearly_price] = useState(0);

  useEffect(()=>{
    dispatch(setCurrentPage({ currentPage: "Add Subscription" }));
  },[])

  const resetForm = () => {
    setName("");
    setAllow_devices();
    setMonthly_price();
    setYearly_price();
    setUsd_Monthly_price();
    setUsd_Yearly_price();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !allow_devices ||
      !monthly_price ||
      !yearly_price ||
      !usd_price_monthly ||
      !usd_price_yearly
    ) {
      toast.warning("Please fill all the fields");
      return;
    }
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
        dispatch(setLoading());
        resetForm();
        toast.success(data.message);
      }
    } catch (err) {
      dispatch(setLoading());
      if (err.response.data.message.includes("11000")) {
        toast.error("Plan name already exist");
      } else {
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <Card className="user-table ">
      <Container className="input-fieleds p-4">
        <Row className="align-items-center mb-4">
          <Col sm={12} md={3}>
            <Form.Label>Plan Name (Unique)</Form.Label>
          </Col>
          <Col sm={12} md={8}>
            <Form.Control
              value={name}
              placeholder="Enter Plan Name"
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
            />
          </Col>
        </Row>
        <Row className="align-items-center mb-4">
          <Col sm={12} md={3}>
            <Form.Label>Allowed Devices</Form.Label>
          </Col>
          <Col sm={12} md={8}>
            <Form.Control
              value={allow_devices}
              placeholder="Enter Allowed Devices"
              onChange={(e) => setAllow_devices(e.target.value)}
              type="number"
              required
            />
          </Col>
        </Row>
        <Row className="align-items-center mb-4">
          <Col sm={12} md={3}>
            <Form.Label>Monthly Price - INR</Form.Label>
          </Col>
          <Col sm={12} md={8}>
            <Form.Control
              placeholder="Enter Monthly Price"
              value={monthly_price}
              onChange={(e) => setMonthly_price(e.target.value)}
              required
              type="number"
            />
          </Col>
        </Row>
        <Row className="align-items-center mb-4">
          <Col sm={12} md={3}>
            <Form.Label>Yearly Price - INR</Form.Label>
          </Col>
          <Col sm={12} md={8}>
            <Form.Control
              value={yearly_price}
              placeholder="Enter Yearly Price"
              onChange={(e) => setYearly_price(e.target.value)}
              required
              type="number"
            />
          </Col>
        </Row>
        <Row className="align-items-center mb-4">
          <Col sm={12} md={3}>
            <Form.Label>Monthly Price - USD</Form.Label>
          </Col>
          <Col sm={12} md={8}>
            <Form.Control
              placeholder="Enter Monthly Price"
              value={usd_price_monthly}
              onChange={(e) => setUsd_Monthly_price(e.target.value)}
              required
              type="number"
            />
          </Col>
        </Row>
        <Row className="align-items-center mb-4">
          <Col sm={12} md={3}>
            <Form.Label>Yearly Price - USD</Form.Label>
          </Col>
          <Col sm={12} md={8}>
            <Form.Control
              value={usd_price_yearly}
              placeholder="Enter Yearly Price"
              onChange={(e) => setUsd_Yearly_price(e.target.value)}
              required
              type="number"
            />
          </Col>
        </Row>
        <Row className="align-items-center mb-4">
          <Col className="d-none d-md-block" md={3}>
            <Form.Label></Form.Label>
          </Col>
          <Col sm={12} md={8}>
            <Button onClick={submitHandler}>
              {loading ? <Spinner /> : "Add Subscription"}
            </Button>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default AddSubscription;
