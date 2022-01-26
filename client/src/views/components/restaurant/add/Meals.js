import React, { useState } from "react";
import DynamicMeal from "./DynamicMeal";
import { Tabs, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SET_MEALS } from "../../../../utilities/constants";

export default function Meals(props) {
  const [key, setKey] = useState("Monday");
  const [meals, setMeals] = useState([]);
  const state = useSelector((state) => state.restaurant);
  const dispatch = useDispatch();
  const handleContinue = (e) => {
    if (meals.length < 1) {
      alert("Provide atleast one meal");
      return;
    }
    const data = {
      ...state,
      meals: [...meals],
    };
    dispatch({
      type: SET_MEALS,
      payload: data,
    });
    props.goToStep(4);
  };
  const handleBack = (e) => {
    e.preventDefault();
    props.goToStep(2);
  };
  const addMeal = (meal) => {
    setMeals([...meals, meal]);
  };
  return (
    <fieldset>
      <Tabs
        className="tabs-container mt-1"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="Monday" title="Monday">
          <DynamicMeal index={1} addMeal={addMeal} day="Monday" />
        </Tab>
        <Tab eventKey="Tuesday" title="Tuesday">
          <DynamicMeal index={2} addMeal={addMeal} day="Tuesday" />
        </Tab>
        <Tab eventKey="Wednesday" title="Wednesday">
          <DynamicMeal index={3} addMeal={addMeal} day="Wednesday" />
        </Tab>
        <Tab eventKey="Thursday" title="Thursday">
          <DynamicMeal index={4} addMeal={addMeal} day="Thursday" />
        </Tab>
        <Tab eventKey="Friday" title="Friday">
          <DynamicMeal index={5} addMeal={addMeal} day="Friday" />
        </Tab>
        <Tab eventKey="Saturday" title="Saturday">
          <DynamicMeal index={6} addMeal={addMeal} day="Saturday" />
        </Tab>
        <Tab eventKey="Sunday" title="Sunday">
          <DynamicMeal index={7} addMeal={addMeal} day="Sunday" />
        </Tab>
      </Tabs>

      <div className="col-lg-12 justify-content-end">
        <button
          type="button"
          className="btn btn-primary float-right mr-2 "
          onClick={handleContinue}
        >
          Next
        </button>
        <button
          type="button"
          className="btn btn-default float-right mr-2 "
          onClick={handleBack}
        >
          Previous
        </button>
      </div>
    </fieldset>
  );
}
