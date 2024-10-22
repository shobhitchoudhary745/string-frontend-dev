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
import { City, State, Country } from "country-state-city";
import "./User.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../utils/axiosUtil";
import { setCurrentPage, setLoading } from "../../features/generalSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getAllPlans, getUser } from "../../features/apiCall";

export default function EditUser() {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { user, user_transactions } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = Country.getAllCountries();
  const [isoCountry, setIsoCountry] = useState("");
  const [isoState, setIsoState] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const { loading } = useSelector((state) => state.general);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [plan_name, setPlanName] = useState("");
  const [plan_type, setPlanType] = useState("");
  const [expiry, setExpiry] = useState("");
  const [currency, setCurrency] = useState("");
  const { plans } = useSelector((state) => state.plan);
  const [deletePlan, setDeletePlan] = useState(false);
  

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage: "Edit User" }));
  }, []);

  useEffect(() => {
    getUser(dispatch, token, id);
    getAllPlans(dispatch, token);
  }, [dispatch, token, id]);

  useEffect(() => {
    if (user.name) {
      setName(user.name);
      setEmail(user.email);
      setMobile(user.mobile);
    }
    if (user_transactions.length > 0) {
      setPlanName(user_transactions[0].order.plan_name);
      setPlanType(user_transactions[0].order.plan_type);
      setExpiry(user_transactions[0].order.expiry_date.slice(0, 10));
    }
  }, [user, user_transactions]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !name &&
      !email &&
      !password &&
      !mobile &&
      !country &&
      !city &&
      !state &&
      !plan_name &&
      !plan_type &&
      !expiry &&
      !deletePlan
    ) {
      toast.warning("Please Fill Atleast One Fieled");
      return;
    }
    try {
      const order_id =
        plan_name && plan_type && expiry ? user_transactions[0].order._id : "";
      dispatch(setLoading());
      const { data } = await axios.patch(
        `/api/admin/update-user/${id}`,
        {
          name,
          email,
          password,
          country,
          states: state,
          city,
          mobile,
          plan_name: plan_name ? plan_name : "",
          plan_type: plan_type ? plan_type : "",
          expiry: expiry ? expiry : "",
          order_id,
          currency,
          delete_plan: deletePlan,
        },
        { headers: { authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        dispatch(setLoading());
        toast.success("User Updated Successfully.  Redirecting...");
        setTimeout(() => {
          navigate("/admin/users");
        }, 1200);
      }
    } catch (error) {
      dispatch(setLoading());
      
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Card className="user-table ">
        <Container className="input-fieleds p-4">
          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Name</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </Col>
          </Row>
          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Email Address</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </Col>
          </Row>
          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Password</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </Col>
          </Row>
          <Row className="align-items-center mb-4">
            <Col sm={12} md={3}>
              <Form.Label>Mobile Number</Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Form.Control
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                type="text"
              />
            </Col>
          </Row>
          <Row className="align-items-center mb-4">
            <Col className="mb-2" sm={12} md={3}>
              <label>Country</label>
            </Col>
            <Col sm={12} md={8}>
              <select
                className="rounded"
                defaultValue="Country"
                onChange={(e) => {
                  setIsoCountry(e.target.value);
                  Array.from(e.target).map((data) => {
                    if (data.value === e.target.value) {
                      setCountry(data.label);
                    }
                  });

                  setStates(State.getStatesOfCountry(e.target.value));
                  setCities(City.getCitiesOfState([]));
                }}
              >
                <option disabled value="Country">
                  Select Country
                </option>
                {countries.map((data, index) => (
                  <option key={index} label={data.name} value={data.isoCode}>
                    {data.name}
                  </option>
                ))}
              </select>
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col className="mb-2" sm={12} md={3}>
              <label>State</label>
            </Col>
            <Col sm={12} md={8}>
              <select
                className="rounded"
                onChange={(e) => {
                  setIsoState(e.target.value);

                  setCities(City.getCitiesOfState(isoCountry, e.target.value));
                  Array.from(e.target).map((data) => {
                    if (data.value === e.target.value) {
                      setState(data.label);
                    }
                  });
                }}
                defaultValue="State"
              >
                <option disabled value="State">
                  Select State
                </option>
                {states.map((data, index) => {
                  return (
                    <option key={index} label={data.name} value={data.isoCode}>
                      {data.name}
                    </option>
                  );
                })}
              </select>
            </Col>
          </Row>
          <Row className="align-items-center mb-4">
            <Col className="mb-2" sm={12} md={3}>
              <label>City</label>
            </Col>
            <Col sm={12} md={8}>
              <select
                className="rounded"
                onChange={(e) => setCity(e.target.value)}
                defaultValue={"City"}
              >
                <option value="City">Select City</option>
                {cities.map((data, index) => {
                  return (
                    <option key={index} label={data.name} value={data.name}>
                      {data.name}
                    </option>
                  );
                })}
              </select>
            </Col>
          </Row>
          {user_transactions.length > 0 ? (
            <div>
              <Row className="align-items-center mb-4">
                <Col sm={12} md={3}>
                  <Form.Label>Delete User Plan</Form.Label>
                </Col>
                <Col>
                  {/* <Form.Group className="mb-3"> */}
                  <input
                    className="check-in-put"
                    onClick={() => setDeletePlan((p) => !p)}
                    type="checkbox"
                    label=""
                    checked={deletePlan}
                  />
                  {/* </Form.Group> */}
                </Col>
              </Row>
              {/* <Row className="align-items-center mb-4">
                <Col sm={12} md={3}>
                  <Form.Label>Plan Name</Form.Label>
                </Col>
                <Col sm={12} md={8}>
                  <select
                    value={plan_name}
                    className="rounded"
                    onChange={(e) => setPlanName(e.target.value)}
                  >
                    <option value="Select Plan Name">Select Plan Name</option>
                    <option value="Individual">Individual</option>
                    <option value="Family">Family</option>
                  </select>
                </Col>
              </Row>
              <Row className="align-items-center mb-4">
                <Col sm={12} md={3}>
                  <Form.Label>Plan Type</Form.Label>
                </Col>
                <Col sm={12} md={8}>
                  <select
                    value={plan_type}
                    className="rounded"
                    onChange={(e) => setPlanType(e.target.value)}
                  >
                    <option value="Select Plan Type">Select Plan Type</option>
                    <option value="monthly">monthly</option>
                    <option value="annual">annual</option>
                  </select>
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
                  />
                </Col>
              </Row> */}
            </div>
          ) : (
            <>
              <Row className="align-items-center mb-4">
                <Col sm={12} md={3}>
                  <Form.Label>Plan Name</Form.Label>
                </Col>
                <Col sm={12} md={8}>
                  <select
                    value={plan_name}
                    className="rounded"
                    onChange={(e) => setPlanName(e.target.value)}
                  >
                    <option value="">Select Plan Name</option>
                    {plans.map((plan, ind) => {
                      return (
                        <option key={ind} value={plan?._id}>
                          {plan.name}
                        </option>
                      );
                    })}
                  </select>
                </Col>
              </Row>
              <Row className="align-items-center mb-4">
                <Col sm={12} md={3}>
                  <Form.Label>Plan Type</Form.Label>
                </Col>
                <Col sm={12} md={8}>
                  <select
                    value={plan_type}
                    className="rounded"
                    onChange={(e) => setPlanType(e.target.value)}
                  >
                    <option value="">Select Plan Type</option>
                    {plans[0]?.prices?.map((data, ind) => {
                      return (
                        <option key={ind} value={data.plan_type}>
                          {data.plan_type}
                        </option>
                      );
                    })}
                  </select>
                </Col>
              </Row>
              <Row className="align-items-center mb-4">
                <Col sm={12} md={3}>
                  <Form.Label>Currency</Form.Label>
                </Col>
                <Col sm={12} md={8}>
                  <select
                    value={currency}
                    className="rounded"
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="">Select Currency</option>
                    <option value="INR">INR</option>
                    <option value="Dollar">Dollar</option>
                  </select>
                </Col>
              </Row>
            </>
          )}
          <Row className="align-items-center mb-4">
            <Col className="d-none d-md-block" md={3}>
              <Form.Label></Form.Label>
            </Col>
            <Col sm={12} md={8}>
              <Button onClick={submitHandler}>
                {loading ? <Spinner /> : "Update"}
              </Button>
            </Col>
          </Row>
        </Container>
      </Card>
    </div>
  );
}
