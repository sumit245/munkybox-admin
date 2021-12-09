import axios from "axios";
import {
  GET_USERS,
  SET_USERS,
} from "../utilities/constants";

export const getUsers = () => async (dispatch) => {
  const res = await axios.get("/api/users");
  const users = await res.data;
  dispatch({
    type: GET_USERS,
    payload: users,
  });
};
export const setUsers = () => async (dispatch) => {
  dispatch({
    type: SET_USERS,
  });
};
