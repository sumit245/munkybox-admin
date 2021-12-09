import { GET_REQUESTS } from "../utilities/constants";
import { requests } from "../models/model";
export default function requestReducer(state = requests, { type, payload }) {
  switch (type) {
    case GET_REQUESTS:
      return { ...state, ...payload };
    default:
      return { ...state };
  }
}
