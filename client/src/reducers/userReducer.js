import { GET_USERS } from "../utilities/constants";
const initialState = {
    users:[],
};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users:[...action.payload],
      };

    default:
      return state;
  }
}
