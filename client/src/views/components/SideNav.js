import React from "react";
import { NavDropdown } from "react-bootstrap";
import adminImage from "../../img/profile_small.jpg";

const RestaurantLabel = (
  <>
    <i className="fa fa-spoon p-2 text-white-50" />
    <span className="text-white-50 nav-label">Restaurant </span>
  </>
);

const UserLabel = (
  <>
    <i className="fa fa-user p-2 text-white-50" />
    <span className="nav-label text-white-50">Users</span>
  </>
);

export default function SideNav() {
  return (
    <nav className="navbar-default navbar-static-side" role="navigation">
      <div className="sidebar-collapse">
        <ul className="nav metismenu" id="side-menu">
          <li className="nav-header">
            <div className="dropdown profile-element">
              <img alt="admin" className="rounded-circle" src={adminImage} />
              <a data-toggle="dropdown" className="dropdown-toggle" href="/">
                <span className="block m-t-xs font-bold">Admin</span>
              </a>
            </div>
            <div className="logo-element">MB</div>
          </li>

          <li className="active">
            <a href="/">
              <i className="fa fa-th-large" />
              <span className="nav-label">Dashboard</span>
            </a>
          </li>
          {/* Dashboard */}

          <li>
            <NavDropdown
              title={UserLabel}
              className="nav-label"
              id="collapsible-nav-dropdown"
            >
              <ul className="nav nav-second-level">
                <NavDropdown.Item className="text-white-50" href="/users" >
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2" className="text-white-50">
                  Add New User
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3" className="text-white-50">
                  Add Restaurant
                </NavDropdown.Item>
              </ul>
            </NavDropdown>
          </li>
          {/* Users */}

          <li>
            <NavDropdown title={RestaurantLabel}>
              <ul className="nav nav-second-level">
                <NavDropdown.Item className="text-white-50" href="/restaurant">
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2" className="text-white-50">
                  Unapproved
                </NavDropdown.Item>
                <NavDropdown.Item href="/add_restaurant" className="text-white-50">
                  Add Restaurant
                </NavDropdown.Item>
              </ul>
            </NavDropdown>
          </li>

          {/* Restaurant */}

          <li>
            <a href="/orders">
              <i className="fa fa-pie-chart" />
              <span className="nav-label">Orders</span>
            </a>
          </li>
          {/* Orders */}

          <li>
            <a href="widgets.html">
              <i className="fa fa-file" />
              <span className="nav-label">Invoice</span>
            </a>
          </li>
          {/* Invoice */}

          <li>
            <a href="/">
              <i className="fa fa-tags" />{" "}
              <span className="nav-label">Coupons</span>
              <span className="fa arrow" />
            </a>
          </li>
          {/* Coupons */}

          <li>
            <a href="/payments">
              <i className="fa fa-credit-card" />
              <span className="nav-label">Payments</span>
              <span className="float-right label label-primary">New</span>
            </a>
          </li>
          {/* Payments */}

          <li>
            <a href="/">
              <i className="fa fa-files-o" />
              <span className="nav-label">Other Pages</span>
              <span className="fa arrow" />
            </a>
          </li>
          {/* Other pages */}

          <li className="special_link">
            <a href="package.html">
              <i className="fa fa-gear" />
              <span className="nav-label">Setting</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
