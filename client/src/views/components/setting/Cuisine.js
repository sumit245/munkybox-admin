import axios from "axios";
import React, { useEffect, useState } from "react";
import { imageUploader } from "../../../utilities/fileHandlers";
import Loading from "../../../utilities/Loading";
const Cuisine = () => {
  const [cuisine, setCuisine] = useState([]);
  const [cuisineName, setCuisineName] = useState("");
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("Cuisine image");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get("/api/cuisine")
      .then((res) => {
        setCuisine(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChangeText = ({ target }) => {
    setCuisineName(target.value);
  };
  const onImageChange = (e) => {
    let file = e.target.files[0];
    setFileName(file.name);
    imageUploader(file, (result) => {
      setImage(result);
    });
  };
  const submit = async () => {
    const cuisine = {
      image: image,
      cuisineName: cuisineName,
    };
    setLoading(true);
    const resp = await axios.post("/api/cuisine/", cuisine);
    setLoading(false);
    const { data } = resp;
    alert(data.msg);
  };

  return !loading ? (
    <div className="ibox-content">
      <div className="row">
        <div className="col-lg-5">
          <div className="form-group">
            <label>
              CUISINE NAME <strong className="text-danger">*</strong>
            </label>
            <input
              name="cuisineName"
              onChange={(e) => onChangeText(e)}
              type="text"
              className="form-control required"
            />
          </div>
        </div>
        <div className="col-lg-5">
          <div className="form-group">
            <label>
              IMAGE <strong className="text-danger">*</strong>
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
                {fileName}
              </label>
            </div>
          </div>
        </div>
        <div className="col-lg-2">
          <button
            type="button"
            className="btn btn-primary mt-4"
            onClick={submit}
          >
            SAVE
          </button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Cuisine Name</th>
            <th scope="col">Cuisine Image</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cuisine.map((data, key) => (
            <tr key={key}>
              <th scope="row">{data.cuisine_id}</th>
              <td>{data.cuisineName}</td>
              <td>
                <img
                  src={data.image}
                  className="img-md"
                  alt={data.cuisineName}
                />
              </td>
              <td>
                <a href={`/cuisine/${data._id}`}>
                  <i className="fa fa-trash text-danger tx-118-f" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <Loading />
  );
};

export default Cuisine;
