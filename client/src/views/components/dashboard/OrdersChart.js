import React from "react";

export default function OrdersChart() {
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="ibox">
          <div className="ibox-title">
            <h5>Orders</h5>
            <div className="float-right">
              <div className="btn-group">
                <button type="button" className="btn btn-xs btn-white active">
                  Today
                </button>
                <button type="button" className="btn btn-xs btn-white">
                  Monthly
                </button>
                <button type="button" className="btn btn-xs btn-white">
                  Annual
                </button>
              </div>
            </div>
          </div>
          <div className="ibox-content">
            <div className="row">
              <div className="col-lg-9">
                <div className="flot-chart">
                  <div
                    className="flot-chart-content"
                    id="flot-dashboard-chart"
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <ul className="stat-list">
                  <li>
                    <h2 className="no-margins">2,346</h2>
                    <small>Total orders in period</small>
                    <div className="stat-percent">
                      48% <i className="fa fa-level-up text-navy" />
                    </div>
                    <div className="progress progress-mini">
                      <div style={{ width: "48%" }} className="progress-bar" />
                    </div>
                  </li>
                  <li>
                    <h2 className="no-margins">4,422</h2>
                    <small>Orders in last month</small>
                    <div className="stat-percent">
                      60% <i className="fa fa-level-down text-navy" />
                    </div>
                    <div className="progress progress-mini">
                      <div style={{ width: "60%" }} className="progress-bar" />
                    </div>
                  </li>
                  <li>
                    <h2 className="no-margins">9,180</h2>
                    <small>Monthly income from orders</small>
                    <div className="stat-percent">
                      22% <i className="fa fa-bolt text-navy" />
                    </div>
                    <div className="progress progress-mini">
                      <div style={{ width: "22%" }} className="progress-bar" />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
