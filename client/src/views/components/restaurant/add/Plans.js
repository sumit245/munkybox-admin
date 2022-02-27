import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASIC_INFO, SET_PLANS } from "../../../../utilities/constants";
export default function Plans(props) {
  const [plan, setPlan] = useState({});
  const [customer2price, setCustomer2Price] = useState("");
  const [customer15price, setCustomer15Price] = useState("");
  const [customer30price, setCustomer30Price] = useState("");
  const [inputPlan, setInputPlan] = useState({});
  const restaurant = useSelector((state) => state.restaurant);
  const dispatch = useDispatch();
  const handleContinue = (e) => {
    if (!customer2price) {
      alert("Base price for two meals required");
      return;
    }
    if (!customer15price) {
      alert("Base price for fifteen meals required");
      return;
    }
    if (!customer30price) {
      alert("Base price for thirty meals required");
      return;
    }
    const plans = {
      ...restaurant,
      ...inputPlan,
    };
    dispatch({
      type: SET_PLANS,
      payload: plans,
    });

    props.goToStep(5);
  };
  const handleBack = (e) => {
    props.goToStep(3);
  };
  const onBasePriceChange = (event) => {
    const { name, value } = event.target;
    const { twoPlan, fifteenPlan, thirtyPlan } = plan;
    setInputPlan((prevState) => ({ ...prevState, [name]: value }));
    name === "base_2price"
      ? setCustomer2Price(parseFloat(value) + parseFloat(twoPlan))
      : name === "base_15price"
      ? setCustomer15Price(parseFloat(value) + parseFloat(fifteenPlan))
      : setCustomer30Price(parseFloat(value) + parseFloat(thirtyPlan));
  };
  useEffect(() => {
    let componentMounted = true;
    async function fetchData() {
      const response = await axios.get("/api/plans/6066360c920a2e311c95ee92");
      const plan = await response.data;
      if (componentMounted) {
        setPlan(plan);
      }
    }
    fetchData();
    return () => {
      componentMounted = false;
    };
  });
  return (
    <fieldset>
      <p className="mt-2">
        <strong>2 Days</strong>
      </p>
      <div className="row">
        <div className="col-lg-4">
          <div className="form-group">
            <label>
              Base price <strong className="text-danger">*</strong> &nbsp;($)
            </label>
            <input
              className="form-control"
              type="currency"
              name="base_2price"
              onChange={(e) => onBasePriceChange(e)}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label>Customer price &nbsp;($)</label>
            <input
              className="form-control"
              type="currency"
              name="customer2price"
              defaultValue={customer2price}
              disabled
            />
          </div>
        </div>
      </div>
      <p>
        <strong>15 days</strong>
      </p>
      <div className="row">
        <div className="col-lg-4">
          <div className="form-group">
            <label>
              Base price <strong className="text-danger">*</strong> &nbsp;($)
            </label>
            <input
              className="form-control"
              type="currency"
              name="base_15price"
              onChange={(e) => onBasePriceChange(e)}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label>Customer price &nbsp;($)</label>
            <input
              className="form-control"
              type="currency"
              name="customer15price"
              defaultValue={customer15price}
              disabled
            />
          </div>
        </div>
      </div>
      <p>
        <strong>30 Days</strong>
      </p>
      <div className="row">
        <div className="col-lg-4">
          <div className="form-group">
            <label>
              Base price <strong className="text-danger">*</strong> &nbsp;($)
            </label>
            <input
              className="form-control"
              type="currency"
              name="base_30price"
              onChange={(e) => onBasePriceChange(e)}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label>Customer price &nbsp;($)</label>
            <input
              className="form-control"
              type="currency"
              name="customer30price"
              defaultValue={customer30price}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 justify-content-end">
          <button
            type="button"
            className="btn btn-primary float-right mr-2 "
            onClick={handleContinue}
          >
            Next
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
