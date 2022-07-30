import React, { useEffect, useState } from "react";
import "./styles.css";
export default function PayoutCollapsible({ data }) {
  const [order_amt, setOrderAmt] = useState(0);
  const [id, setID] = useState("");
  const [commission, setCommission] = useState(0);
  const [add_on_amt, setAddOnAmt] = useState(0);
  const [add_on_commission, setAddOnCommission] = useState(0);
  const [paid_amt, setPaid] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [admindiscount, setAdminDiscount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [bannerDue, setBannerDue] = useState(0);
  useEffect(() => {
    setID(data.restID);
    setOrderAmt(data.totalMerchAmt);
    setAddOnAmt(data.totalAddOnAmt);
    setCommission(data.commissionAmt);
    setAddOnCommission(data.totalAddOnCommissionAmt);
    setPaid(data.paidAmt);
    setBannerDue(data.totalBannerDue);
    setDiscount(data.totalDiscount);
    setAdminDiscount(data.totalAdminDiscount);
    setBalance(data.payable);
    setLoaded(true);
  }, [data]);
  if (loaded) {
    return (
      <div className="collapsible-container">
        <div className="row">
          <div className="col-sm-10">
            <div className="row">
              <div className="col-sm-6">
                <span className="collapsible-details">Total Order Amount:</span>
                <span>${parseFloat(order_amt).toFixed(2)}</span>
              </div>
              <div className="col-sm-6">
                <span className="collapsible-details">Commission:</span>
                <span>${parseFloat(commission).toFixed(2)}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <span className="collapsible-details">
                  Total Add on Amount:{" "}
                </span>
                <span>${parseFloat(add_on_amt).toFixed(2)}</span>
              </div>
              <div className="col-sm-6">
                <span className="collapsible-details">Add on Commission:</span>
                <span>${parseFloat(add_on_commission).toFixed(2)}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <span className="collapsible-details">Chef Discount:</span>
                <span>${parseFloat(discount || 0).toFixed(2)}</span>
              </div>
              <div className="col-sm-6">
                <span className="collapsible-details">Admin Discount:</span>
                <span>${parseFloat(admindiscount || 0).toFixed(2)}</span>
              </div>
              <div className="col-sm-6">
                <span className="collapsible-details">Banner Due:</span>
                <span>$ {parseFloat(bannerDue).toFixed(2)}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <span className="collapsible-details">Paid:</span>
                <span>${parseFloat(paid_amt || 0).toFixed(2)}</span>
              </div>
              <div className="col-sm-6">
                <span className="collapsible-details">Balance:</span>
                <span>
                  $
                  {parseFloat(
                    order_amt +
                      add_on_amt -
                      commission -
                      add_on_commission -
                      discount -
                      bannerDue
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <div className="col-sm-2">
            <a
              href={`/view_transaction/${id}`}
              className="btn btn-warning my-2"
            >
              View
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
