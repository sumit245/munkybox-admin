import React, { useState, useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import "../../css/bootstrap.min.css";
import axios from "axios";

const envelope = (
  <>
    <i className="fa fa-envelope" />
    <span
      className="label label-warning float-right"
      style={{ width: 20, marginLeft: 2, marginTop: -10 }}
      id="partnerRequest"
    ></span>
  </>
);
export default function TopNavigation({ setLoggedIn }) {
  const [request, setRequest] = useState([]);
  useEffect(() => {
    axios.get("/api/partnerrequest").then((res) => {
      let requests = res.data.data;
      let pending = requests.filter((item) => item.status === "Pending");
      let numOfRequests = pending.length;
      document.getElementById("partnerRequest").innerHTML = numOfRequests;
      res.data.data.length = 5;
      setRequest(res.data.data);
    });
  }, []);
  const logout = () => {
    setLoggedIn(false);
    localStorage.setItem(
      "logged_in_token",
      JSON.stringify({
        logged_in: false,
      })
    );
  };

  return (
    <nav className="navbar navbar-static-top white-bg">
      <div className="navbar-header">
        <span className="logo-name">Feasti</span>
      </div>

      <ul className="nav navbar-top-links navbar-right">
        <li>
          <NavDropdown
            title={envelope}
            id="navbarScrollingDropdown"
            bsPrefix={"dropdown-toggle nav-link"}
          >
            {Array.isArray(request) &&
              request.map((data, key) => (
                <NavDropdown.Item
                  key={key}
                  href={`/newrequest/${data._id}`}
                  bsPrefix={"dropdown-item text-success"}
                  style={{
                    padding: 4,
                    marginBottom: -24,
                  }}
                >
                  <small className="mb-0">
                    {"New request from\n " +
                      data.first_name +
                      " " +
                      data.last_name}
                  </small>
                </NavDropdown.Item>
              ))}
            <NavDropdown.Divider />
            <NavDropdown.Item
              style={{
                padding: 4,
                marginBottom: -24,
                textAlign: "center",
              }}
              href="/newrequest"
            >
              <h5 style={{ color: "dodgerblue" }}>View all</h5>
            </NavDropdown.Item>
          </NavDropdown>
        </li>
        <li>
          <a href="/" onClick={logout}>
            <i className="fa fa-sign-out" /> Log out
          </a>
        </li>
      </ul>
    </nav>
  );
}
