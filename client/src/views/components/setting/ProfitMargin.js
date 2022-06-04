import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPlans, getPlans } from "../../../actions/planactions";
import Loading from "../../../utilities/Loading"

export default function ProfitMargin() {
  const [plans, setPlans] = useState({
    twoPlan: "",
    fifteenPlan: "",
    thirtyPlan: "",
  });
  const [loading, setLoading] = useState(false);
  const Plan = useSelector((state) => state.plans.plans);
  const dispatch = useDispatch();
  useEffect(() => {
    let componentDidMount = true;
    dispatch(getPlans());
    if (componentDidMount) {
      setPlans(Plan);
    }
    return () => {
      componentDidMount = false;
    };
  }, [dispatch,Plan]);
  const onChangeText = ({ target }) => {
    const { name, value } = target;
    setPlans((prevState) => ({ ...prevState, [name]: value }));
  };
  const done = async () => {
    setLoading(true);
    await dispatch(editPlans(plans));
    await dispatch(getPlans())
    setLoading(false);
  };

  return (
    !loading?(
    <div className="ibox-content">
      <div className="row mt-1">
        <div className="col-lg-12">
          <div className="form-group">
            <label>
              2 Days <strong className="text-danger">*</strong>
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
                defaultValue={Plan.twoPlan}
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
              15 Days <strong className="text-danger">*</strong>
            </label>
            <div className="input-group m-b">
              <div className="input-group-prepend">
                <span className="input-group-addon">$</span>
              </div>
              <input
                type="text"
                className="form-control"
                defaultValue={Plan.fifteenPlan}
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
              30 Days <strong className="text-danger">*</strong>
            </label>
            <div className="input-group m-b">
              <div className="input-group-prepend">
                <span className="input-group-addon">$</span>
              </div>
              <input
                type="text"
                className="form-control"
                defaultValue={Plan.thirtyPlan}
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
    ):
    <Loading/>
  );
}
