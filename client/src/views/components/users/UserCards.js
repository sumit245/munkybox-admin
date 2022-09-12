import React from "react";

export default function UserCards({ total }) {
  return (
    <div className="row">
      <div className="col-lg-3">
        <div className="ibox">
          <div className="ibox-title">
            <h5>Total Users</h5>
          </div>
          <div className="ibox-content">
            <h1 className="no-margins">{total && total.length}</h1>
            <small>Total users</small>
          </div>
        </div>
      </div>
      <div className="col-lg-3">
        <div className="ibox">
          <div className="ibox-title">
            <span className="label label-success float-right">Active</span>
            <h5>Users</h5>
          </div>
          <div className="ibox-content">
            <h1 className="no-margins">{total && total.length}</h1>
            <small>Total active users</small>
          </div>
        </div>
      </div>

      <div className="col-lg-3">
        <div className="ibox">
          <div className="ibox-title">
            <span className="label label-danger float-right">Inactive</span>
            <h5>Users</h5>
          </div>
          <div className="ibox-content">
            <h1 className="no-margins">0</h1>
            <small>Inactive users</small>
          </div>
        </div>
      </div>
    </div>
  );
}
