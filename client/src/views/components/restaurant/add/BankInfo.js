import React, { useState } from "react";
import { SET_BANK_INFO } from "../../../../utilities/constants";
import { useSelector, useDispatch } from "react-redux";

export default function BankInfo(props) {
  const [bankInfo, setBankInfo] = useState({});
  const state = useSelector((state) => state.restaurant);
  const dispatch = useDispatch();
  const done = (e) => {
    if (!bankInfo.account_name) {
      alert("Please provide a beneficiary");
      return;
    }
    if (!bankInfo.account_number) {
      alert("Please provide an account number");
      return;
    }
    if (!bankInfo.confirm_account_number) {
      alert("Confirm account doesnot match!!!");
      return;
    }
    if (!bankInfo.bank_name) {
      alert("Bank name is missing");
      return;
    }
    if (!bankInfo.branch_number) {
      alert("Branch is required");
      return;
    }
    if (!bankInfo.institution_number) {
      alert("Institution number required");
      return;
    }
    const data = {
      ...state,
      ...bankInfo,
    };
    dispatch({
      type: SET_BANK_INFO,
      payload: data,
    });
  };
  const handleBack = (e) => {
    e.preventDefault();
    props.goToStep(4);
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setBankInfo((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <fieldset>
      <div className="row mt-1">
        <div className="col-lg-12 justify-content-end">
          <button
            type="button"
            className="btn btn-primary float-right mr-2 "
            onClick={done}
          >
            Done
          </button>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-lg-4">
          <div className="form-group">
            <label>
              ACCOUNT NAME <strong className="text-danger">*</strong>
            </label>
            <input
              name="account_name"
              type="text"
              className="form-control required"
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label>
              ACCOUNT NUMBER <strong className="text-danger">*</strong>
            </label>
            <input
              name="account_number"
              type="text"
              className="form-control required"
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label>
              CONFIRM ACCOUNT NUMBER <strong className="text-danger">*</strong>
            </label>
            <input
              name="confirm_account_number"
              type="text"
              className="form-control required"
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-4">
          <div className="form-group">
            <label>
              BANK NAME <strong className="text-danger">*</strong>
            </label>
            <input
              name="bank_name"
              type="text"
              className="form-control required"
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label>
              BRANCH # <strong className="text-danger">*</strong>
            </label>
            <input
              name="branch_number"
              type="text"
              className="form-control required"
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label>
              INSTITUTION # <strong className="text-danger">*</strong>
            </label>
            <input
              name="institution_number"
              type="text"
              className="form-control required"
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 justify-content-end">
          <button type="submit" className="btn btn-primary float-right mr-2">
            Finish
          </button>
          <button
            type="button"
            className="btn btn-default float-right mr-2 "
            onClick={handleBack}
          >
            Previous
          </button>
        </div>
      </div>
    </fieldset>
  );
}
