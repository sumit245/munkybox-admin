import React from "react";
import { useSelector } from "react-redux";

export default function BasicInfo(props) {
  const restaurant = useSelector((state) => state.restaurant);

  const {
    restaurant_name,
    owner_name,
    cuisine_type,
    phone,
    locality,
    country,
    email,
    state,
    postal_code,
    city,
    status,
    category,
    about,
    reviews,
    meal_type,
    documents,
  } = restaurant;
  return (
    <fieldset>
      <div className="row m-b-lg m-t-lg">
        <div className="col-md-6">
          <div className="row">
            <div className="profile-image">
              <img
                src={documents && documents[0].restaurant_image}
                alt="profile"
              />
              <div
                className="status-circle"
                style={
                  status === "Active"
                    ? { backgroundColor: "green" }
                    : { backgroundColor: "red" }
                }
              />
            </div>
            <div className="profile-info">
              <h2 className="no-margins">{restaurant_name}</h2>
              <h4>{owner_name}</h4>
              <address>
                <strong>{locality}</strong>
                <br />
                {city}, {state}, {country} {postal_code}
                <br />
                <abbr title="Email">E: </abbr>
                {email}
                <br />
                <abbr title="Phone">M: </abbr>
                {phone}
              </address>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <table className="table small m-b-xs">
            <tbody>
              <tr>
                <td>
                  <strong>{reviews && reviews.length}</strong> Stars
                </td>
                <td>
                  <strong>{reviews && reviews.length}</strong> Reviews
                </td>
              </tr>
              <tr>
                <td>CUISINE TYPE</td>
                <td>{cuisine_type}</td>
              </tr>
              <tr>
                <td>COMMISSION</td>
                <td>
                  15
                  {"%"}
                </td>
              </tr>
              <tr>
                <td>Meal Type</td>
                <td>{meal_type}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-3">
          <small>Sales in last month</small>
          <h2 className="no-margins">0</h2>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-lg-4">
          <div className="form-group">
            <h4 className="m-t-none m-b">MEAL TIME</h4>
            <p>{category}</p>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="form-group">
            <h4 className="m-t-none m-b">About</h4>
            <p>{about}</p>
          </div>
        </div>
      </div>
    </fieldset>
  );
}
