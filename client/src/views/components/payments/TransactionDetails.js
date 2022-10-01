import React, { useEffect, useState } from "react";
import TransactionTable from "./TransactionTable";
import { transactionColumns } from "../../../utilities/utility";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export default function TransactionDetails() {
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
  });
  const [_id, setID] = useState("");
  const [payouts, setPayouts] = useState([]);
  const { id } = useParams();
  const fetchChefPayouts = async (id) => {
    const response = await axios.get(
      "/api/admintochefpayments/getchefpayout/" + id
    );
    const { data } = response;
    setState(data);
    console.log(data);
    setID(id);
  };
  const pastPayments = async (id) => {
    const response = await axios.get(
      "/api/admintochefpayments/getpastpayout/" + id
    );
    const { data } = response;
    setPayouts(data);
    setID(id);
  };
  useEffect(() => {
    let component = true;
    fetchChefPayouts(id);
    pastPayments(id);
    return () => {
      component = false;
    };
  }, [id]);
  const location = useLocation();
  const {
    totalBaseIncome,
    totalDiscount,
    numOrders,
    due,
    totalAddOns,
    totalAddOnRevenue,
    payout_start_date,
    payout_end_date,
  } = state;

  return (
    <>
      <div className="ibox my-2">
        <div className="ibox-title py-2">
          <h5>Current Payout</h5>
          <div className="ibox-tool float-right">
            <Link
              className="btn btn-sm btn-warning"
              to={{
                pathname: `/commission_tracking/`,
                query: { ...state, _id },
                state: { background: location },
              }}
            >
              View
            </Link>
          </div>
        </div>
        <div className="ibox-content">
          <div className="form-inline">
            <h5 className="mr-1">Current week activity </h5>
            <span className="mx-1">
              {moment(payout_start_date).format("Do MMM")}
            </span>{" "}
            -
            <span className="mx-1">
              {" "}
              {moment(payout_end_date).format("Do MMM")}
            </span>
          </div>
          <div className="row">
            <div className="col-sm-4 border-right">
              <h5>Net Earning</h5>
              <span>
                $
                {parseFloat(
                  parseFloat(totalBaseIncome) + parseFloat(totalAddOnRevenue)
                ) -
                  parseFloat(due) -
                  parseFloat(totalDiscount) -
                  parseFloat(
                    parseFloat(totalBaseIncome) + parseFloat(totalAddOnRevenue)
                  ).toFixed(2) *
                    0.1}
              </span>
            </div>
            <div className="col-sm-4 border-right">
              <div className="form-inline">
                <h5 className="mr-5">Orders</h5>
                <h5 className="ml-3">Add-Ons</h5>
              </div>
              <div className="form-inline">
                <span className="mr-5">{numOrders}</span>
                <span className="ml-5">{totalAddOns}</span>
              </div>
            </div>
            <div className="col-sm-4">
              <h5>Next Payment</h5>
              <span>
                {moment(payout_end_date).add(2, "days").format("Do MMM")}
              </span>
            </div>
          </div>
        </div>
      </div>
      <TransactionTable
        title="Transactions"
        data={payouts}
        columns={transactionColumns}
        flag={true}
        id={_id}
      />
    </>
  );
}
