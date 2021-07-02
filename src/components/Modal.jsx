import React from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function CustomeModal({ content, show, onHide }) {
  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={onHide}
        aria-labelledby="example-modal-sizes-title-lg"
        className="custome-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {content.message}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="my-3">
              <Col> نام و نام خانوادگی:</Col>
              <Col>{content.data ? content.data.customerName : ""}</Col>
            </Row>
            <Row className="my-3">
              <Col> شماره موبایل:</Col>
              <Col>{content.data ? content.data.mobile : ""}</Col>
            </Row>
            <Row className="my-3">
              <Col> شهر:</Col>
              <Col>{content.data ? content.data.cityCode : ""}</Col>
            </Row>
            <Row className="my-3">
              <Col> آدرس:</Col>
              <Col>{content.data ? content.data.address : ""}</Col>
            </Row>
            <Row className="my-3">
              <Col> کد پستی:</Col>
              <Col>{content.data ? content.data.postalCode : ""}</Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CustomeModal;
