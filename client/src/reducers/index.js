import { combineReducers } from "redux";
import userReducer from "./userReducer";
import RestaurantReducer from "./reducers";
import orderReducer from "./orderReducer";
import planReducer from "./plansreducer";
import requestReducer from "./RequestReducer";
export default combineReducers({
  users: userReducer,
  restaurant: RestaurantReducer,
  orders: orderReducer,
  plans: planReducer,
  requests:requestReducer
});
