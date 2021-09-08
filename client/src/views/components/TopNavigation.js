import React, { useState, useEffect } from "react";
import { NavDropdown } from "react-bootstrap";
import axios from "axios";

const envelope = (
  <a className="dropdown-toggle count-info" data-toggle="dropdown" href="/">
    <span className="label label-warning" id="partnerRequest"></span>
    <i className="fa fa-envelope" />
  </a>
);
const notifications = (
  <a className="dropdown-toggle count-info" data-toggle="dropdown" href="/">
    <i className="fa fa-bell" />
    <span className="label label-primary">8</span>
  </a>
);
export default function TopNavigation() {
  const [request, setRequest] = useState([]);
  const [numRequest, setNumRequest] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/api/partnerrequest").then((res) => {
      let numOfRequests = res.data.length;
      console.log(numOfRequests);
      setNumRequest(numOfRequests);
      document.getElementById("partnerRequest").innerHTML = numOfRequests;
      res.data.length = 5;
      setRequest(res.data);
    });
  }, []);

  return (
    <nav
      className="navbar navbar-static-top white-bg"
      role="navigation"
      style={{ marginBottom: 0 }}
    >
      <div className="navbar-header">
        <a
          className="navbar-minimalize minimalize-styl-2 btn btn-primary"
          href="/"
        >
          <i className="fa fa-bars" />
        </a>
        <form
          role="search"
          className="navbar-form-custom"
          action="search_results.html"
        >
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
          <NavDropdown title={envelope} id="navbarScrollingDropdown">
            {request.map((data, key) => (
              <NavDropdown.Item
                href={`/newrequest/${data._id}`}
                className="p-2 mt-0 mb-0 text-success tx-10"
              >
                {"New request from\n " + data.first_name + " " + data.last_name}
              </NavDropdown.Item>
            ))}
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">View All</NavDropdown.Item>
          </NavDropdown>
        </li>
        <li>
          <NavDropdown
            title={notifications}
            id="navbarScrollingDropdown"
            className="dropdown"
          >
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
