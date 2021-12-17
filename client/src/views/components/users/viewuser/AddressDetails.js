import React from "react";

export default function AddressDetails({ address }) {
  return (
    <div className="ibox-content">
      <div className="row">
        <div className="col-lg-3">
          <h4>Type</h4>
        </div>
        <div className="col-lg-3">
          <h4>Address</h4>
        </div>
        <div className="col-lg-3">
          <h4>City</h4>
        </div>
        <div className="col-lg-3">
          <h4>Postal Code</h4>
        </div>
      </div>
      {address.map((row, key) => (
        <div className="row">
          <div className="col-lg-3">
            <small className="stats-label">{row.address_type || ""}</small>
          </div>
          <div className="col-lg-3">
            <small className="stats-label">
              {(row.flat_num || "") + ", " + (row.locality || "")}
            </small>
          </div>
          <div className="col-lg-3">
            <small className="stats-label"> {row.city || ""}</small>
          </div>
          <div className="col-lg-3">
            <small className="stats-label">{row.postal_code || ""}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
