import React, { useEffect, useState } from "react";
import StepWizard from "react-step-wizard";
import EditBankInfo from "./EditBankInfo";
import EditBasicInfo from "./EditBasicInfo";
import EditDocuments from "./EditDocuments";
import EditMeals from "./EditMeals";
import EditPlans from "./EditPlans";
import RestaurantTabNav from "../RestaurantTabNav";
import axios from "axios";
import { useSelector } from "react-redux";

import { useParams } from "react-router";
import Loading from "../../../../utilities/Loading";

export default function EditRestaurant(props) {
  const [restaurant, setRestaurant] = useState({});
  const state = useSelector((state) => state.restaurant);
  const [loaded, setLoaded] = useState(false);
  const [plan, setPlan] = useState({});

  const onRadioSelected = ({ target }) => {
    setRestaurant((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const onSubmit = async (e) => {
    setLoaded(false);
    e.preventDefault();
    const response = await axios.put("/api/newrest/" + id, state);
    if (response !== null) {
      alert("Restaurant Updated");
    }
    setLoaded(true);
  };

  const { id } = useParams();

  const fetchData = async (id) => {
    const response = await axios.get("/api/newrest/" + id);
    const { data } = response;
    setRestaurant(data);
  };
  const fetchPlan = async () => {
    const response = await axios.get("/api/plans/");
    const plan = response.data[0];
    setPlan(plan);
  };

  useEffect(() => {
    let componentMounted = true;
    if (componentMounted) {
      fetchData(id);
      fetchPlan();
      setLoaded(true);
    }
    return () => {
      componentMounted = false;
    };
  }, [id]);

  if (loaded) {
    return (
      <div className="wrapper wrapper-content">
        <div className="col-lg-12">
          <div className="ibox">
            <div className="ibox-title">
              <h5>Edit Restaurant</h5>
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
                      checked={restaurant.status === "Unapproved" && true}
                      name="status"
                      value="Unapproved"
                      onChange={(e) => onRadioSelected(e)}
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
                      checked={restaurant.status === "Inactive" && true}
                      value="Inactive"
                      onChange={(e) => onRadioSelected(e)}
                    />
                    <label className="form-check-label" htmlFor="inactive">
                      Inactive
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      checked={restaurant.status === "Active" && true}
                      name="status"
                      value="Active"
                      onChange={(e) => onRadioSelected(e)}
                    />
                    <label className="form-check-label" htmlFor="active">
                      Active
                    </label>
                  </div>
                </div>
                <br />
                <StepWizard
                  isHashEnabled={false}
                  nav={<RestaurantTabNav {...props} />}
                >
                  <EditBasicInfo
                    stepName={"Basic"}
                    hashKey={"basic"}
                    restaurant={restaurant}
                  />
                  <EditDocuments
                    stepName={"Documents"}
                    hashKey={"docs"}
                    restaurant={restaurant}
                  />
                  <EditMeals
                    stepName={"Meals"}
                    hashKey={"meals"}
                    restaurant={restaurant}
                  />
                  <EditPlans
                    stepName={"Plans"}
                    hashKey={"plans"}
                    plan={plan}
                    restaurant={restaurant}
                  />
                  <EditBankInfo
                    stepName={"Bank Info"}
                    hashKey={"bank_info"}
                    restaurant={restaurant}
                  />
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
