import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ShowCard({ card, closeHandler }) {
  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Used {card.brand} card</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Card Holder: {card.card_holder}
          <hr />
          Card Number: {card.number}
          <hr />
          Expiry Date: {card.expiry}
          <hr />
          CVC: {card.cvc}
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => closeHandler(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
}
