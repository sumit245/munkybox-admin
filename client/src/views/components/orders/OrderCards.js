import React from "react";

export default function OrderCards({ total,pending,started,completed,rejected,cancelled }) {
  return (
    <div className="row">
      <div className="col-lg-3">
        <div className="ibox">
          <div className="ibox-title">
            <span className="label label-success float-right">Monthly</span>
            <h5>Total</h5>
          </div>
          <div className="ibox-content">
            <h1 className="no-margins">{total}</h1>
            <div className="stat-percent font-bold text-info">
              0% <i className="fa fa-bolt" />
            </div>
            <small>Total</small>
          </div>
        </div>
      </div>
      <div className="col-lg-3">
        <div className="ibox">
          <div className="ibox-title">
            <span className="label label-warning float-right">Monthly</span>
            <h5>Pending</h5>
          </div>
          <div className="ibox-content">
            <h1 className="no-margins">{pending}</h1>
            <div className="stat-percent font-bold text-warning">
              0% <i className="fa fa-level-down" />
            </div>
            <small>Orders placed by user but not accepted</small>
          </div>
        </div>
      
      
      </div>

      <div className="col-lg-3">
        <div className="ibox">
          <div className="ibox-title">
            <span className="label label-warning float-right">Monthly</span>
            <h5>In Progress</h5>
          </div>
          <div className="ibox-content">
            <h1 className="no-margins">{started}</h1>
            <div className="stat-percent font-bold text-warning">
              0% <i className="fa fa-level-up" />
            </div>
            <small>In Progress</small>
          </div>
        </div>
      </div>

      <div className="col-lg-3">
        <div className="ibox">
          <div className="ibox-title">
            <span className="label label-primary float-right">Monthly</span>
            <h5>Completed</h5>
          </div>
          <div className="ibox-content">
            <h1 className="no-margins">{completed}</h1>
            <div className="stat-percent font-bold text-success">
              0% <i className="fa fa-level-up" />
            </div>
            <small>Completed</small>
          </div>
        </div>
      </div>

      <div className="col-lg-3">
        <div className="ibox">
          <div className="ibox-title">
            <span className="label label-danger float-right">Monthly</span>
            <h5>Cancelled</h5>
          </div>
          <div className="ibox-content">
            <h1 className="no-margins">{cancelled}</h1>
            <div className="stat-percent font-bold text-danger">
              0% <i className="fa fa-level-down" />
            </div>
            <small>Orders cancelled by user</small>
          </div>
        </div>
      
      
      </div>
      <div className="col-lg-3">
        <div className="ibox">
          <div className="ibox-title">
            <span className="label label-danger float-right">Monthly</span>
            <h5>Rejected</h5>
          </div>
          <div className="ibox-content">
            <h1 className="no-margins">{rejected}</h1>
            <div className="stat-percent font-bold text-danger">
              0% <i className="fa fa-level-down" />
            </div>
            <small>Orders rejected by chef</small>
          </div>
        </div>
      
      
      </div>
      
    </div>
  );
}
