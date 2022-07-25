import React, { useState } from "react";
import { imageUploader } from "../../../../utilities/fileHandlers";

export default function DynamicMeal({ day, index, addMeal }) {
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
    add_on: addOns,
  });
  const [mealImage, setMealImage] = useState("");
  const [loading, setLoading] = useState(false);
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
    const add_on = [...addOns];
    if (event.target.type === "file") {
      let file = event.target.files[0];
      imageUploader(file, (result) => {
        add_on[index].add_on_image = result;
      });
    } else {
      add_on[index][event.target.name] = event.target.value;
    }
    setaddOns(add_on);
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
    if (!meal.meal_name) {
      alert("Meal name is  required");
      return;
    }
    if (!meal.image) {
      alert("Meals must have an image");
      return;
    }
    if (!meal.slot) {
      alert("Select a delivery slot");
      return;
    }
    if (!meal.type) {
      alert("Select category of current meal");
      return;
    }
    addMeal(meal);
    setLoading(true);
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
            {loading ? "✔" : "Save"}
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
        <div className="col-lg-8">
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
                  className="custom-file-input"
                  name="add_on_image"
                  onChange={(event) => handleChangeInput(index, event)}
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
