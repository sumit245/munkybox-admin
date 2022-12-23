import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BASIC_INFO } from "../../../../utilities/constants";

export default function BasicInfo(props) {
  const [cuisine, setCuisine] = useState([]);
  const [commission, setCommission] = useState("");
  const dispatch = useDispatch();
  const [chef, setChef] = useState({});

  const onChangeText = ({ target }) => {
    setChef((prevState) => ({ ...prevState, [target.name]: target.value }));  
  };

  const handleContinue = (e) => {
    if (!chef.restaurant_name) {
      alert("Restaurant Name is required!!!");
      return;
    }
    if (!chef.owner_name) {
      alert("Owner Name is required!!!");
      return;
    }
    if (!chef.state) {
      alert("State is required!!!");
      return;
    }
    if (!chef.cuisine_type) {
      alert("Restaurant Name is required");
      return;
    }
    if (!chef.phone) {
      alert("Phone is required");
      return;
    }
    if (!chef.locality) {
      alert("Street address is required");
      return;
    }
    if (!chef.country) {
      alert("Country is required");
      return;
    }
    if (!chef.commission) {
      alert("Commission is required");
      return;
    }
    if (!chef.about) {
      alert("About is required");
      return;
    }
    if (!chef.email) {
      alert("Email ID is required");
      return;
    }
    if (!chef.city) {
      alert("City is required");
      return;
    }
    if (!chef.postal_code) {
      alert("Postal Code is required");
      return;
    }
    if (!chef.meal_type) {
      alert("Meal Type is required");
      return;
    }
    dispatch({ type: BASIC_INFO, payload: chef });
    props.goToStep(2);
  };

  useEffect(() => {
    let componentMounted = true;
    async function fetchData() {
      const resp = await axios.get("/api/cuisine");
      const cuisine = await resp.data;
      const response = await axios.get(
        "/api/checkout/6088240787ea8208fcb85863"
      );
      const { commission } = await response.data;
      if (componentMounted) {
        setCuisine(cuisine);
        setCommission(commission);
        setChef({
          ...chef,
          commission: commission,
        });
      }
    }
    fetchData();
    return () => {
      componentMounted = false;
    };
  });

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
              type="text"
              className="form-control required"
              required
            />
          </div>
          <div className="form-group">
            <label>
              CITY <strong className="text-danger">*</strong>
            </label>
            <input
              name="city"
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
              onChange={(e) => onChangeText(e)}
              type="text"
              className="form-control required"
            />
          </div>

        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label>
              PHONE NUMBER <strong className="text-danger">*</strong>
            </label>
            <input
              name="phone"
              onChange={(e) => onChangeText(e)}
              type="text"
              className="form-control required"
            />
          </div>
          <div className="form-group">
            <label>
              ADDRESS LINE 1 <strong className="text-danger text-uppercase">*</strong>
            </label>
            <input
              name="locality"
              onChange={(e) => onChangeText(e)}
              type="text"
              className="form-control required"
            />
          </div>
          <div className="form-group">
            <label>
              STATE<strong className="text-danger">*</strong>
            </label>
            <input
              name="state"
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
              value={commission}
              onChange={(e) => onChangeText(e)}
              type="text"
              className="form-control required"
            />
          </div>
        </div>

        <div className="col-lg-4">
          <div className="form-group">
            <label>
              EMAIL ID <strong className="text-danger">*</strong>
            </label>
            <input
              name="email"
              onChange={(e) => onChangeText(e)}
              type="text"
              className="form-control required"
            />
          </div>
          <div className="form-group">
            <label>
              ADDRESS LINE 2
            </label>
            <input
              name="city"
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
              onChange={(e) => onChangeText(e)}
            >
              <option>Choose an option</option>
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
              CUISINE <strong className="text-danger">*</strong>
            </label>
            <select
              name="cuisine_type"
              onChange={(e) => onChangeText(e)}
              className="form-control required"
              defaultValue="Choose an option"
            >
              <option>Choose an option</option>
              {cuisine.map((data, key) => (
                <option
                  name={data.cuisinename}
                  value={data.cuisineName}
                  key={key}
                >
                  {data.cuisineName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>
              MEAL TIME <strong className="text-danger">*</strong>
            </label>
            <select
              className="form-control required"
              name="category"
              onChange={(e) => onChangeText(e)}
            >
              <option>Choose an option</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>

        </div>
        <div className="col-lg-8" aria-rowspan={2}>
          <div className="form-group">
            <label>
              About <strong className="text-danger">*</strong>
            </label>
            <textarea
              className="form-control form-control-plaintext"
              name="about"
              onChange={(e) => onChangeText(e)}
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
