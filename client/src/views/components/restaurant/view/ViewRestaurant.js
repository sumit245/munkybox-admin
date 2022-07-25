import React,{useEffect} from "react";
import StepWizard from "react-step-wizard";
import BankInfo from "./ViewBankInfo";
import BasicInfo from "./ViewBasicInfo";
import Documents from "./ViewDocuments";
import Meals from "./ViewMeals";
import Plans from "./ViewPlans";
import RestaurantTabNav from "../RestaurantTabNav";
import { useParams } from 'react-router'
import {useDispatch} from 'react-redux'
import { getRestaurant } from "../../../../actions/restaurantAction";

export default function ViewRestaurant(props) {
  const { id } = useParams();
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRestaurant(id))
  }, [dispatch,id])
  return (
    <div className="wrapper wrapper-content">
      <div className="col-lg-12">
        <div className="ibox">
          <div className="ibox-title">
            <h5>View Restaurant</h5>
          </div>
          <div className="ibox-content">
            <div id="form" className="wizard-big">
              <StepWizard
                isHashEnabled={false}
                nav={<RestaurantTabNav {...props} />}
              >
                <BasicInfo stepName={"Basic"} hashKey={"basic"} />
                <Documents stepName={"Documents"} hashKey={"docs"} />
                <Meals stepName={"Meals"} hashKey={"meals"} />
                <Plans stepName={"Plans"} hashKey={"plans"} />
                <BankInfo stepName={"Bank Info"} hashKey={"bank_info"} />
              </StepWizard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
