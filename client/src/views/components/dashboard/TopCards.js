import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../../../actions/orderAction";
import { getUsers } from "../../../actions/actions";
import { getAllRestaurant } from "../../../actions/restaurantAction";
import { getRequests } from "../../../actions/requestAction";

export default function TopCards() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const users = useSelector((state) => state.users.users);
  const restaurant = useSelector((state) => state.restaurant);
  const requests = useSelector((state) => state.requests);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getOrders());
    dispatch(getAllRestaurant());
    dispatch(getRequests());
  }, [dispatch]);
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
            <h1 className="no-margins">{users && users.length}</h1>
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
            <h1 className="no-margins">{orders && orders.length}</h1>
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
            <h1 className="no-margins">
              {restaurant && Object.keys(restaurant).length}
            </h1>
            <small>Total Restaurants</small>
          </div>
        </div>
      </div>
    </div>
  );
}
