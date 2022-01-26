import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function CouponDetails() {
  const [coupon, setCoupon] = useState({});
  const [track, setTrack] = useState([]);
  const [users, setUsers] = useState([]);
  const [usedby, setUsedBy] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [couponLoaded, setCoupLoaded] = useState(false);
  const { id } = useParams();
  const getCouponById = async (id) => {
    const response = await axios.get("/api/coupon/" + id);
    const coupons = await response.data;
    setCoupon(coupons);
    const res = await axios.get(
      "/api/coupon/getcouponforchef/" +
        coupons.restaurant_id +
        "/" +
        coupons.status
    );
    setCoupLoaded(true);
    const data = await res.data;
    setUsedBy(data.unique);
    setUsers(data.promotedOrders);
    setLoaded(true);
  };
  useEffect(() => {
    getCouponById(id);
  }, [id]);
  if (loaded && couponLoaded) {
    return (
      <div className="wrapper wrapper-content">
        <div className="ibox">
          <div className="ibox-title">
            <span
              className={`${
                coupon.status === "Active"
                  ? "label float-right label-success"
                  : "label float-right label-warning"
              }`}
            >
              {coupon.status}
            </span>
            <h5>Promo Details</h5>
          </div>
          <div className="ibox-content">
            <div className="row">
              <div className="col-lg-4">
                <small className="stats-label">Promotion ID</small>
                <h4>{coupon.promo_id}</h4>
              </div>
              <div className="col-lg-4">
                <small className="stats-label">Restaurant ID</small>
                <h4>{coupon.restaurant_id}</h4>
              </div>
              <div className="col-lg-4">
                <small className="stats-label">Category</small>
                <h4>{coupon.category}</h4>
              </div>
            </div>
          </div>
          <div className="ibox-content">
            <div className="row">
              <div className="col-lg-4">
                <small className="stats-label">Plan Name</small>
                <h4>{coupon.plan_name}</h4>
              </div>
              <div className="col-lg-4">
                <small className="stats-label">Discount Type</small>
                <h4>{coupon.discount_type}</h4>
              </div>
              <div className="col-lg-4">
                <small className="stats-label">Code</small>
                <h4>{coupon.promo_code}</h4>
              </div>
            </div>
          </div>
          <div className="ibox-content">
            <div className="row">
              <div className="col-lg-4">
                <small className="stats-label">Base Price</small>
                <h4>{coupon.price}</h4>
              </div>
              <div className="col-lg-4">
                <small className="stats-label">Value</small>
                <h4>{coupon.discount}</h4>
              </div>
              <div className="col-lg-4">
                <small className="stats-label">Absolute Value</small>
                <h4>{coupon.absolute_value}</h4>
              </div>
            </div>
          </div>

          <div className="ibox-content">
            <div className="row">
              <div className="col-lg-4">
                <small className="stats-label">Total Used</small>
                <h4>{users.length}</h4>
              </div>
              <div className="col-lg-4">
                <small className="stats-label">Start Date</small>
                <h4>{coupon.start_date}</h4>
              </div>
              <div className="col-lg-4">
                <small className="stats-label">End Date</small>
                <h4>{coupon.end_date}</h4>
              </div>
            </div>
          </div>
          <div className="ibox-content">
            <table className="table table-bordered table-mail">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Order ID</th>
                  <th>Meal Type</th>
                  <th>Ordered At</th>
                  <th>Discount</th>
                </tr>
              </thead>
              <tbody>
                {users.map((data, key) => (
                  <tr key={key}>
                    <td>{data.user_id}</td>
                    <td>{data.order_id}</td>
                    <td>{data.meal_type}</td>
                    <td>{Date(data.order_time)}</td>
                    <td>{"$" + data.discount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
