import React, { useEffect, useState } from "react";
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
import { setLoading } from "../../features/generalSlice";
import { toast } from "react-toastify";
import axios from "../../utils/axiosUtil";
import { getPlan } from "../../features/apiCall";
import { useParams } from "react-router-dom";

const EditSubscription = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { plan } = useSelector((state) => state.plan);

  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.general);
  const [name, setName] = useState("");
  const [monthly_price, setMonthly_price] = useState(0);
  const [yearly_price, setYearly_price] = useState(0);
  const [usd_price_monthly, setUsd_Monthly_price] = useState(0);
  const [usd_price_yearly, setUsd_Yearly_price] = useState(0);

  useEffect(() => {
    getPlan(dispatch, token, id);
  }, [dispatch, token, id]);

  const resetForm = () => {
    setName("");
    setMonthly_price(0);
    setYearly_price(0);
    setUsd_Monthly_price(0);
    setUsd_Yearly_price(0);
  };

  useEffect(() => {
    if (plan.name) {
      setName(plan.name);
      setMonthly_price(plan.prices[0].price);
      setYearly_price(plan.prices[1].price);
      setUsd_Monthly_price(plan.prices[0].usd_price);
      setUsd_Yearly_price(plan.prices[1].usd_price);
    }
  }, [plan]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading());
      const { data } = await axios.patch(
        `/api/plan/update-plan/${id}`,
        {
          name,
          monthly_price,
          yearly_price,
          usd_price_monthly,
          usd_price_yearly,
        },
        { headers: { authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        dispatch(setLoading());
        toast.success("Plan Edit Successfully.");
        resetForm();
      }
    } catch (err) {
      dispatch(setLoading());
      window.alert(err);
      console.log(err);
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
              {loading ? <Spinner /> : "Edit Subscription"}
            </Button>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default EditSubscription;
