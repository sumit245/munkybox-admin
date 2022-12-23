import {
  GET_RESTAURANT,
  SET_MEALS,
  SET_RESTAURANT,
  EDIT_BASIC_INFO,
  EDIT_PAPERS,
  EDIT_MEALS,
} from "../utilities/constants";
import { restaurant } from "../models/model";
import axios from "axios";
const httpClient = axios.create();
httpClient.defaults.timeout = 90000;

export const createChef = () => async (dispatch) => {
  dispatch({ type: SET_RESTAURANT, payload: restaurant });
};
export const setMeals = (index) => async (dispatch) => {
  dispatch({ type: SET_MEALS, payload: restaurant.meals[index] });
};
export const getRestaurant = (id) => async (dispatch) => {
  const response = await httpClient.get("/api/newrest/" + id);
  const data = await response.data;
  dispatch({ type: SET_RESTAURANT, payload: data });
};
export const getAllRestaurant = () => async (dispatch) => {
  const response = await httpClient.get("/api/newrest/");
  const restaurant = await response.data;
  dispatch({ type: GET_RESTAURANT, payload: restaurant,});
};
export const editBasicInfo = (data) => {
  return { type: EDIT_BASIC_INFO, payload: data };
};
export const editDocuments = (docs, papers) => {
  return { type: EDIT_PAPERS, payload: { documents: docs, papers: papers } };
};
export const editMealsInfo = (data) => {
  return { type: EDIT_MEALS, payload: { meals: data } };
};

