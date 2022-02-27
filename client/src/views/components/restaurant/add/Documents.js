import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editDocuments } from "../../../../actions/restaurantAction";
import { imageUploader } from "../../../../utilities/fileHandlers";

export default function Documents(props) {
  const [images, setImages] = useState([]);
  const [restaurant_image, setRestaurantImage] = useState("");
  const [banner_image, setBannerImage] = useState("");
  const [papers, setPapers] = useState([]);
  const [temp, setTemp] = useState("");
  const [imageName, setImageName] = useState("");

  const [dynamicImageField, setDynamicImageField] = useState([
    {
      image_name: "",
      image: "",
    },
  ]);

  const selector = useSelector((state) => state.restaurant);
  const dispatch = useDispatch();

  const handleImageAdded = () => {
    setDynamicImageField([...dynamicImageField, { image_name: "", image: "" }]);
  };
  const handleRemoveImage = (index) => {
    const values = [...dynamicImageField];
    values.splice(index, 1);
    setDynamicImageField(values);
  };

  const handleContinue = (e) => {
    if (!restaurant_image) {
      alert("Profile picture is required");
      return;
    }
    if (!banner_image) {
      alert("Banner image is required");
      return;
    }
    dispatch(editDocuments(images, papers[papers.length - 1]));
    props.goToStep(3);
  };
  const handleChangeInput = (index, event) => {
    const value = [...dynamicImageField];
    value[index][event.target.name] = event.target.value;
    setDynamicImageField(value);
  };

  const handleDynamicFiles = (index, event) => {
    const value = [...dynamicImageField];
    let file = event.target.files[0];
    imageUploader(file, (result) => {
      value[index]["image"] = result;
      setDynamicImageField(value);
    });
    setPapers([...papers, dynamicImageField]);
  };
  const handleBack = (e) => {
    e.preventDefault();
    props.goToStep(1);
  };
  const onImageChange = (e) => {
    let file = e.target.files[0];
    let name = e.target.name;
    name === "restaurant_image"
      ? setRestaurantImage(file.name)
      : setBannerImage(file.name);

    imageUploader(file, (result) => {
      let image = {};
      image[name] = result;
      setImages([...images, image]);
    });
  };

  return (
    <fieldset>
      <div className="row mt-2">
        <div className="col-lg-12">
          <div className="form-group">
            <label>
              Profile Image <strong className="text-danger">*</strong>
            </label>
            <div className="custom-file">
              <input
                name="restaurant_image"
                type="file"
                className="custom-file-input"
                accept=".jpeg, .png, .jpg"
                onChange={onImageChange}
              />
              <label htmlFor="logo" className="custom-file-label">
                {restaurant_image}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-12">
          <div className="form-group">
            <label>
              Banner Image <strong className="text-danger">*</strong>
            </label>
            <div className="custom-file">
              <input
                type="file"
                name="banner_image"
                className="custom-file-input"
                accept=".jpeg, .png, .jpg"
                onChange={onImageChange}
              />
              <label htmlFor="logo" className="custom-file-label">
                {banner_image}
              </label>
            </div>
          </div>
        </div>
      </div>
      {dynamicImageField.map((inputFields, index) => (
        <div className="row mt-2" key={index}>
          <div className="col-lg-5">
            <div className="form-group">
              <label>Image Name</label>
              <input
                type="text"
                className="form-control"
                name="image_name"
                value={inputFields.image_name}
                onChange={(event) => handleChangeInput(index, event)}
              />
            </div>
          </div>
          <div className="col-lg-5">
            <div className="form-group">
              <label>Image</label>
              <div className="custom-file">
                <input
                  id="logo"
                  type="file"
                  name={"image_".concat(index)}
                  className="custom-file-input"
                  onChange={(event) => handleDynamicFiles(index, event)}
                />
                <label htmlFor="logo" className="custom-file-label">
                  {inputFields.image_name}
                </label>
              </div>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="form-inline mt-4 py-2">
              <button
                className="btn btn-danger mr-2"
                type="button"
                onClick={() => handleRemoveImage(index)}
              >
                <i className="fa fa-trash-o" />
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={(event) => handleImageAdded(event)}
              >
                <i className="fa fa-plus" />
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="row mt-2">
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
      </div>
    </fieldset>
  );
}
