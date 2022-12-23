import axios from "axios";
import { EDIT_PLANS, GET_PLANS } from "../utilities/constants";

export const getPlans = () => async (dispatch) => {
  const res = await axios.get("/api/plans/");
  const plans = await res.data;
  dispatch({ type: GET_PLANS, payload: plans});
  return plans;
};

export const editPlans = (plans) => async (dispatch) => {
  const res = await axios.put("/api/plans/6066360c920a2e311c95ee92/", { plans });
  const plan = await res.data;
  dispatch({ type: EDIT_PLANS, payload: plan });
};
