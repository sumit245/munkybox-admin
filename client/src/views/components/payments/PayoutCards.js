import React from "react";

export default function PayoutCards() {
  return (
    <div className="row">
      <div className="col-lg-3">
        <div className="ibox">
          <div className="ibox-title">
            <span className="label label-success float-right">Monthly</span>
            <h5>Income</h5>
          </div>
          <div className="ibox-content">
            <h1 className="no-margins">$156.00</h1>
            <div className="stat-percent font-bold text-success">
              98% <i className="fa fa-bolt" />
            </div>
            <small>Total income</small>
          </div>
        </div>
      </div>

      <div className="col-lg-3">
        <div className="ibox">
          <div className="ibox-title">
            <span className="label label-info float-right">Monthly</span>
            <h5>Orders</h5>
          </div>
          <div className="ibox-content">
            <h1 className="no-margins">4</h1>
            <div className="stat-percent font-bold text-info">
              20% <i className="fa fa-level-up" />
            </div>
            <small>New orders</small>
          </div>
        </div>
      </div>

      <div className="col-lg-3">
        <div className="ibox">
          <div className="ibox-title">
            <span className="label label-primary float-right">Monthly</span>
            <h5 style={{ fontSize: 12 }}>Commission</h5>
          </div>
          <div className="ibox-content">
            <h1 className="no-margins">$15.60</h1>
            <div className="stat-percent font-bold text-navy">
              44% <i className="fa fa-level-up" />
            </div>
            <small>New visits</small>
          </div>
        </div>
      </div>

      <div className="col-lg-3">
        <div className="ibox">
          <div className="ibox-title">
            <span className="label label-primary float-right">Low value</span>
            <h5 style={{ fontSize: 12 }}>Paid to chef</h5>
          </div>
          <div className="ibox-content">
            <h1 className="no-margins">$135.40</h1>
            <div className="stat-percent font-bold text-danger">
              38% <i className="fa fa-level-down" />
            </div>
            <small>In first month</small>
          </div>
        </div>
      </div>
    </div>
  );
}
