import React, { useEffect, useState } from "react";
import { Button, Container, Form, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../features/generalSlice";
import axios from "../../utils/axiosUtil";
import { getAllPlans } from "../../features/apiCall";

export default function EditSubscriptionModal({ ...props }) {

  const { plan } = useSelector((state) => state.plan);

  // console.log("plan is ",plan);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.general);
  const [name, setName] = useState("");
  const [monthly_price, setMonthly_price] = useState(0);
  const [yearly_price, setYearly_price] = useState(0);
  const [usd_price_monthly, setUsd_Monthly_price] = useState(0);
  const [usd_price_yearly, setUsd_Yearly_price] = useState(0);

  const resetForm = () => {
    setName("");
    setMonthly_price(0);
    setYearly_price(0);
    setUsd_Monthly_price(0);
    setUsd_Yearly_price(0);
  };

  useEffect(()=>{
    if(plan.name){
      setName(plan.name);
      setMonthly_price(plan.prices[0].price);
      setYearly_price(plan.prices[1].price);
      setUsd_Monthly_price(plan.prices[0].usd_price);
      setUsd_Yearly_price(plan.prices[1].usd_price);
    }
  },[plan])

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading());
      const { data } = await axios.patch(
        `/api/plan/update-plan/${plan._id}`,
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
        <Modal.Title id="contained-modal-title-vcenter">Edit Plan</Modal.Title>
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
            // disabled={loadingUpdate ? true : false}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
            {/* Submit */}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
