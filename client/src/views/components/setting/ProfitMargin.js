import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPlans, getPlans } from "../../../actions/planactions";
import Loading from "../../../utilities/Loading";

export default function ProfitMargin() {
  const [plan, setPlan] = useState({
    singlePlan: "",
    twoPlan: "",
    sevenPlan: "",
    fifteenPlan: "",
    thirtyPlan: "",
  });
  const [loading, setLoading] = useState(false);
  const { plans } = useSelector((state) => state.plans);
  const dispatch = useDispatch();

  useEffect(() => {
    let componentDidMount = true;
    dispatch(getPlans());
    if (componentDidMount) {
      setPlan(plans);
    }
    return () => {
      componentDidMount = false;
    };
  }, []);

  const onChangeText = ({ target }) => {
    const { name, value } = target;
    setPlan((prevState) => ({ ...prevState, [name]: value }));
  };
  const done = async () => {
    setLoading(true);
    await dispatch(editPlans(plan))
    dispatch(getPlans());
    setLoading(false);
  };

  return !loading ? (
    <div className="ibox-content">
      <div className="row mt-1">
        <div className="col-lg-12">
          <div className="form-group">
            <label>
              1 Meal <strong className="text-danger">*</strong>
            </label>
            <div className="input-group m-b">
              <div className="input-group-prepend">
                <span className="input-group-addon">$</span>
              </div>
              <input
                type="text"
                className="form-control"
                name="singlePlan"
                onChange={(e) => onChangeText(e)}
                defaultValue={plans.singlePlan}
              />
              <div className="input-group-append">
                <span className="input-group-addon">.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-1">
        <div className="col-lg-12">
          <div className="form-group">
            <label>
              2 Meals <strong className="text-danger">*</strong>
            </label>
            <div className="input-group m-b">
              <div className="input-group-prepend">
                <span className="input-group-addon">$</span>
              </div>
              <input
                type="text"
                className="form-control"
                name="twoPlan"
                onChange={(e) => onChangeText(e)}
                defaultValue={plans.twoPlan}
              />
              <div className="input-group-append">
                <span className="input-group-addon">.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-1">
        <div className="col-lg-12">
          <div className="form-group">
            <label>
              7 Meals <strong className="text-danger">*</strong>
            </label>
            <div className="input-group m-b">
              <div className="input-group-prepend">
                <span className="input-group-addon">$</span>
              </div>
              <input
                type="text"
                className="form-control"
                defaultValue={plans.sevenPlan}
                name="sevenPlan"
                onChange={(e) => onChangeText(e)}
              />
              <div className="input-group-append">
                <span className="input-group-addon">.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-1">
        <div className="col-lg-12">
          <div className="form-group">
            <label>
              15 Meals <strong className="text-danger">*</strong>
            </label>
            <div className="input-group m-b">
              <div className="input-group-prepend">
                <span className="input-group-addon">$</span>
              </div>
              <input
                type="text"
                className="form-control"
                defaultValue={plans.fifteenPlan}
                name="fifteenPlan"
                onChange={(e) => onChangeText(e)}
              />
              <div className="input-group-append">
                <span className="input-group-addon">.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-1">
        <div className="col-lg-12">
          <div className="form-group">
            <label>
              30 Meals <strong className="text-danger">*</strong>
            </label>
            <div className="input-group m-b">
              <div className="input-group-prepend">
                <span className="input-group-addon">$</span>
              </div>
              <input
                type="text"
                className="form-control"
                defaultValue={plans.thirtyPlan}
                name="thirtyPlan"
                onChange={(e) => onChangeText(e)}
              />
              <div className="input-group-append">
                <span className="input-group-addon">.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 justify-content-end">
          <button
            type="button"
            className="btn btn-primary float-right mr-2"
            onClick={done}
          >
            Update
          </button>
          <button type="button" className="btn btn-default float-right mr-2 ">
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
