import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editBasicInfo } from "../../../../actions/restaurantAction";

export default function EditBasicInfo(props) {
  const [cuisine, setCuisine] = useState([]);
  const [state, setState] = useState({});
  const fetchData = async () => {
    const response = await axios.get("/api/cuisine/");
    const { data } = await response;
    setCuisine(data);
  };
  useEffect(() => {
    let componentMounted = true;
    if (componentMounted) {
      fetchData();
    }
    return () => {
      componentMounted = false;
    };
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    let abc = true;
    if (abc) {
      setState(props.restaurant);
    }
    return () => {
      abc = false;
    };
  }, [props.restaurant]);

  const onChangeText = ({ target }) => {
    setState((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleContinue = (e) => {
    if (!state.restaurant_name) {
      alert("Restaurant Name is required!!!");
      return;
    }
    if (!state.owner_name) {
      alert("Owner Name is required!!!");
      return;
    }
    if (!state.state) {
      alert("State is required!!!");
      return;
    }
    if (!state.cuisine_type) {
      alert("Restaurant Name is required");
      return;
    }
    if (!state.phone) {
      alert("Phone is required");
      return;
    }
    if (!state.locality) {
      alert("Street address is required");
      return;
    }
    if (!state.country) {
      alert("Country is required");
      return;
    }
    if (!state.commission) {
      alert("Commission is required");
      return;
    }
    if (!state.about) {
      alert("About is required");
      return;
    }
    if (!state.email) {
      alert("Email ID is required");
      return;
    }
    if (!state.city) {
      alert("City is required");
      return;
    }
    if (!state.postal_code) {
      alert("Postal Code is required");
      return;
    }
    if (!state.meal_type) {
      alert("Meal Type is required");
      return;
    }
    dispatch(editBasicInfo(state));
    props.goToStep(2);
  };

  return (
    <fieldset>
      <div className="row mt-2">
        <div className="col-lg-4">
          <div className="form-group">
            <label>
              RESTAURANT NAME <strong className="text-danger">*</strong>
            </label>
            <input
              name="restaurant_name"
              defaultValue={state.restaurant_name}
              onChange={(e) => onChangeText(e)}
              type="text"
              className="form-control required"
            />
          </div>
          <div className="form-group">
            <label>
              OWNER NAME <strong className="text-danger">*</strong>
            </label>
            <input
              name="owner_name"
              onChange={(e) => onChangeText(e)}
              defaultValue={state.owner_name}
              type="text"
              className="form-control required"
            />
          </div>
          <div className="form-group">
            <label>
              STATE <strong className="text-danger">*</strong>
            </label>
            <input
              name="state"
              defaultValue={state.state}
              onChange={(e) => onChangeText(e)}
              type="text"
              className="form-control required"
            />
          </div>
          <div className="form-group">
            <label>
              CUISINE <strong className="text-danger">*</strong>
            </label>
            <select
              name="cuisine_type"
              onChange={(e) => onChangeText(e)}
              value={state.cuisine_type}
              className="form-control required"
            >
              {cuisine.map((data, key) => (
                <option
                  name={data.cuisineName}
                  value={data.cuisineName}
                  key={key}
                >
                  {data.cuisineName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label>
              PHONE NUMBER <strong className="text-danger">*</strong>
            </label>
            <input
              name="phone"
              defaultValue={state.phone}
              onChange={(e) => onChangeText(e)}
              type="text"
              className="form-control required"
            />
          </div>
          <div className="form-group">
            <label>
              STREET <strong className="text-danger">*</strong>
            </label>
            <input
              name="locality"
              defaultValue={state.locality}
              onChange={(e) => onChangeText(e)}
              type="text"
              className="form-control required"
            />
          </div>
          <div className="form-group">
            <label>
              COUNTRY <strong className="text-danger">*</strong>
            </label>
            <input
              name="country"
              defaultValue={state.country}
              onChange={(e) => onChangeText(e)}
              type="text"
              className="form-control required"
            />
          </div>
          <div className="form-group">
            <label>
              COMMISSION <strong className="text-danger">*</strong>
            </label>
            <input
              name="commission"
              defaultValue={state.commission}
              onChange={(e) => onChangeText(e)}
              type="text"
              className="form-control required"
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label>
              EMAIL ADDRESS <strong className="text-danger">*</strong>
            </label>
            <input
              name="email"
              defaultValue={state.email}
              onChange={(e) => onChangeText(e)}
              type="text"
              className="form-control required"
            />
          </div>
          <div className="form-group">
            <label>
              CITY <strong className="text-danger">*</strong>
            </label>
            <input
              name="city"
              defaultValue={state.city}
              onChange={(e) => onChangeText(e)}
              type="text"
              className="form-control required"
            />
          </div>
          <div className="form-group">
            <label>
              POSTAL CODE <strong className="text-danger">*</strong>
            </label>
            <input
              name="postal_code"
              defaultValue={state.postal_code}
              onChange={(e) => onChangeText(e)}
              type="text"
              className="form-control required"
            />
          </div>
          <div className="form-group">
            <label>
              Meal Type <strong className="text-danger">*</strong>
            </label>
            <select
              className="form-control required"
              name="meal_type"
              value={state.meal_type}
              onChange={(e) => onChangeText(e)}
            >
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-4">
          <div className="form-group">
            <label>
              MEAL TIME <strong className="text-danger">*</strong>
            </label>
            <select
              className="form-control required"
              name="category"
              value={state.category}
              onChange={(e) => onChangeText(e)}
            >
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="form-group">
            <label>
              About <strong className="text-danger">*</strong>
            </label>
            <textarea
              className="form-control form-control-plaintext"
              name="about"
              onChange={(e) => onChangeText(e)}
              defaultValue={state.about}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 justify-content-end">
          <button
            type="button"
            className="btn btn-primary float-right mr-2"
            onClick={handleContinue}
          >
            Next
          </button>
        </div>
      </div>
    </fieldset>
  );
}
