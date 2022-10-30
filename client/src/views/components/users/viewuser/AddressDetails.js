import React from "react";

export default function AddressDetails({ address }) {
  return (
    <div className="ibox-content">
      <div className="row">
        <div className="col-lg-1">
          <h4>Type</h4>
        </div>
        <div className="col-lg-4">
          <h4>Address</h4>
        </div>
        <div className="col-lg-2">
          <h4>City</h4>
        </div>
        <div className="col-lg-2">
          <h4>State</h4>
        </div>
        <div className="col-lg-1">
          <h4>Country</h4>
        </div>
        <div className="col-lg-2">
          <h4>Postal Code</h4>
        </div>
      </div>
      {address.map((row, key) => (
        <div className="row my-2">
          <div className="col-lg-1">
            <small className="stats-label text-uppercase">{row.address_type || ""}</small>
          </div>
          <div className="col-lg-4">
            <small className="stats-label">
              {(row.addressLine1 || "")}  <br />
              {(row.addressLine2 || "")}
            </small>
          </div>
          <div className="col-lg-2">
            <small className="stats-label"> {row.city || ""}</small>
          </div>
          <div className="col-lg-2">
            <small className="stats-label"> {row.states || ""}</small>
          </div>
          <div className="col-lg-1">
            <small className="stats-label">{row.country || ""}</small>
          </div>
          <div className="col-lg-2">
            <small className="stats-label">{row.postal_code || ""}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
