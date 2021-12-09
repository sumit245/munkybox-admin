import React, { useState } from "react";

export default function DynamicMeal({ index }) {
  const [addOns, setaddOns] = useState([
    {
      add_on: "",
      add_on_price: "",
      add_on_image: "",
    },
  ]);

  return (
    <fieldset key={index}>
      <div className="row mt-2">
        <div className="col-lg-4">
          <div className="form-group">
            <label>
              Available As 
            </label>
            <select id="name" name="slot" className="form-control required">
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label>
              Meal Type 
            </label>
            <select name="type" className="form-control required">
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label>
              Meal Name 
            </label>
            <input
              name="meal_name"
              type="text"
              className="form-control required email"
            />
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-4">
          <div className="form-group">
            <label>Meal Image</label>
            <div className="custom-file">
              <input id="logo" type="file" className="custom-file-input" />
              <label htmlFor="logo" className="custom-file-label">
                Meal Image
              </label>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="form-group">
            <label>
              Meal Description 
            </label>
            <textarea
              className="form-control form-control-plaintext"
              name="description"
            />
          </div>
        </div>
      </div>

      {addOns.map((inputfield, index) => (
        <div className="row mt-2" key={index}>
          <div className="col-lg-3">
            <div className="form-group">
              <label>Add On</label>
              <input type="text" className="form-control" name="add_on" />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label>Price</label>
              <input type="text" className="form-control" name="add_on_price" />
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
                />
                <label htmlFor="logo" className="custom-file-label">
                  Choose File...
                </label>
              </div>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="form-inline mt-4 py-2">
              <button type="button" className="btn btn-default mr-2">
                <i className="fa fa-plus" />
              </button>
              <button type="button" className="btn btn-danger">
                <i className="fa fa-trash-o" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </fieldset>
  );
}
