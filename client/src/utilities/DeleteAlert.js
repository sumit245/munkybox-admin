import axios from "axios";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useLocation } from "react-router";

export default function DeleteAlert() {
  const [show, setShow] = useState(true);
  const { pathname } = useLocation();
  const deleteHandler = async () => {
    const param = "/api" + pathname;
    const response = await axios.delete(param);
    if (response !== null) {
      setShow(false);
      window.history.back()
    }
  };
  return (
    <Modal show={show} onHide={() => setShow(!show)}>
      <Modal.Header closeButton>
        <Modal.Title> Are you sure to delete?</Modal.Title>
      </Modal.Header>
      <Modal.Body>Action cannot be reversed!!!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(!show)}>
          Close
        </Button>
        <Button variant="danger" onClick={deleteHandler}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
