import {
  BASIC_INFO,
  GET_RESTAURANT,
  SET_BANK_INFO,
  SET_DOCUMENTS,
  SET_MEALS,
  SET_PLANS,
  SET_RESTAURANT,
  EDIT_BASIC_INFO,
  EDIT_PAPERS,
  EDIT_MEALS,
} from "../utilities/constants";
import { restaurant } from "../models/model";

export default function RestaurantReducer(
  state = restaurant,
  { type, payload }
) {
  switch (type) {
    case BASIC_INFO:
      return { ...state, ...payload };
    case EDIT_BASIC_INFO:
      return { ...state, ...payload };
    case EDIT_PAPERS:
      return { ...state, ...payload };
    case EDIT_MEALS:
      return { ...state, ...payload };
    case SET_DOCUMENTS:
      return { ...state, ...payload };
    case SET_MEALS:
      return { ...state, ...payload };
    case SET_PLANS:
      return { ...state, ...payload };
    case SET_BANK_INFO:
      return { ...state, ...payload };
    case SET_RESTAURANT:
      return { ...state, ...payload };
    case GET_RESTAURANT:
      return { ...state, ...payload };
    default:
      return state;
  }
}
