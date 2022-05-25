import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../../../actions/orderAction";

export default function OrdersChart() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const [inProgress, setInProgress] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [totalCustomerPrice, setTotalCustomerPrice] = useState(0);
  const [totalServiceFee, setTotalServiceFee] = useState(0);
  const [totalDeliveryCharges, setTotalDeliveryCharges] = useState(0);
  const [totalTips, setTotalTips] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const calculateOrders = async () => {
    function add(accumulator, a) {
      return parseFloat(accumulator) + parseFloat(a);
    }
    if (Array.isArray(orders)) {
      let startedOrders = await orders.filter(
        (item) => item.status === "started"
      );
      let completedOrders = await orders.filter(
        (item) => item.status === "completed"
      );
      let totalPrices = await orders.map((item) => item.total);
      let totalDelivery = await orders.map((item) => item.delivery_fee);
      let tips = await orders.map((item) => item.tip);
      let totalService = await orders.map((item) => (item.service_fee * 0.01 * item.price));
      let taxes = await orders.map(item => (
        (parseFloat(item.price) +
          parseFloat(item.service_fee * 0.01 * item.price) +
          parseFloat(item.delivery_fee) -
          parseFloat(item.discount) +
          parseFloat(item.tip)) *
        (0.01 *
          item.taxes)
      ))
      let price = totalPrices.reduce(add, 0);
      let servicefees = totalService.reduce(add, 0);
      let delivery = totalDelivery.reduce(add, 0);
      let tax = taxes.reduce(add, 0);
      let tip = tips.reduce(add, 0);
      
      setInProgress(startedOrders.length);
      setCompleted(completedOrders.length);
      setTotalCustomerPrice(price);
      setTotalServiceFee(servicefees);
      setTotalDeliveryCharges(delivery);
      setTotalTax(tax);
      setTotalTips(tip);
    }
  };
  useEffect(() => {
    dispatch(getOrders());
    calculateOrders();
  }, [dispatch, orders]);
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
                <div className="card col-lg-6 bg-primary">
                  <div className="card-body">
                    <h5 className="text-white">Total Orders</h5>
                    <h1 className="no-margins">{orders && orders.length}</h1>
                  </div>
                </div>

                <div className="card col-lg-6 bg-warning">
                  <h5 className="text-white">In Progress</h5>
                  <h1 className="no-margins">{inProgress}</h1>
                </div>
              </div>
              <div className="row justify-content-between mt-1">
                <div className="card col-lg-6 bg-success">
                  <div className="card-body">
                    <h5 className="text-white">Completed</h5>
                    <h1 className="no-margins">{completed}</h1>
                  </div>
                </div>

                <div className="card col-lg-6 bg-danger">
                  <h5 className="text-white">Cancelled</h5>
                  <h1 className="no-margins">0</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="ibox">
            <div className="ibox-title">
              <h5>Total Revenue($)</h5>
            </div>
            <div className="ibox-content">
              <div className="row justify-content-between mb-1">
                <div className="card col-lg-4 bg-primary">
                  <div className="card-body">
                    <h5 className="text-white">Meal Plan</h5>
                    <h3 className="no-margins">
                      ${parseFloat(totalCustomerPrice).toFixed(2)}
                    </h3>
                  </div>
                </div>

                <div className="card col-lg-4 bg-warning">
                  <div className="card-body">
                    <h5 className="text-white">Service Charges</h5>
                    <h3 className="no-margins">
                      ${parseFloat(totalServiceFee).toFixed(2)}
                    </h3>
                  </div>
                </div>
                <div className="card col-lg-4 bg-info">
                  <div className="card-body">
                    <h5 className="text-white">Delivery Charges</h5>
                    <h3 className="no-margins">
                      ${parseFloat(totalDeliveryCharges).toFixed(2)}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="row justify-content-between mt-1">
                <div className="card col-lg-6 bg-success">
                  <div className="card-body">
                    <h5 className="text-white">Tip</h5>
                    <h3 className="no-margins">
                      ${parseFloat(totalTips).toFixed(2)}
                    </h3>
                  </div>
                </div>

                <div className="card col-lg-6 bg-danger">
                  <div className="card-body">
                    <h5 className="text-white">Taxes</h5>
                    <h3 className="no-margins">
                      ${parseFloat(totalTax).toFixed(2)}
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
              <h5>Commission Revenue($)</h5>
              <div className="float-right">
                <div className="btn-group">
                  <button type="button" className="btn btn-xs btn-white active">
                    Today
                  </button>
                  <button type="button" className="btn btn-xs btn-white">
                    Monthly
                  </button>
                  <button type="button" className="btn btn-xs btn-white">
                    Annual
                  </button>
                </div>
              </div>
            </div>
            <div className="ibox-content">
              <div className="row justify-content-between mt-1">
                <div className="card col-lg-6 bg-success">
                  <div className="card-body">
                    <h5 className="text-white">Base Price</h5>
                    <h1 className="no-margins">$0</h1>
                  </div>
                </div>

                <div className="card col-lg-6 bg-danger">
                  <div className="card-body">
                    <h5 className="text-white">Add Ons</h5>
                    <h1 className="no-margins">$0</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="ibox">
            <div className="ibox-title">
              <h5>Marketing Revenue($)</h5>
              <div className="float-right">
                <div className="btn-group">
                  <button type="button" className="btn btn-xs btn-white active">
                    Today
                  </button>
                  <button type="button" className="btn btn-xs btn-white">
                    Monthly
                  </button>
                  <button type="button" className="btn btn-xs btn-white">
                    Annual
                  </button>
                </div>
              </div>
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
    </>
  );
}
