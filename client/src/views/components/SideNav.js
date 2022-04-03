import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import adminImage from "../../img/profile_small.jpg";

export default function SideNav() {
  return (
    <Navbar
      className="navbar-default navbar-static-side"
      role="navigation"
      style={{ padding: 0 }}
      id="sidebar-navigator"
    >
      <div className="sidebar-collapse">
        <Nav className="nav metismenu" id="side-menu" as="ul">
          <Nav.Item className="nav-header" as="li">
            <img
              alt="admin"
              className="rounded-circle"
              src={adminImage}
              loading="lazy"
            />
            <span className="block m-t-xs font-bold text-white-50">Admin</span>
          </Nav.Item>

          <Nav.Item className="ml-0" as="li">
            <Nav.Link href="/" className="nav-label text-white-50">
              <i className="fa fa-th-large" />
              <span>Dashboard</span>
            </Nav.Link>
          </Nav.Item>
          {/* Dashboard */}

          <Nav.Item className="ml-0" as="li">
            <Nav.Link href="/users" className="text-white-50">
              <i className="fa fa-user" />
              <span>Users</span>
            </Nav.Link>
          </Nav.Item>
          {/* Users */}

          <Nav.Item className="ml-0" as="li">
            <Nav.Link className="nav-label text-white-50">
              <i className="fa fa-spoon" />
              <span id="usermenu">Restaurant</span>
              <i className="fa fa-angle-down float-right" />
            </Nav.Link>
            <Navbar>
              <Nav className="nav nav-second-level" as="ul">
                <Nav.Item as="li">
                  <Nav.Link href="/restaurant" className="text-white-50">
                    Dashboard
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item as="li">
                  <Nav.Link href="/add_restaurant" className="text-white-50">
                    Add New Restaurant
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar>
          </Nav.Item>
          {/* Restaurant */}

          <Nav.Item className="ml-0" as="li">
            <Nav.Link href="/orders" className="text-white-50 nav-label">
              <i className="fa fa-pie-chart" />
              <span>Orders</span>
            </Nav.Link>
          </Nav.Item>
          {/* Orders */}

          <Nav.Item className="ml-0" as="li">
            <Nav.Link href="/coupons" className="text-white-50 nav-label">
              <i className="fa fa-tags" />
              <span>Coupons</span>
            </Nav.Link>
          </Nav.Item>
          {/* Coupons */}
          <Nav.Item className="ml-0" as="li">
            <Nav.Link href="/campaign" className="text-white-50 nav-label">
              <i className="fa fa-tags" />
              <span>Campaigns</span>
            </Nav.Link>
          </Nav.Item>
          {/* Coupons */}

          <Nav.Item className="ml-0" as="li">
            <Nav.Link href="/payments" className="text-white-50 nav-label">
              <i className="fa fa-credit-card" />{" "}
              <span className="nav-label text-white-50">Payments</span>
            </Nav.Link>
          </Nav.Item>
          {/* Payments */}

          <Nav.Item className="ml-0" as="li">
            <Nav.Link href="/contacts" className="text-white-50 nav-label">
              <i className="fa fa-life-buoy" />{" "}
              <span className="nav-label text-white-50">
                Contacts and Supports
              </span>
            </Nav.Link>
          </Nav.Item>
          {/* Support */}

          <Nav.Item className="ml-0" as="li">
            <Nav.Link href="/review" className="text-white-50 nav-label">
              <i className="fa fa-life-buoy" />{" "}
              <span className="nav-label text-white-50">Reviews</span>
            </Nav.Link>
          </Nav.Item>
          {/* Support */}

          <Nav.Item className="ml-0" as="li">
            <Nav.Link href="/setting" className="text-white-50 nav-label">
              <i className="fa fa-gear" />{" "}
              <span className="nav-label text-white-50">Setting</span>
            </Nav.Link>
          </Nav.Item>
          {/* Settings */}
        </Nav>
      </div>
    </Navbar>
  );
}
