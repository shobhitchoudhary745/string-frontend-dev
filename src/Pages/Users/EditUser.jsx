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
import { getUser } from "../../features/apiCall";

export default function EditUser() {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
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
  // console.log(city,state,country)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(()=>{
    dispatch(setCurrentPage({ currentPage: "Edit User" }));
  },[])

  useEffect(() => {
    getUser(dispatch, token, id);
  }, [dispatch, token, id]);

  useEffect(() => {
    if (user.name) {
      setName(user.name);
      setEmail(user.email);
      setMobile(user.mobile);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !name &&
      !email &&
      !password &&
      !mobile &&
      !country &&
      !city &&
      !state
    ) {
      toast.warning("Please Fill Atleast One Fieled");
      return;
    }
    try {
      dispatch(setLoading());
      const { data } = await axios.patch(`/api/admin/update-user/${id}`, {
        name,
        email,
        password,
        country,
        states: state,
        city,
        mobile,
      },{headers:{authorization:`Bearer ${token}`}});
      if (data.success) {
        dispatch(setLoading());
        toast.success("User Updated Successfully.  Redirecting...");
        setTimeout(() => {
          navigate("/admin/users");
        }, 1200);
      }
    } catch (error) {
      dispatch(setLoading());
      console.log(error);
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
