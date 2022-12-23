import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_PLANS } from "../../../../utilities/constants";
import { getPlans } from "../../../../actions/planactions";
export default function EditPlans({ plan, restaurant, goToStep }) {

  const dispatch = useDispatch();
  const [price, setPrice] = useState({});
  let { base_2price, base_15price, base_30price } = restaurant;
  const { twoPlan, fifteenPlan, thirtyPlan } = plan;
  const [isDelivery, setIsDelivery] = useState(false)
  const [plans, setPlans] = useState([])

  const getPlansAndSet = async () => {
    const plans = await dispatch(getPlans())
    console.log('====================================');
    console.log(plans);
    console.log('====================================');
    setPlans(plans)
  }

  useEffect(() => {
    getPlansAndSet()
  }, [])

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
      <div className="text-right">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value={isDelivery}
            onChange={() => setIsDelivery(!isDelivery)}
            id="flexCheckChecked"
            defaultChecked={isDelivery} />
          <label className="form-check-label" htmlFor="flexCheckChecked">
            Provide Delivery
          </label>
        </div>
      </div>
      {
        plans.map((data, key) => (
          <div className="form-group mt-1" key={key}>
            <label>
              <strong>{data.plan_name}</strong>
            </label>
            <div className="row" >
              <div className="col-lg-4">
                <div className="form-group">
                  <label>
                    Base price <strong className="text-danger">*</strong> &nbsp;($)
                  </label>
                  <input
                    className="form-control"
                    type="currency"
                    name="base_price"
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
                    name="customer_price"
                    disabled
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <label>Delivery Charges &nbsp;($)</label>
                  <input
                    className="form-control"
                    type="currency"
                    name="delivery_price"
                    onChange={(e) => onBasePriceChange(e)}
                    disabled={!isDelivery}
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      }

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
