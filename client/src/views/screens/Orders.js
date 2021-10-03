import React, { useEffect, useState } from "react";
import Table from "../../utilities/Table";
import axios from "axios";
import { orderColumns,ORDER } from "../../utilities/utility";
import OrderCards from "../components/orders/OrderCards";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get("https://munkybox-admin.herokuapp.com/api/orders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="wrapper wrapper-content">
      <OrderCards />
      <Table title="Orders" data={orders} columns={orderColumns} />
    </div>
  );
}
