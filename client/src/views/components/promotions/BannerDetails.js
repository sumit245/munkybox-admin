import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import moment from "moment";
import Loading from "../../../utilities/Loading";

export default function BannerDetails() {
  const [coupon, setCoupon] = useState({});
  const [users, setUsers] = useState([]);
  const [discount, setTotalDiscs] = useState("");
  const [due, setTotalDue] = useState("");
  const [clicks, setClicks] = useState("");
  const [revenue, setRevenue] = useState(0);
  const [usedby, setUsedBy] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [couponLoaded, setCoupLoaded] = useState(false);
  const { id } = useParams();

  const getCouponById = async (id) => {
    const response = await axios.get("/api/promo/getbannerdetails/" + id);
    const coupons = response.data.data;
    setCoupon(coupons);
    const res = await axios.get(
      "/api/chefdashboard/getchefbyidandrevenue/" + coupons.promo_id
    );
    setCoupLoaded(true);
    const data = await res.data;
    setClicks(data.clicks);
    setTotalDiscs(data.discount);
    setTotalDue(data.due);
    setRevenue(data.revenue);
    setUsedBy(data.users);
    setUsers(data.orders);
    setLoaded(true);
  };

  const deactivate = async () => {
    setLoaded(false);
    const restaurant = await axios.get(
      "/api/newrest/getchefbyId/" + coupon.restaurant_id
    );
    const { restaurant_name } = await restaurant.data;
    let {
      promo_id,
      restaurant_id,
      plan_name,
      rpc,
      duration,
      discount_type,
      meal_plan,
      promo_code,
      start_date,
      end_date,
    } = coupon;
    let banner = {
      promo_id: promo_id,
      restaurant_id: restaurant_id,
      plan_name: plan_name,
      rpc: rpc,
      duration: duration,
      status: "Inactive",
      discount_type: discount_type,
      meal_plan: meal_plan,
      discount: coupon.discount,
      totalDiscount: discount,
      promo_code: promo_code,
      start_date: start_date,
      end_date: end_date,
      clicks: clicks,
      due: due,
      paid: 0,
      users: usedby,
      orders: users,
      revenue: revenue,
      deactivation_date: moment(),
    };
    await axios.put("/api/promo/" + id, {
      status: "Inactive",
    });
    const dashboardResponse = await axios.get(
      "/api/chefdashboard/" + restaurant_id
    );
    const { dashboard } = await dashboardResponse.data;
    const { banners } = await dashboard;
    let prevCoupons = [...banners];
    prevCoupons.push(banner);
    await axios.put(
      "/api/chefdashboard/" + restaurant_name + "/" + dashboard._id,
      { banners: prevCoupons }
    );
    alert("Updated");
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
            <h5>Campaign Details</h5>
            <div className="ibox-tools">
              <span
                className={`${
                  coupon.status === "active"
                    ? "label mr-2 label-success"
                    : "label mr-2 label-inactive"
                }`}
              >
                {coupon.status}
              </span>
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={deactivate}
              >
                Deactivate
              </button>
            </div>
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
                <h4>{coupon.meal_plan}</h4>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-lg-4">
                <small className="stats-label">Plan Name</small>
                <h4>{coupon.plan_name}</h4>
              </div>
              <div className="col-lg-4">
                <small className="stats-label">Discount</small>
                <h4>
                  {coupon.discount_type === "%"
                    ? coupon.discount + "" + coupon.discount_type
                    : coupon.discount_type + "" + coupon.discount}
                </h4>
              </div>
              <div className="col-lg-4">
                <small className="stats-label">Code</small>
                <h4>{coupon.promo_code}</h4>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-lg-4">
                <small className="stats-label">Total Clicks</small>
                <h4>{clicks}</h4>
              </div>
              <div className="col-lg-4">
                <small className="stats-label">Rate/Click</small>
                <h4>{coupon.rpc}</h4>
              </div>
              <div className="col-lg-4">
                <small className="stats-label">Total Due</small>
                <h4>${due}</h4>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-lg-4">
                <small className="stats-label">Total Users</small>
                <h4>{usedby}</h4>
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
            <hr />
            <div className="row">
              <div className="col-lg-4">
                <small className="stats-label">Total Orders</small>
                <h4>{users.length}</h4>
              </div>
              <div className="col-lg-4">
                <small className="stats-label">Total Revenue</small>
                <h4>${revenue}</h4>
              </div>
              <div className="col-lg-4">
                <small className="stats-label">Discount Paid</small>
                <h4>${discount}</h4>
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
                    <td>
                      {moment(data.order_time).format("DD-MMM-YYYY hh:mm:ss")}
                    </td>
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
    return <Loading />;
  }
}
