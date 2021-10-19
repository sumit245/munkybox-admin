import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../../../actions/orderAction";

export default function OrdersChart() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  return (
    <>
      <div className="row">
        <div className="col-lg-6">
          <div className="ibox">
            <div className="ibox-title">
              <h5>Order Statistics</h5>
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
              <div className="row justify-content-between mb-1">
                <div className="card col-lg-6 bg-primary">
                  <div className="card-body">
                    <h5 className="text-white">Total Orders</h5>
                    <h1 className="no-margins">{orders && orders.length}</h1>
                  </div>
                </div>

                <div className="card col-lg-6 bg-warning">
                  <h5 className="text-white">In Progress</h5>
                  <h1 className="no-margins">0</h1>
                </div>
              </div>
              <div className="row justify-content-between mt-1">
                <div className="card col-lg-6 bg-success">
                  <div className="card-body">
                    <h5 className="text-white">Completed</h5>
                    <h1 className="no-margins">0</h1>
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
              <div className="row justify-content-between mb-1">
                <div className="card col-lg-4 bg-primary">
                  <div className="card-body">
                    <h5 className="text-white">Meal Plan</h5>
                    <h1 className="no-margins">$0</h1>
                  </div>
                </div>

                <div className="card col-lg-4 bg-warning">
                  <div className="card-body">
                    <h5 className="text-white">Service Charges</h5>
                    <h1 className="no-margins">$0</h1>
                  </div>
                </div>
                <div className="card col-lg-4 bg-info">
                  <div className="card-body">
                    <h5 className="text-white">Delivery Charges</h5>
                    <h1 className="no-margins">$0</h1>
                  </div>
                </div>
              </div>
              <div className="row justify-content-between mt-1">
                <div className="card col-lg-6 bg-success">
                  <div className="card-body">
                    <h5 className="text-white">Tip</h5>
                    <h1 className="no-margins">$0</h1>
                  </div>
                </div>

                <div className="card col-lg-6 bg-danger">
                  <div className="card-body">
                    <h5 className="text-white">Taxes</h5>
                    <h1 className="no-margins">$0</h1>
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
