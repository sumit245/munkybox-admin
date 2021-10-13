import React, { useEffect, useState } from "react";

export default function RestaurantCards({ data }) {
  const [active, setActive] = useState([]);
  const [inactive, setInactive] = useState([]);
  const [unapproved, setUnapproved] = useState([]);
  useEffect(() => {
    let activeRestaurant = data.filter(
      (restaurant) => restaurant.status === "Active"
    );
    setActive(activeRestaurant);
    let inactiveRestaurants = data.filter(
      (restaurant) => restaurant.status === "Inactive"
    );
    setInactive(inactiveRestaurants);
    let unapprovedRestaurants = data.filter(
      (restaurant) => restaurant.status === "Unapproved"
    );
    setUnapproved(unapprovedRestaurants);
  }, [data]);
  return (
    <div className="row">
      <div className="col-lg-3">
        <div className="ibox">
          <div className="ibox-title">
            <span className="label label-success float-right">Monthly</span>
            <h5>Total</h5>
          </div>
          <div className="ibox-content">
            <h1 className="no-margins">{data.length}</h1>
            <div className="stat-percent font-bold text-danger">
              0% <i className="fa fa-bolt" />
            </div>
            <small>Total Restaurant</small>
          </div>
        </div>
      </div>

      <div className="col-lg-3">
        <div className="ibox">
          <div className="ibox-title">
            <span className="label label-info float-right">Monthly</span>
            <h5>Active</h5>
          </div>
          <div className="ibox-content">
            <h1 className="no-margins">{active.length}</h1>
            <div className="stat-percent font-bold text-danger">
              0% <i className="fa fa-level-down" />
            </div>
            <small>Active Restaurant</small>
          </div>
        </div>
      </div>

      <div className="col-lg-3">
        <div className="ibox">
          <div className="ibox-title">
            <span className="label label-danger float-right">Monthly</span>
            <h5>Inactive</h5>
          </div>
          <div className="ibox-content">
            <h1 className="no-margins">{inactive.length}</h1>
            <div className="stat-percent font-bold text-navy">
              0% <i className="fa fa-level-up" />
            </div>
            <small>Inactive Restaurant</small>
          </div>
        </div>
      </div>

      <div className="col-lg-3">
        <div className="ibox">
          <div className="ibox-title">
            <span className="label label-primary float-right">Monthly</span>
            <h5>Unapproved</h5>
          </div>
          <div className="ibox-content">
            <h1 className="no-margins">{unapproved.length}</h1>
            <div className="stat-percent font-bold text-success">
              1% <i className="fa fa-level-up" />
            </div>
            <small>Request Pending</small>
          </div>
        </div>
      </div>
    </div>
  );
}
