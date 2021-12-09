import axios from "axios";
import { GET_ORDERS } from "../utilities/constants";

export const getOrders = () => async (dispatch) => {
  const res = await axios.get("/api/orders");
  const orders = await res.data;
  if (orders !== null) {
    dispatch({
      type: GET_ORDERS,
      payload: orders,
    });
  }
};