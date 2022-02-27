import React, { useState, useEffect } from "react";
import { imageUploader } from "../../../../utilities/fileHandlers";
import { useDispatch } from "react-redux";
import { editMealsInfo } from "../../../../actions/restaurantAction";
import AddMoreMeals from "./AddMoreMeals";
export default function EditMeals(props) {
  const [meals, setMeals] = useState([]);
  const [contentEditable, setContentEditable] = useState(false);
  const [moreAddons, setmoreAddons] = useState(false);
  const [currentpos, setCurrentpos] = useState(0);
  const [addsomemeal, setaddsomemeal] = useState(false);
  const [localaddons, setlocaladdons] = useState({
    add_on: "",
    add_on_image: "",
    add_on_price: "",
  });
  const dispatch = useDispatch();
  const handleContinue = (e) => {
    dispatch(editMealsInfo(meals));
    props.goToStep(4);
  };
  const handleBack = (e) => {
    e.preventDefault();
    props.goToStep(2);
  };
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    let localmeals = [...meals];
    let updatedMeal = { ...meals[index] };
    updatedMeal[name] = value;
    localmeals[index] = updatedMeal;
    setMeals(localmeals);
  };
  const onChangeaddons = (index, event) => {
    const { name, value } = event.target;
    setlocaladdons({
      ...localaddons,
      [name]: value,
    });
  };
  const profileUpdate = (index, e) => {
    let file = e.target.files[0];
    imageUploader(file, (result) => {
      let localmeals = [...meals];
      let updatedMeal = { ...meals[index] };
      updatedMeal.image = result;
      localmeals[index] = updatedMeal;
      setMeals(localmeals);
    });
  };
  const editMeal = (key) => {
    setContentEditable(!contentEditable);
    setCurrentpos(key);
  };
  const deleteMeal = (index) => {
    let localmeals = [...meals];
    localmeals.splice(index, 1);
    setMeals(localmeals);
  };
  const onChangeExtras = (index, event) => {
    let addOnImage = event.target.files[0];
    imageUploader(addOnImage, (result) => {
      setlocaladdons({
        ...localaddons,
        add_on_image: result,
      });
    });
  };
  const saveExtras = (index) => {
    setmoreAddons(false);
    let localmeals = [...meals];
    let updatedMeal = { ...meals[index] };
    let addons = [...meals[index].add_on];
    addons.push(localaddons);
    updatedMeal.add_on = addons;
    localmeals[index] = updatedMeal;
    setMeals(localmeals);
  };
  function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele !== value;
    });
  }
  const deleteExtra = (mealindex, addOnIndex) => {
    setmoreAddons(false);
    let localmeals = [...meals];
    let updatedMeal = { ...meals[mealindex] };
    let addons = [...meals[mealindex].add_on];
    let updatedExtras = arrayRemove(addons, addons[addOnIndex]);
    updatedMeal.add_on = updatedExtras;
    localmeals[mealindex] = updatedMeal;
    setMeals(localmeals);
  };
  const addMoreExtras = (key) => {
    setmoreAddons(true);
    setCurrentpos(key);
  };
  const addMeal = (data) => {
    setMeals([...meals, data]);
    setaddsomemeal(false);
  };
  useEffect(() => {
    let componentMount = true;
    if (componentMount) {
      let { meals } = props.restaurant;
      Array.isArray(meals) && setMeals(meals);
    }
    return () => {
      componentMount = false;
    };
  }, [props.restaurant]);
  return (
    <fieldset>
      <div className="row">
        {meals.length > 0 ? (
          meals.map((meal, key) => (
            <div className="col-lg-6" key={key}>
              <div className="ibox ">
                <div className="ibox-title" style={{ borderTopColor: "#fff" }}>
                  {contentEditable && currentpos === key ? (
                    <input
                      name="day"
                      placeholder="Day"
                      className="form-control col-md-6"
                      onChange={(event) => handleInputChange(key, event)}
                    />
                  ) : (
                    <h5>{meal.day}</h5>
                  )}
                  <div className="ibox-tools">
                    <span
                      className=" btn btn-outline-primary mr-1"
                      onClick={() => editMeal(key)}
                    >
                      <i
                        className={`${
                          contentEditable && currentpos === key
                            ? "fa fa-save"
                            : "fa fa-pencil"
                        }`}
                      />
                    </span>
                    <span
                      className="btn btn-outline-danger"
                      onClick={() => deleteMeal(key)}
                    >
                      <i className="fa fa-trash" />
                    </span>
                  </div>
                </div>
                <div className="ibox-content">
                  <img src={meal.image} className="img-fluid" alt="Meal" />
                  <div className="mt-1" />
                  {contentEditable && currentpos === key && (
                    <div className="custom-file">
                      <input
                        id="logo"
                        type="file"
                        className="custom-file-input"
                        onChange={(e) => profileUpdate(key, e)}
                      />
                      <label htmlFor="logo" className="custom-file-label">
                        Choose file...
                      </label>
                    </div>
                  )}

                  <div className="row mt-1">
                    <div className="col-sm-8">
                      {contentEditable && currentpos === key ? (
                        <input
                          name="meal_name"
                          placeholder="Meal Name"
                          className="form-control"
                          onChange={(event) => handleInputChange(key, event)}
                        />
                      ) : (
                        <h4>{meal.meal_name}</h4>
                      )}
                    </div>
                    <div className="col-sm-4">
                      {contentEditable && currentpos === key ? (
                        <input
                          name="slot"
                          placeholder="Slot"
                          className="form-control"
                          onChange={(event) => handleInputChange(key, event)}
                        />
                      ) : (
                        <h4>{meal.slot}</h4>
                      )}
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-sm-8">
                      {contentEditable && currentpos === key ? (
                        <input
                          name="description"
                          placeholder="Little description here"
                          className="form-control"
                          onChange={(event) => handleInputChange(key, event)}
                        />
                      ) : (
                        <p>{meal.description}</p>
                      )}
                    </div>
                    <div className="col-sm-4">
                      {contentEditable && currentpos === key ? (
                        <input
                          name="type"
                          placeholder="Meal Type"
                          className="form-control"
                          onChange={(event) => handleInputChange(key, event)}
                        />
                      ) : (
                        <h5>{meal.type}</h5>
                      )}
                    </div>
                  </div>
                </div>
                <div className="ibox-content table-responsive">
                  {moreAddons && currentpos === key ? (
                    <div>
                      <div className="row justify-content-end">
                        <button
                          className="btn btn-outline-danger mr-1"
                          onClick={() => setmoreAddons(false)}
                        >
                          CANCEL
                        </button>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => saveExtras(key)}
                        >
                          SAVE
                        </button>
                      </div>
                      <div className="row mt-1">
                        <div className="col-md-4">
                          <input
                            className="form-control"
                            placeholder="Add On"
                            name="add_on"
                            onChange={(e) => onChangeaddons(key, e)}
                          />
                        </div>
                        <div className="col-md-4">
                          <div className="custom-file dropzone">
                            <label
                              htmlFor="add_on"
                              style={{
                                border: 1,
                                display: "inline-block",
                                cursor: "pointer",
                              }}
                            >
                              {localaddons.add_on_image !== "" ? (
                                <img
                                  src={localaddons.add_on_image}
                                  alt="Preview"
                                  className="img-fluid"
                                />
                              ) : (
                                <i className="fa fa-camera" />
                              )}
                            </label>
                            <input
                              id="add_on"
                              type="file"
                              name="add_on_image"
                              onChange={(e) => onChangeExtras(key, e)}
                              style={{ display: "none" }}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <input
                            className="form-control"
                            name="add_on_price"
                            placeholder="$2"
                            onChange={(e) => onChangeaddons(key, e)}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <table className="table table-hover no-margins">
                      <thead>
                        <tr>
                          <th>
                            <h5>Add On</h5>
                          </th>
                          <th>
                            <h5>Image</h5>
                          </th>
                          <th>
                            <h5>Price</h5>
                          </th>
                          <th>
                            <span
                              className="btn btn-outline-primary"
                              onClick={() => addMoreExtras(key)}
                            >
                              <i className="fa fa-plus" />
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(meal.add_on) &&
                          meal.add_on.map((extra, rowIndex) => (
                            <tr key={rowIndex}>
                              <td style={{ width: "35%" }}>{extra.add_on}</td>
                              <td style={{ width: "40%" }}>
                                <img
                                  src={extra.add_on_image}
                                  alt="Extras"
                                  className="card-img"
                                  style={{ height: 80, width: 120 }}
                                />
                              </td>
                              <td style={{ width: "15%" }}>
                                {"$" + extra.add_on_price}
                              </td>
                              <td
                                style={{ width: "10%", flexDirection: "row" }}
                              >
                                <span
                                  className="btn btn-outline-danger"
                                  onClick={() => deleteExtra(key, rowIndex)}
                                >
                                  <i className="fa fa-trash-o" />
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-lg-8">
            <p>You have not added any meals</p>
          </div>
        )}
      </div>

      <div className="ibox">
        <div className="ibox-title">
          <h5>Add More Meals</h5>
          <div className="ibox-tools">
            <span
              className="btn btn-outline-info"
              type="button"
              onClick={() => setaddsomemeal(true)}
            >
              <i className="fa fa-plus" />
            </span>
          </div>
        </div>
        <div className="ibox-content">
          {addsomemeal ? <AddMoreMeals addMeal={addMeal} /> : null}
        </div>
      </div>

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
