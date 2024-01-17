import React, { useState } from "react";
import { Button, Container, Modal, Form } from "react-bootstrap";
import "./Subscription.scss";

export default function AddSubscriptionModal(props) {
  const [name, setName] = useState("");
  const [allow_devices, setAllow_devices] = useState("");
  const [description, setDescription] = useState("");
  const [monthly_price, setMonthly_price] = useState();
  const [yearly_price, setYearly_price] = useState();

  const submitHandler = async () => {};
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
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
                  type="email"
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Monthly Price</Form.Label>
                <Form.Control
                  placeholder="Enter Monthly Price"
                  value={monthly_price}
                  onChange={(e) => setMonthly_price(e.target.value)}
                  required
                  type="number"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Yearly Price</Form.Label>
                <Form.Control
                  value={yearly_price}
                  placeholder="Enter Yearly Price"
                  onChange={(e) => setYearly_price(e.target.value)}
                  required
                  type="number"
                />
              </Form.Group>
            </div>
            <Form.Group className="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={description}
                placeholder="Enter Description"
                onChange={(e) => setDescription(e.target.value)}
                required
                as="textarea"
                type="number"
              />
            </Form.Group>
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
