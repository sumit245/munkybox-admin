import React, { useEffect, useState } from "react";
import Table from "../../utilities/Table";
import axios from "axios";
import { orderColumns } from "../../utilities/utility";
import OrderCards from "../components/orders/OrderCards";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [rejected, setrejected] = useState(0);
  const [pending, setPending] = useState(0);
  const [started, setstarted] = useState(0);
  const [cancelled, setCancelled] = useState(0);
  
  const setOrderCounts = async () => {
    const response = await axios.get("/api/orders");
    const order = await response.data;
    setOrders(order);
    let accepted = order.filter((item) => item.status === "accepted");
    let rejectedorders = order.filter((item) => item.status === "rejected");
    let startedorders = order.filter((item) => item.status === "started");
    let cancelledorders = order.filter((item) => item.status === "cancelled");
    let completedorders = order.filter((item) => item.status === "completed");
    setstarted(startedorders.length);
    setPending(accepted.length);
    setrejected(rejectedorders.length);
    setCancelled(cancelledorders.length);
    setCompleted(completedorders.length)
  };

  useEffect(() => {
    setOrderCounts();
  }, []);

  return (
    <div className="wrapper wrapper-content">
      <OrderCards
        total={orders.length}
        completed={completed}
        started={started}
        pending={pending}
        rejected={rejected}
        cancelled={cancelled}
      />
      <Table title="Orders" data={orders} flag={true} columns={orderColumns} />
    </div>
  );
}
