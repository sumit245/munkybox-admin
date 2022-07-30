import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

export default function Deposit() {
  const history = useHistory();
  const [state, setState] = useState({
    restID:"",
    chefBalance: 0,
    account_number: 0,
    bank_name: 0,
    branch_number: 0,
    institution_number: 0,
    payout_start_date: "",
    payout_end_date: "",
  });
  const [txnID, setTxnId] = useState("");
  const back = (e) => {
    e.stopPropagation();
    history.goBack();
  };
  const { location, query } = useLocation();
  useEffect(() => {
    let component = true;
    setState(query);
    console.log(query);
    return () => {
      component = false;
    };
  }, []);
  const {
    restID,
    chefBalance,
    due,
    account_number,
    payout_start_date,
    payout_end_date,
    bank_name,
    branch_number,
    institution_number,
  } = state;
  const deposit = async () => {
    const transaction = {
      restaurant_id: restID,
      paid_amount: chefBalance,
      txn_id: txnID,
      deposit_date: moment(),
      start_date: payout_start_date,
      end_date: payout_end_date,
      status: "Paid",
    };
    const response = await axios.post(
      "/api/admintochefpayments/deposit",
      transaction
    );
    const { status, data } = response;
    if (status === 200) {
      history.goBack();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        display: "flex",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1000,
        background: "rgba(0, 0, 0, 0.8)",
        overflowY: "hidden",
      }}
    >
      <div
        className="ibox"
        style={{
          position: "absolute",
          top: "10%",
          left: "35%",
          width: 400,
        }}
      >
        <div className="ibox-title">
          <h4>Net Banking Details</h4>
          <small>
            You have to pay{" "}
            <strong className="text-danger">${chefBalance}</strong>
          </small>
          <div className="ibox-tools">
            <a className="close-link" href="#" onClick={back}>
              <i className="fa fa-times" />
            </a>
          </div>
        </div>
        <div className="ibox-content no-padding">
          <div className="row px-4 py-4">
            <div className="col-md-12">
              <ul className="list-group clear-list">
                <li className="list-group-item fist-item" key="1">
                  <span className="float-right">{account_number}</span>
                  <span>Account No. </span>
                </li>
                <li className="list-group-item" key="2">
                  <span className="float-right">{bank_name}</span>
                  <span>Bank Name</span>
                </li>
                <li className="list-group-item" key="3">
                  <span className="float-right">{branch_number}</span>
                  <span>Branch #</span>
                </li>
                <li className="list-group-item" key="4">
                  <span className="float-right">{institution_number}</span>
                  <span>Instituion #</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="row mx-2 my-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Transaction ID"
                onChange={(e) => setTxnId(e.target.value)}
              />
              <span className="input-group-append">
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={deposit}
                >
                  Submit
                </button>{" "}
              </span>
            </div>
          </div>
          <div className="row my-2 mx-2 justify-content-end">
            <button
              type="button"
              className="btn btn-danger btn-outline mx-2 my-2"
              onClick={back}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
