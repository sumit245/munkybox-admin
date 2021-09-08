import React from "react";
import OrdersChart from "../components/dashboard/OrdersChart";
import TopCards from "../components/dashboard/TopCards";

export default function Dashboard() {
    return (
        <div className="wrapper wrapper-content">
            <TopCards />
            <OrdersChart/>
      </div>
  )
}
