import React from "react";
import { Modal, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const SelectCarouselModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Select Carousel Type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: "#1b1b1b",
          color: "#f9f9f9",
        }}
      >
        <Container className="small-container">
          Select the type of carousel you want to add i.e Outer or Inner
        </Container>
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: "#1b1b1b",
          color: "#f9f9f9",
        }}
      >
        <Button variant="danger" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="success">
          <Link style={{ color: "#f9f9f9" }} to={"/admin/add-carousel"}>
            Inner
          </Link>
        </Button>
        <Button variant="success">
          <Link style={{ color: "#f9f9f9" }} to={"/admin/add-carousel"}>
            Outer
          </Link>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
