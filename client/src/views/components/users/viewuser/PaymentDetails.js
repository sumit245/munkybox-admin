import React from "react";

export default function PaymentDetails({ cards }) {
  return (
    <div className="ibox-content">
      <div className="row">
        <div className="col-lg-3">
          <h4>Brand</h4>
        </div>
        <div className="col-lg-3">
          <h4>Card Number</h4>
        </div>
        <div className="col-lg-3">
          <h4>Card Holder</h4>
        </div>
        <div className="col-lg-3">
          <h4>Expiry Date</h4>
        </div>
      </div>
      {cards.map((row, key) => (
        <div className="row" key={key}>
          <div className="col-lg-3">
            <small className="stats-label">{row.brand}</small>
          </div>
          <div className="col-lg-3">
            <small className="stats-label">{row.number}</small>
          </div>
          <div className="col-lg-3">
            <small className="stats-label"> {row.card_holder}</small>
          </div>
          <div className="col-lg-3">
            <small className="stats-label">{row.expiry}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
