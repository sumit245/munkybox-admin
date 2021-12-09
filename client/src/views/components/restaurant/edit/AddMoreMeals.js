import React, { useState } from "react";
import { imageUploader } from "../../../../utilities/fileHandlers";

export default function AddMoreMeals({ day, index, addMeal }) {
  const [addOns, setaddOns] = useState([
    {
      add_on: "",
      add_on_price: "",
      add_on_image: "",
    },
  ]);
  const [meal, setMeal] = useState({
    meal_name: "",
    day: day,
    slot: "",
    type: "",
    description: "",
    image: "",
    add_on: [...addOns],
  });
  const [mealImage, setMealImage] = useState("");
  const onChangeText = (index, event) => {
    const { name, value } = event.target;
    setMeal((prevState) => ({ ...prevState, [name]: value }));
  };
  const onImageChange = (index, e) => {
    let file = e.target.files[0];
    setMealImage(file.name);
    imageUploader(file, (result) => {
      setMeal((prevState) => ({ ...prevState, image: result }));
    });
  };
  const handleChangeInput = (index, event) => {
    let localads = [...addOns];
    let updatedads = { ...addOns[index] };
    updatedads[event.target.name] = event.target.value;
    localads[index] = updatedads;
    setaddOns(localads);
  };
  const handleAddOnImage = async (index, event) => {
    let localads = [...addOns];
    let updatedads = { ...addOns[index] };
    let file = event.target.files[0];
    await imageUploader(file, (result) => {
      updatedads[event.target.name] = result;
      localads[index] = updatedads;
    });
    setaddOns(localads);
  };
  const addInputFields = () => {
    setaddOns([...addOns, { add_on: "", add_on_price: "", add_on_image: "" }]);
  };
  const handleRemoveClicked = (index) => {
    const values = [...addOns];
    values.splice(index, 1);
    setaddOns(values);
  };
  const done = () => {
    let localmeals = { ...meal };
    localmeals.add_on = addOns;
    addMeal(localmeals);
  };
  return (
    <fieldset key={index}>
      <div className="row mt-1">
        <div className="col-lg-12 justify-content-end">
          <button
            type="button"
            className="btn btn-primary float-right mr-2 "
            onClick={done}
          >
            Save
          </button>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-lg-4">
          <div className="form-group">
            <label>
              Available As <strong className="text-danger">*</strong>
            </label>
            <select
              id="name"
              name="slot"
              className="form-control required"
              onChange={(e) => onChangeText(index, e)}
            >
              <option>Choose an option</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label>
              Meal Type <strong className="text-danger">*</strong>
            </label>
            <select
              name="type"
              className="form-control required"
              onChange={(e) => onChangeText(index, e)}
            >
              <option>Choose an option</option>
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label>
              Meal Name <strong className="text-danger">*</strong>
            </label>
            <input
              name="meal_name"
              type="text"
              className="form-control required email"
              onChange={(e) => onChangeText(index, e)}
            />
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-4">
          <div className="form-group">
            <label>Meal Image</label>
            <div className="custom-file">
              <input
                id="logo"
                type="file"
                className="custom-file-input"
                onChange={(e) => onImageChange(index, e)}
              />
              <label htmlFor="logo" className="custom-file-label">
                {mealImage}
              </label>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label>
              Meal Description <strong className="text-danger">*</strong>
            </label>
            <textarea
              className="form-control form-control-plaintext"
              name="description"
              onChange={(e) => onChangeText(index, e)}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label>
              Day <strong className="text-danger">*</strong>
            </label>
            <select
              id="name"
              name="day"
              className="form-control required"
              onChange={(e) => onChangeText(index, e)}
            >
              <option>Choose an option</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
        </div>
      </div>

      {addOns.map((inputfield, index) => (
        <div className="row mt-2" key={index}>
          <div className="col-lg-3">
            <div className="form-group">
              <label>Add On</label>
              <input
                type="text"
                className="form-control"
                name="add_on"
                value={inputfield.add_on}
                onChange={(event) => handleChangeInput(index, event)}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label>Price</label>
              <input
                type="text"
                className="form-control"
                name="add_on_price"
                value={inputfield.add_on_price}
                onChange={(event) => handleChangeInput(index, event)}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form-group">
              <label>Add On Image</label>
              <div className="custom-file">
                <input
                  id="logo"
                  type="file"
                  value={inputfield.add_on_image}
                  className="custom-file-input"
                  name="add_on_image"
                  onChange={(event) => handleAddOnImage(index, event)}
                />
                <label htmlFor="logo" className="custom-file-label">
                  Choose File...
                </label>
              </div>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="form-inline mt-4 py-2">
              <button
                type="button"
                className="btn btn-default mr-2"
                onClick={(event) => addInputFields(event)}
              >
                <i className="fa fa-plus" />
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemoveClicked(index)}
              >
                <i className="fa fa-trash-o" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </fieldset>
  );
}
