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
import { setLoading } from "../../features/generalSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getCoupon } from "../../features/apiCall";

export default function EditCoupon() {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { coupon } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.general);

  const [coupons, setCoupon] = useState("");
  const [allow, setAllow] = useState(0);
  const [status, setStatus] = useState("Active");
  const [expiry, setExpiry] = useState("");

  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  const minDateString = `${year}-${month}-${day}`;

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

  useEffect(() => {
    getCoupon(dispatch, token, id);
  }, [dispatch, token, id]);

  useEffect(() => {
    if (coupon.coupon_code) {
      setCoupon(coupon.coupon_code);
      setStatus(coupon.status);
      setAllow(coupon.allow);
      setExpiry(coupon.expiry.toString().slice(0,10));
    }
  }, [coupon]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!coupon && !status && !expiry && !allow) {
      toast.warning("Please Fill Atleast One Fieled");
      return;
    }
    try {
      dispatch(setLoading());
      const { data } = await axios.patch(
        `/api/coupon/update-coupon/${id}`,
        {
          coupon_code: coupons,
          status,
          expiry,
          allow,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        dispatch(setLoading());
        toast.success("Coupon Updated Successfully.  Redirecting...");
        setTimeout(() => {
          navigate("/admin/coupons");
        }, 1200);
      }
    } catch (error) {
      dispatch(setLoading());
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    <div>
      <Card className="user-table ">
        <Container className="input-fieleds p-4">
          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Coupon Code</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                required
                value={coupons}
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
