import axios from "axios";
import { GET_REQUESTS } from "../utilities/constants";

export const getRequests = () => async (dispatch) => {
  const response = await axios.get("/api/partnerrequest/");
  const requests = await response.data.data;
  dispatch({
    type: GET_REQUESTS,
    payload: requests,
  });
};
