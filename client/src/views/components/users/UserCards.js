import React from "react";

export default function UserCards() {
  return (
    <div className="row">
      <div className="col-lg-3">
        <div className="ibox">
          <div className="ibox-title">
            <span className="label label-success float-right">Active</span>
            <h5>Users</h5>
          </div>
          <div className="ibox-content">
            <h1 className="no-margins">0</h1>
            <div className="stat-percent font-bold text-danger">
              0% <i className="fa fa-bolt" />
            </div>
            <small>Total income</small>
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
            <div className="stat-percent font-bold text-info">
              0% <i className="fa fa-level-up" />
            </div>
            <small>New users</small>
          </div>
        </div>
      </div>
    </div>
  );
}
