import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_PLANS } from "../../../../utilities/constants";
import { getPlans } from "../../../../actions/planactions"

export default function Plans(props) {
  const [plan, setPlan] = useState([]);
  const [inputPlan, setInputPlan] = useState([{
    plan_name: "",
    base_price: "",
    customer_price: "",
    delivery_price: ""
  }]);
  const [loaded, setLoaded] = useState(false)
  const restaurant = useSelector((state) => state.restaurant);
  const [isDelivery, setIsDelivery] = useState(false)
  const { plans } = useSelector((state) => state.plans)
  const dispatch = useDispatch();

  useEffect(() => {
    getPlansAndSet()
  }, [])

  const handleContinue = (e) => {
    console.log('====================================');
    console.log(inputPlan);
    console.log('====================================');
    // const plans = {
    //   ...restaurant,
    //   ...inputPlan,
    // };
    // dispatch({
    //   type: SET_PLANS,
    //   payload: plans,
    // });

    // props.goToStep(5);
  };

  const handleBack = (e) => {
    props.goToStep(3);
  };

  const onDeliveryChange = (event, index) => {
    const { name, value } = event.target
    let plans = inputPlan
    let currPlan = plans[index]
    currPlan.delivery_price = value
    setInputPlan((prevState) => ({ ...prevState, currPlan }))
  }

  const onBasePriceChange = (event, index) => {
    console.log('====================================');
    console.log(index);
    console.log('====================================');
    const { name, value } = event.target
    let plans = inputPlan
    let currPlan = plans[index]
    currPlan.base_price = value
    currPlan.customer_price = parseFloat(value) + parseFloat(inputPlan[index].customer_price)
    if (inputPlan[index].plan_name !== name) {
      setInputPlan((prevState) => ({ ...prevState, currPlan }))
    }
  }

  const getPlansAndSet = async () => {
    const plans = await dispatch(getPlans())
    setPlan(plans)
    let inputPlans = []
    let elements = Array.isArray(plans) && plans.length
    for (let index = 0; index < elements; index++) {
      let plan = {
        plan_name: plans[index].plan_name,
        base_price: 0,
        customer_price: plans[index].profit_margin,
        delivery_price: 0
      }
      inputPlans.push(plan)
    }
    setInputPlan(inputPlans)
    setLoaded(true)
  }

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
      {loaded &&
        inputPlan.map((data, key) => (
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
                    name={data.plan_name}
                    onChange={(e) => onBasePriceChange(e, key)}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <label>Customer price &nbsp;($)</label>
                  <input
                    className="form-control"
                    type="currency"
                    value={inputPlan[key].customer_price}
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
                    disabled={!isDelivery}
                    onChange={(e) => onDeliveryChange(e, key)}
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
