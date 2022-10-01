import { EDIT_PLANS, GET_PLANS } from "../utilities/constants";
const initialState = {
  plans: [],
};
export default function planReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLANS:
      return {
        ...state,
        plans: action.payload,
      };
    case EDIT_PLANS:
      return {
        ...state,
        plans: action.payload,
      };
    default:
      return state;
  }
}
