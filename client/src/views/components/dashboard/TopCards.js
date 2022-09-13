import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRequests } from "../../../actions/requestAction";
import axios from "axios";

export default function TopCards() {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);
  const [totalorders, setTotalOrders] = useState(0);
  const [totalrestaurants, setTotalRestaurants] = useState(0);
  const [totalusers, setTotalUsers] = useState(0);
  const getData = async () => {
    const orders = await axios.get("/api/calculations/orders");
    const { totalorders } = orders.data;
    setTotalOrders(totalorders);
    const users = await axios.get("/api/calculations/users");
    const { totalusers } = users.data;
    setTotalUsers(totalusers);
    const restaurants = await axios.get("/api/calculations/restaurants");
    const { totalrestaurants } = restaurants.data;
    setTotalRestaurants(totalrestaurants);
  };
  useEffect(() => {
    dispatch(getRequests());
  }, [dispatch]);
  useEffect(() => {
    let componentmounted = true;
    if (componentmounted) {
      getData();
    }
    return () => {
      componentmounted = false;
    };
  }, [totalorders, totalrestaurants, totalusers]);

  return (
    <div className="row">
      <div className="col-lg-3">
        <div className="ibox">
          <div className="ibox-title">
            <h5>Partner Requests</h5>
          </div>
          <div className="ibox-content">
            <h1 className="no-margins">
              {requests && Object.keys(requests).length}
            </h1>
            <small>Total requests</small>
          </div>
        </div>
      </div>

      <div className="col-lg-3">
        <div className="ibox">
          <div className="ibox-title">
            <h5>Users</h5>
          </div>
          <div className="ibox-content">
            <h1 className="no-margins">{totalusers}</h1>
            <small>Total Users</small>
          </div>
        </div>
      </div>

      <div className="col-lg-3">
        <div className="ibox">
          <div className="ibox-title">
            <h5>Orders</h5>
          </div>
          <div className="ibox-content">
            <h1 className="no-margins">{totalorders}</h1>
            <small>Total orders</small>
          </div>
        </div>
      </div>

      <div className="col-lg-3">
        <div className="ibox">
          <div className="ibox-title">
            <h5>Restaurants</h5>
          </div>
          <div className="ibox-content">
            <h1 className="no-margins">{totalrestaurants}</h1>
            <small>Total Restaurants</small>
          </div>
        </div>
      </div>
    </div>
  );
}
