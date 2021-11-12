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
const notifications = (
  <>
    <i className="fa fa-bell" />
    <span
      className="label label-primary float-right"
      style={{ width: 20, marginLeft: 2, marginTop: -10 }}
    >
      0
    </span>
  </>
);
export default function TopNavigation() {
  const [request, setRequest] = useState([]);
  useEffect(() => {
    axios.get("/api/partnerrequest").then((res) => {
      let numOfRequests = res.data.data.length;
      document.getElementById("partnerRequest").innerHTML = numOfRequests;
      res.data.data.length = 5;
      setRequest(res.data.data);
    });
  }, []);

  return (
    <nav className="navbar navbar-static-top white-bg">
      <div className="navbar-header">
        <a
          className="navbar-minimalize minimalize-styl-2 btn btn-primary"
          href="/"
        >
          <i className="fa fa-bars" />
        </a>
        <form role="search" className="navbar-form-custom">
          <div className="form-group">
            <input
              type="text"
              placeholder="Search for something..."
              className="form-control"
              name="top-search"
              id="top-search"
            />
          </div>
        </form>
      </div>

      <ul className="nav navbar-top-links navbar-right">
        <li>
          <span className="m-r-sm text-muted welcome-message">
            Welcome to MunkyBox
          </span>
        </li>
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
          <NavDropdown title={notifications}>
            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">View All</NavDropdown.Item>
          </NavDropdown>
        </li>

        <li>
          <a href="login.html">
            <i className="fa fa-sign-out" /> Log out
          </a>
        </li>
      </ul>
    </nav>
  );
}
