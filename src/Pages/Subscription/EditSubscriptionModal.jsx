import React, { useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";

export default function EditSubscriptionModal({ plan, ...props }) {
  const [name, setName] = useState(plan.name);
  const [allow_devices, setAllow_devices] = useState(plan.allow_devices);
  const [monthly_price, setMonthly_price] = useState(plan.prices[0].price);
  const [yearly_price, setYearly_price] = useState(plan.prices[1].price);
  const [usd_price_monthly, setUsd_Monthly_price] = useState(
    plan.prices[0]?.usd_price
  );
  const [usd_price_yearly, setUsd_Yearly_price] = useState(
    plan.prices[1]?.usd_price
  );

  const submitHandler = async () => {};
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
                <Form.Label>Allowed Devices</Form.Label>
                <Form.Control
                  value={allow_devices}
                  placeholder="Enter Allowed Devices"
                  onChange={(e) => setAllow_devices(e.target.value)}
                  type="number"
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
            {/* {loadingUpdate ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Submit"
            )} */}
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
