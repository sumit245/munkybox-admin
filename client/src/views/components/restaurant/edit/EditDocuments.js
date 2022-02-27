import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { editDocuments } from "../../../../actions/restaurantAction";
import { imageUploader } from "../../../../utilities/fileHandlers";
export default function EditDocuments(props) {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [profile, setProfile] = useState({});
  const [banner, setBanner] = useState({});
  const [papers, setPapers] = useState([]);
  const [imageName, setImageName] = useState("");
  const [temp, setTemp] = useState("");
  const [fileName, setFileName] = useState("Choose a file");
  const { documents } = props.restaurant;
  const mydocs = props.restaurant.papers;
  useEffect(() => {
    let componentMounted = true;
    if (componentMounted) {
      setImages(documents);
      if (Array.isArray(documents)) {
        setProfile(documents[0]);
        setBanner(documents[1]);
      }
      Array.isArray(mydocs) && setPapers(mydocs);
    }
    return () => {
      componentMounted = false;
    };
  }, [documents]);

  const handleBack = (e) => {
    e.preventDefault();
    props.goToStep(1);
  };
  const handleContinue = (e) => {
    if (!profile) {
      alert("Profile picture is required");
      return;
    }
    if (!banner) {
      alert("Banner image is required");
      return;
    }
    dispatch(editDocuments([profile, banner], [...papers]));
    props.goToStep(3);
  };
  const handleImage = () => {
    let image = {
      image_name: imageName,
      image: temp,
    };
    setPapers([...papers, image]);
  };
  const imageUpdater = ({ target }, key) => {
    let paper = [...papers];
    let file = target.files[0];
    imageUploader(file, (result) => {
      try {
        paper[key].image = result;
        setPapers(paper);
      } catch (error) {
        setTemp(result);
      }
    });
    setImageName(file.name);
  };
  const deletePaper = (key) => {
    let paper = [...papers];
    paper.splice(key, 1);
    setPapers(paper);
  };

  const profileUpdate = (e) => {
    let file = e.target.files[0];
    imageUploader(file, (result) => {
      setProfile({ restaurant_image: result });
    });
  };
  const bannerUpdate = (e) => {
    let file = e.target.files[0];
    imageUploader(file, (result) => {
      setBanner({ banner_image: result });
    });
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setImageName(value);
  };
  return (
    <fieldset>
      <div className="row mt-2">
        <div className="col-lg-4">
          <div className="ibox">
            <div
              className="ibox-title"
              style={{ borderTopColor: "#FFF", width: 200 }}
            >
              <h5>Profile Image</h5>
              <div className="ibox-tools">
                <span className="btn btn-white mr-1">
                  <label
                    htmlFor="file-upload"
                    style={{
                      border: 1,
                      display: "inline-block",
                      padding: 0,
                      cursor: "pointer",
                      height: 6,
                      width: 6,
                    }}
                  >
                    <i
                      className="fa fa-camera"
                      style={{ left: -4, position: "relative" }}
                    ></i>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    name="restaurant_image"
                    style={{ display: "none" }}
                    onChange={profileUpdate}
                  />
                </span>

                <span className="btn btn-danger">
                  <i className="fa fa-trash-o" />
                </span>
              </div>
            </div>
            <img
              loading="lazy"
              alt="profile"
              src={profile.restaurant_image}
              className="img-thumbnail"
              style={{ height: 180, width: 180 }}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="ibox">
            <div
              className="ibox-title"
              style={{ borderTopColor: "#FFF", width: 240 }}
            >
              <h5>Banner Image</h5>
              <div className="ibox-tools">
                <span className="btn btn-white mr-1">
                  <label
                    htmlFor="banner-upload"
                    style={{
                      border: 1,
                      display: "inline-block",
                      padding: 0,
                      cursor: "pointer",
                      height: 6,
                      width: 6,
                    }}
                  >
                    <i
                      className="fa fa-camera"
                      style={{ left: -4, position: "relative" }}
                    ></i>
                  </label>
                  <input
                    id="banner-upload"
                    type="file"
                    name="banner_image"
                    onChange={bannerUpdate}
                    style={{ display: "none" }}
                  />
                </span>

                <span className="btn btn-danger">
                  <i className="fa fa-trash-o" />
                </span>
              </div>
            </div>

            <img
              loading="lazy"
              alt="profile"
              src={banner.banner_image}
              className="img-thumbnail"
              style={{ height: 180, width: 240 }}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="ibox">
            <div
              className="ibox-title"
              style={{ borderTopColor: "#FFF", width: 240 }}
            >
              <h5>Add more images</h5>
            </div>
            <div className="row row-sm">
              <div className="col-lg-12">
                <div className="custom-file">
                  <input
                    id="logo"
                    name="image"
                    type="file"
                    className="custom-file-input"
                    onChange={(event) => imageUpdater(event)}
                  />
                  <label htmlFor="logo" className="custom-file-label">
                    {fileName}
                  </label>
                </div>
              </div>
            </div>

            <div className="row row-sm">
              <div className="form-group col-lg-12">
                <label>
                  Image Name <strong className="text-danger">*</strong>
                </label>
                <input
                  name="image_name"
                  type="text"
                  className="form-control required"
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div className="row row-sm float-right">
              <div className="col-sm-3">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleImage}
                >
                  UPLOAD
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-2">
        {papers.map((image, key) => (
          <div className="col-lg-4" key={key}>
            <div className="ibox">
              <div
                className="ibox-title"
                style={{ borderTopColor: "#FFF", width: 200 }}
              >
                <h5>{image.image_name}</h5>
                <div className="ibox-tools">
                  <span className="btn btn-white mr-1">
                    <label
                      htmlFor="paper-upload"
                      style={{
                        border: 1,
                        display: "inline-block",
                        padding: 0,
                        cursor: "pointer",
                        height: 6,
                        width: 6,
                      }}
                    >
                      <i
                        className="fa fa-camera"
                        style={{ left: -4, position: "relative" }}
                      ></i>
                    </label>
                    <input
                      id="paper-upload"
                      type="file"
                      name={image.image_name}
                      style={{ display: "none" }}
                      onChange={(e) => imageUpdater(e, key)}
                    />
                  </span>

                  <span
                    className="btn btn-danger"
                    onClick={() => deletePaper(key)}
                  >
                    <i className="fa fa-trash-o" />
                  </span>
                </div>
              </div>
              <img
                loading="lazy"
                alt="profile"
                src={image.image}
                className="img-thumbnail"
                style={{ height: 180, width: 180 }}
              />
            </div>
          </div>
        ))}
      </div>

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
