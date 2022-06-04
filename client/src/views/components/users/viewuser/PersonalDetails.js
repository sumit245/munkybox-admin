import React, { useEffect, useState } from "react";

export default function PersonalDetails({ user }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [user]);

  if (loaded) {
    return (
      <>
        <div className="ibox-content">
          <div className="row">
            <div className="col-lg-4">
              <h4>User ID</h4>
              <small className="stats-label">{user.user_id}</small>
            </div>
            <div className="col-lg-4">
              <h4>First Name</h4>
              <small className="stats-label"> {user.first_name}</small>
            </div>
            <div className="col-lg-4">
              <h4>Last Name</h4>
              <small className="stats-label"> {user.last_name}</small>
            </div>
            <div className="col-lg-4">
              <h4>Phone</h4>
              <small className="stats-label">{user.phone}</small>
            </div>
            <div className="col-lg-4">
              <h4>Email</h4>
              <small className="stats-label">{user.email_id}</small>
            </div>
            <div className="col-lg-4">
              <h4>Status</h4>
              <small className="stats-label">{user.status}</small>
            </div>
          </div>
        </div>
        <div className="ibox-content">
          <h3>Favorite Restaurants</h3>
          {user.favorite.map((fav, key) => (
            <div className="row" key={key}>
              <div className="col-lg-4">
                <h4>{fav}</h4>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  } else {
    return null;
  }
}
