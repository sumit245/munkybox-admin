import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_PLANS } from "../../../../utilities/constants";
export default function EditPlans({ plan, restaurant, goToStep }) {
   
  const dispatch = useDispatch();
  const [price, setPrice] = useState({});
  let { base_2price, base_15price, base_30price } = restaurant;
  const { twoPlan, fifteenPlan, thirtyPlan } = plan;

  const handleContinue = (e) => {
    if (!base_2price) {
      alert("Base price for two meals required");
      return;
    }
    if (!base_15price) {
      alert("Base price for fifteen meals required");
      return;
    }
    if (!base_30price) {
      alert("Base price for thirty meals required");
      return;
    }
    dispatch({
      type: SET_PLANS,
      payload: price,
    });
    goToStep(5);
  };

  const handleBack = (e) => {
    goToStep(3);
  };

  const setCustomerPrice = (base2price, base15price, base30price) => {
    let twoPrice = parseFloat(base2price) + parseFloat(twoPlan);
    let fifteenPrice = parseFloat(base15price) + parseFloat(fifteenPlan);
    let thirtyPrice = parseFloat(base30price) + parseFloat(thirtyPlan);
    setPrice({
      base_2price,
      base_30price,
      base_15price,
      customer2price: twoPrice,
      customer15price: fifteenPrice,
      customer30price: thirtyPrice,
    });
  };

  useEffect(() => {
    let cleanMount = true;
    if (cleanMount) {
      setCustomerPrice(base_2price, base_15price, base_30price);
    }
    return () => {
      cleanMount = false;
    };
  }, [base_2price, base_15price, base_30price]);

  const onBasePriceChange = (event) => {
    const { name, value } = event.target;
    if (name === "base_2price") {
      let twoPrice = parseFloat(value) + parseFloat(twoPlan);
      setPrice({ ...price, customer2price: twoPrice, [name]: value });
    } else if (name === "base_15price") {
      let fifteenPrice = parseFloat(value) + parseFloat(fifteenPlan);
      setPrice({ ...price, customer15price: fifteenPrice, [name]: value });
    } else if (name === "base_30price") {
      let thirtyPrice = parseFloat(value) + parseFloat(thirtyPlan);
      setPrice({ ...price, customer30price: thirtyPrice, [name]: value });
    }
  };

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
              defaultValue={price.base_2price}
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
              defaultValue={price.customer2price}
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
              defaultValue={price.base_15price}
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
              defaultValue={price.customer15price}
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
              defaultValue={price.base_30price}
              onChange={(e) => onBasePriceChange(e)}
              // disabled
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
              defaultValue={price.customer30price}
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
