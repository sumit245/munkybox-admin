import React, { useEffect, useState } from "react";
import Table from "../../../utilities/Table";
import axios from "axios";
import { orderColumns } from "../../utilities/utility";
import OrderCards from "../components/orders/OrderCards";

export default function TrackCoupon() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get("/api/orders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="wrapper wrapper-content">
      <OrderCards total={orders.length} />
      <Table title="Orders" data={orders} columns={orderColumns} />
    </div>
  );
}
