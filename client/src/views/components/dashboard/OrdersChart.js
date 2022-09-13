import axios from "axios";
import React, { useState, useEffect } from "react";

export default function OrdersChart() {
  const [mealrevenue, setMealRevenue] = useState(0);
  const [totalServiceFee, setTotalServiceFee] = useState(0);
  const [totalDeliveryCharges, setTotalDeliveryCharges] = useState(0);
  const [totalTips, setTotalTips] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [admindiscounts, setAdminDiscounts] = useState(0);
  const [totalrevenue, setTotalRevenue] = useState(0);
  const [pendingorders, setPendingOrders] = useState(0);
  const [acceptedorders, setAcceptedOrders] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [rejectedorders, setRejectedOrders] = useState(0);
  const [totalorders, setTotalOrders] = useState(0);
  const [baserevenue, setBaseRevenue] = useState(0);
  const [add_on_total, setAddOnTotal] = useState(0);
  const [chefcommission, setChefCommission] = useState(0);

  const getDashboardData = async () => {
    const revenue = await axios.get("/api/calculations/revenue/");
    const orders = await axios.get("/api/calculations/orders");
    const {
      mealrevenue,
      totaldelivery,
      totalservicefee,
      tips,
      baserevenue,
      base_commission,
      taxes,
      discount,
      totalrevenue,
      add_on_total,
      add_on_commission,
    } = revenue.data;
    setMealRevenue(mealrevenue);
    setTotalDeliveryCharges(totaldelivery);
    setTotalServiceFee(totalservicefee);
    setTotalTips(tips);
    setTotalTax(taxes);
    setAdminDiscounts(discount);
    setTotalRevenue(totalrevenue);
    setBaseRevenue(baserevenue);
    let chefcommission =
      parseFloat(base_commission) + parseFloat(add_on_commission);
    setChefCommission(chefcommission);
    setAddOnTotal(add_on_total);

    const {
      totalorders,
      pendingorders,
      acceptedorders,
      runningorders,
      completedorders,
      rejectedorders,
    } = orders.data;
    setRejectedOrders(rejectedorders);
    setAcceptedOrders(acceptedorders);
    setInProgress(runningorders);
    setPendingOrders(pendingorders);
    setCompleted(completedorders);
    setTotalOrders(totalorders);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getDashboardData();
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-lg-6">
          <div className="ibox">
            <div className="ibox-title">
              <h5>Order Statistics</h5>
            </div>
            <div className="ibox-content">
              <div className="row justify-content-between mb-1">
                <div className="card col-4 bg-primary">
                  <div className="card-body">
                    <h5 className="text-white">Total Orders</h5>
                    <h1 className="no-margins">{totalorders}</h1>
                  </div>
                </div>
                <div className="card col-4 bg-warning">
                  <div className="card-body">
                    <h5 className="text-white">Pending</h5>
                    <h1 className="no-margins">{pendingorders}</h1>
                  </div>
                </div>
                <div className="card col-4 bg-info">
                  <div className="card-body">
                    <h5 className="text-white">In Progress</h5>
                    <h1 className="no-margins">{inProgress}</h1>
                  </div>
                </div>
              </div>
              <div className="row justify-content-between mb-1">
                <div className="card col-4 bg-success">
                  <div className="card-body">
                    <h5 className="text-white">Completed</h5>
                    <h1 className="no-margins">{completed}</h1>
                  </div>
                </div>
                <div className="card col-4 bg-danger">
                  <div className="card-body">
                    <h5 className="text-white">Rejected</h5>
                    <h1 className="no-margins">{rejectedorders}</h1>
                  </div>
                </div>
                <div className="card col-4 bg-secondary">
                  <div className="card-body">
                    <h5 className="text-white">Accepted</h5>
                    <h1 className="no-margins text-white">{acceptedorders}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="ibox">
            <div className="ibox-title">
              <h5 className="d-inline">Total Order Revenue</h5>
              <h5 className="d-inline text-bold text-black">
                {" "}
                ${totalrevenue}
              </h5>
              <div className="ibox-tools">
                <small>TR = CP+SF+DF+Tips+Taxes-AD</small>
              </div>
            </div>
            <div className="ibox-content">
              <div className="row justify-content-between mb-1">
                <div className="card col-4 bg-primary p-2">
                  <div className="card-body">
                    <h5 className="text-white">Meal Plan</h5>
                    <h3 className="no-margins">
                      ${parseFloat(mealrevenue).toFixed(2)}
                    </h3>
                  </div>
                </div>
                <div className="card col-4 bg-warning p-2">
                  <div className="card-body">
                    <h5 className="text-white">Service Charges</h5>
                    <h3 className="no-margins">
                      ${parseFloat(totalServiceFee).toFixed(2)}
                    </h3>
                  </div>
                </div>
                <div className="card col-lg-4 bg-info p-2">
                  <div className="card-body">
                    <h5 className="text-white">Delivery Charges</h5>
                    <h3 className="no-margins">
                      ${parseFloat(totalDeliveryCharges).toFixed(2)}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="row justify-content-between mb-1">
                <div className="card col-4 bg-success p-2">
                  <div className="card-body">
                    <h5 className="text-white">Tip</h5>
                    <h3 className="no-margins">
                      ${parseFloat(totalTips).toFixed(2)}
                    </h3>
                  </div>
                </div>
                <div className="card col-4 bg-danger p-2">
                  <div className="card-body">
                    <h5 className="text-white">Taxes</h5>
                    <h3 className="no-margins">
                      ${parseFloat(totalTax).toFixed(2)}
                    </h3>
                  </div>
                </div>
                <div className="card col-4 bg-secondary p-2">
                  <div className="card-body">
                    <h5 className="text-white">Admin Discount</h5>
                    <h3 className="no-margins text-white">
                      ${parseFloat(admindiscounts).toFixed(2)}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="ibox">
            <div className="ibox-title">
              <h5>
                Commission Revenue ${parseFloat(chefcommission).toFixed(2)}
              </h5>
            </div>
            <div className="ibox-content">
              <div className="row justify-content-between mt-1">
                <div className="card col-lg-6 bg-success">
                  <div className="card-body">
                    <h5 className="text-white">Base Price</h5>
                    <h1 className="no-margins">${baserevenue}</h1>
                  </div>
                </div>

                <div className="card col-lg-6 bg-danger">
                  <div className="card-body">
                    <h5 className="text-white">Add Ons</h5>
                    <h1 className="no-margins">${add_on_total}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="ibox">
            <div className="ibox-title">
              <h5>Campaign Revenue($)</h5>
            </div>
            <div className="ibox-content">
              <div className="row justify-content-between mt-1">
                <div className="card col-lg-12 bg-success">
                  <div className="card-body">
                    <h5 className="text-white">Banner Marketing</h5>
                    <h1 className="no-margins">$0</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mx-1">
        <div className="ibox col-12">
          <div className="ibox-title">
            <h5>Feasti Revenue ${parseFloat(baserevenue * 0.1).toFixed(2)}</h5>
          </div>
          <div className="ibox-content">
            <div className="row justify-content-between mt-1">
              <div className="card bg-success">
                <div className="card-body">
                  <h5 className="text-white">Net Income</h5>
                  <h1 className="no-margins">
                    $
                    {parseFloat(
                      mealrevenue -
                        baserevenue +
                        0.1 * baserevenue +
                        totalDeliveryCharges +
                        totalServiceFee +
                        totalTax +
                        totalTips -
                        admindiscounts
                    ).toFixed(2)}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
