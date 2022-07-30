import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function CommissionTracking() {
  const [state, setState] = useState({
    totalBaseIncome: "",
    totalDiscount: "",
    numOrders: "",
    due: "",
    orders: [],
    totalAddOns: "",
    totalAddOnRevenue: "",
    payout_start_date: "",
    payout_end_date: "",
    _id: "",
  });
  const [loaded, setLoaded] = useState(false);
  const { query } = useLocation();
  const location = useLocation();
  useEffect(() => {
    setState(query);
    setLoaded(true);
  }, []);
  const {
    totalBaseIncome,
    totalDiscount,
    numOrders,
    due,
    orders,
    totalAddOns,
    totalAddOnRevenue,
    _id,
  } = state;

  if (loaded) {
    return (
      <div className="ibox">
        <div className="ibox-title">
          <h5>Commission Tracking</h5>
          <div className="ibox-tools">
            <a className="close-link" href={"/view_transaction/" + _id}>
              <i className="fa fa-times" />
            </a>
          </div>
        </div>
        <div className="ibox-content center">
          <div className="feed-activity-list">
            <div className="feed-element">
              <div className="float-left">
                <h4># of orders: </h4>
              </div>
              <div className="float-right">
                <h4>{numOrders}</h4>
              </div>
            </div>
            <div className="feed-element">
              <div className="float-left">
                <h4 className="text-bold"># of Add-ons: </h4>
              </div>
              <div className="float-right">
                <h4 className="text-bold float-right">{totalAddOns}</h4>
              </div>
            </div>
            <div className="feed-element">
              <div className="float-left">
                <h4 className="text-bold">Total Base Order Amt: </h4>
              </div>
              <div className="float-right">
                <h4 className="text-bold float-right">
                  ${parseFloat(totalBaseIncome).toFixed(2)}
                </h4>
              </div>
            </div>
            <div className="feed-element">
              <div className="float-left">
                <h4 className="text-bold">Total Base Order Commission: </h4>
              </div>
              <div className="float-right">
                <h4 className="text-danger float-right">
                  -${parseFloat(totalBaseIncome * 0.1).toFixed(2)}
                </h4>
              </div>
            </div>
            <div className="feed-element">
              <div className="float-left">
                <h4 className="text-bold">Total Add-ons Amount: </h4>
              </div>
              <div className="float-right">
                <h4 className="text-bold float-right">
                  ${parseFloat(totalAddOnRevenue).toFixed(2)}
                </h4>
              </div>
            </div>
            <div className="feed-element">
              <div className="float-left">
                <h4 className="text-bold">Total Add-ons Commission: </h4>
              </div>
              <div className="float-right">
                <h4 className="text-danger float-right">
                  - ${parseFloat(totalAddOnRevenue * 0.1).toFixed(2)}
                </h4>
              </div>
            </div>
            <div className="feed-element">
              <div className="float-left">
                <h4 className="text-bold">Total Discount: </h4>
              </div>
              <div className="float-right">
                <h4 className="text-danger float-right">
                  - ${parseFloat(totalDiscount).toFixed(2)}
                </h4>
              </div>
            </div>
            <div className="feed-element">
              <div className="float-left">
                <h4 className="text-bold">Total Campaign Due: </h4>
              </div>
              <div className="float-right">
                <h4 className="text-danger float-right">
                  - ${parseFloat(due).toFixed(2)}
                </h4>
              </div>
            </div>
            <div className="feed-element">
              <div className="float-left">
                <h4 className="text-bold">Total Admin Commission: </h4>
              </div>
              <div className="float-right form-inline align-items-center">
                <h4 className="float-right mx-1 align-items-center text-info">
                  -$
                  {parseFloat(
                    (totalAddOnRevenue + totalBaseIncome) * 0.1
                  ).toFixed(2)}
                </h4>
                <Link
                  className="text-primary"
                  to={{
                    pathname: `/commission_history`,
                    query: { query },
                  }}
                >
                  <i className="fa fa-history" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
