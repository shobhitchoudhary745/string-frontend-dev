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

import "./Coupon.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../utils/axiosUtil";
import { setCurrentPage, setLoading } from "../../features/generalSlice";
import { useNavigate } from "react-router-dom";

export default function AddCoupon() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const { loading } = useSelector((state) => state.general);

  const [coupon, setCoupon] = useState("");
  const [allow, setAllow] = useState(0);
  const [status, setStatus] = useState("Active");
  const [discount, setDiscount] = useState("");
  const [expiry, setExpiry] = useState("");

  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  const minDateString = `${year}-${month}-${day}`;

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage: "Add Coupon" }));
  }, []);

  const generateCoupon = (e) => {
    e.preventDefault();
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    setCoupon(result);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!coupon || !expiry || !status || !allow || !discount) {
      toast.warning("Please Enter All Fieleds");
      return;
    }
    try {
      dispatch(setLoading());
      const { data } = await axios.post(
        "/api/coupon/create-coupon",
        {
          coupon_code: coupon,
          status,
          expiry,
          allow,
          discount,
        },
        { headers: { authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        dispatch(setLoading());
        toast.success("Coupon created Successfully.    Redirecting...");
        setTimeout(() => {
          navigate("/admin/coupons");
        }, 1200);
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoading());
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    <div>
      <Card className="user-table ">
        <Container className="input-fieleds p-4">
          <Row className="align-items-center mb-2">
            <Col sm={12} md={3}>
              <Form.Label>Coupon Code</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                required
                value={coupon}
                onChange={(e) => {
                  const filteredValue = e.target.value
                    .replace(/[^a-zA-Z0-9]/g, "")
                    .slice(0, 10);
                  setCoupon(filteredValue);
                }}
                type="text"
              />
            </Col>
          </Row>
          <Row className="align-items-center mb-4">
            <Col className="d-none d-md-block" md={3}>
              <Form.Label></Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Button
                style={{ backgroundColor: "#10c469" }}
                onClick={generateCoupon}
              >
                Generate
              </Button>
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Number of Users Allow</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                value={allow}
                onChange={(e) => setAllow(e.target.value)}
                type="number"
                minLength={1}
              />
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Discount %</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                type="number"
                // minLength={1}
              />
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Expiry Date</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                type="date"
                min={minDateString}
                required
              />
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col className="mb-2" sm={12} md={3}>
              <label>Status</label>
            </Col>
            <Col sm={12} md={8}>
              <select
                value={status}
                className="rounded"
                defaultValue="Active"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col className="d-none d-md-block" md={3}>
              <Form.Label></Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Button onClick={submitHandler}>
                {loading ? <Spinner /> : "Save"}
              </Button>
            </Col>
          </Row>
        </Container>
      </Card>
    </div>
  );
}
