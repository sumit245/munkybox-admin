import React, { useState } from "react";
import StepWizard from "react-step-wizard";
import BankInfo from "./BankInfo";
import BasicInfo from "./BasicInfo";
import Documents from "./Documents";
import Meals from "./Meals";
import Plans from "./Plans";
import RestaurantTabNav from "../RestaurantTabNav";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { BASIC_INFO } from "../../../../utilities/constants";
import Loading from "../../../../utilities/Loading";

export default function AddRestaurant(props) {
  const restaurant = useSelector((state) => state.restaurant);
  const [loaded, setLoaded] = useState(true);

  const dispatch = useDispatch();
  const onRadioSelected = (e) => {
    const rest = {
      [e.target.name]: e.target.value,
    };
    dispatch({ type: BASIC_INFO, payload: rest });
  };
  const onSubmit = async (e) => {
    setLoaded(false);
    e.preventDefault();
    const response = await axios.post("/api/newrest/", restaurant);
    const { msg } = await response.data;
    alert(msg);
    setLoaded(true);
  };
  if (loaded) {
    return (
      <div className="wrapper wrapper-content">
        <div className="col-lg-12">
          <div className="ibox">
            <div className="ibox-title">
              <h5>Add Restaurant</h5>
            </div>
            <div className="ibox-content">
              <form
                id="form"
                className="wizard-big"
                onSubmit={(e) => onSubmit(e)}
              >
                <div className="row justify-content-end mt-2">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="unapproved"
                      name="status"
                      value="Unapproved"
                      onClick={(e) => onRadioSelected(e)}
                    />
                    <label className="form-check-label" htmlFor="unapproved">
                      Unapproved
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="status"
                      value="Inactive"
                      id="inactive"
                      onClick={(e) => onRadioSelected(e)}
                    />
                    <label className="form-check-label" htmlFor="inactive">
                      Inactive
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="active"
                      name="status"
                      value="Active"
                      onClick={(e) => onRadioSelected(e)}
                    />
                    <label className="form-check-label" htmlFor="active">
                      Active
                    </label>
                  </div>
                </div>
                <br />
                <StepWizard
                  isHashEnabled={true}
                  nav={<RestaurantTabNav {...props} />}
                >
                  <BasicInfo stepName={"Basic"} hashKey={"basic"} />
                  <Documents stepName={"Documents"} hashKey={"docs"} />
                  <Meals stepName={"Meals"} hashKey={"meals"} />
                  <Plans stepName={"Plans"} hashKey={"plans"} />
                  <BankInfo stepName={"Bank Info"} hashKey={"bank_info"} />
                </StepWizard>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
}
