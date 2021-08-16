import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";
import {
  MdBubbleChart,
  MdCancel,
  MdCardGiftcard,
  MdCardMembership,
  MdHome,
  MdPerson,
  MdReceipt,
  MdRestaurantMenu,
  MdShoppingCart
} from "react-icons/md";

export default class SideNav extends Component {
  componentDidMount() {
    var coll = document.getElementsByClassName("collapsible");
    var i;
    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
  }
  render() {
    return (
      <>
        <div className="contact-navleft" style={{ width: 155 }}>
          <nav className="nav">
            <div>
              <Link to="/" className="nav-link mg-t-0 mg-b-0">
                <span
                  data-toggle="tooltip"
                  title="Dashboard"
                  data-placement="right"
                >
                  <MdHome size={18} />
                  &nbsp;Dashboard
                </span>
              </Link>
            </div>
            {/* Dashboard */}
            <div>
              <p
                style={{ cursor: "pointer" }}
                id="homedash"
                className="collapsible"
              >
                <span
                  data-toggle="tooltip"
                  title="Users"
                  data-placement="right"
                >
                  <MdPerson size={18} />
                  &nbsp;Users
                </span>
              </p>
              <div className="collapse-content py-0">
                <Link
                  to="/users-dashboard"
                  id="userDashboard"
                  className="nav-link mg-t-0 mt-0 mg-b-0"
                  style={{ height: 'auto' }}
                >
                  {" "}
                  Dashboard
                </Link>
                <Link
                  to="/add-user"
                  id="addUser"
                  className="nav-link mg-t-0 mt-0 mg-b-0"
                  style={{ height: 'auto' }}
                >
                  {" "}
                  Add Users
                </Link>
              </div>
            </div>
            {/* User */}
            <div>
              <p
                style={{ cursor: "pointer" }}
                id="restdash"
                className="collapsible"
              >
                <span
                  data-toggle="tooltip"
                  title="Restaurants"
                  data-placement="right"
                >
                  <MdRestaurantMenu size={18} />
                  &nbsp;Restaurants
                </span>
              </p>
              <div className="collapse-content">
                <Link
                  to="/restaurant-dashboard"
                  id="dashRestaurant"
                  className="nav-link mg-t-0 py-0 mg-b-0 mt-0"
                  style={{ height: 'auto', textAlign: 'left' }}
                >Dashboard
                </Link>
                <Link
                  to="/restaurant-unapproved"
                  id="unapprovedRestaurant"
                  className="nav-link mg-t-0 py-0 mg-b-0 mt-0"
                  style={{ height: 'auto', textAlign: 'left' }}
                >Unapproved</Link>
                <Link
                  to="/restaurant-add"
                  id="addRestaurant"
                  className="nav-link mg-t-0 py-0 mg-b-0 mt-0"
                  style={{ height: 'auto', textAlign: 'left' }}
                >Add New</Link>
              </div>
            </div>
            {/* Restaurant */}
            <Link
              to="/view-order"
              id="viewOrders"
              className="nav-link mg-t-0 py-0 mt-0"
              style={{ height: 'auto', textAlign: 'left' }}
            >
              <span
                data-toggle="tooltip"
                title="Orders"
                data-placement="right"
              >
                <MdShoppingCart size={18} />
                  &nbsp;Orders
                </span>
            </Link>
            {/* orders */}
            <div>
              <p
                style={{ cursor: "pointer" }}
                id="invoice"
                className="collapsible"
              >
                <span
                  data-toggle="tooltip"
                  title="Invoices"
                  data-placement="right"
                >
                  <MdReceipt size={18} />
                  &nbsp;Invoice
                </span>
              </p>
              <div className="collapse-content">
                <Link
                  to="/invoice-view"
                  id="viewInvoice"
                  className="nav-link mg-t-0 py-0 mg-b-0 mt-0"
                  style={{ height: 'auto', textAlign: 'left' }}
                >View All</Link>
                <Link
                  to="/add-invoice"
                  id="invoiceAdd"
                  className="nav-link mg-t-0 py-0 mg-b-0 mt-0"
                  style={{ height: 'auto', textAlign: 'left' }}
                >Add</Link>
                <Link
                  to="/edit-invoice"
                  id="invoiceEdits"
                  className="nav-link mg-t-0 py-0 mg-b-0 mt-0"
                  style={{ height: 'auto', textAlign: 'left' }}
                >Edit</Link>
              </div>
            </div>
            {/* invoice */}
            <div>
              <p
                style={{ cursor: "pointer" }}
                id="coupons"
                className="collapsible"
              >
                <span
                  data-toggle="tooltip"
                  title="Coupons"
                  data-placement="right"
                >
                  <MdCardGiftcard size={18} />
                  &nbsp;Coupons
                </span>
              </p>
              <div className="collapse-content">
                <Link
                  to="/restaurant-dashboard"
                  id="dashRestaurant"
                  className="nav-link mg-t-0 py-0 mt-0"
                >
                  {" "}
                  History
                </Link>
              </div>
            </div>
            {/* Coupons */}
            <div>
              <p
                style={{ cursor: "pointer" }}
                id="homedash"
                className="collapsible"
              >
                <span
                  data-toggle="tooltip"
                  title="Users"
                  data-placement="right"
                >
                  <MdCancel size={18} />
                  &nbsp;Cancellations
                </span>
              </p>
              <div className="collapse-content">
                <Link
                  to="/restaurant-dashboard"
                  id="dashRestaurant"
                  className="nav-link mg-t-0 py-0 mt-0"
                >
                  {" "}
                  Dashboard
                </Link>
              </div>
            </div>
            {/* Cancellations   */}
            <div>
              <p
                style={{ cursor: "pointer" }}
                id="homedash"
                className="collapsible"
              >
                <span
                  data-toggle="tooltip"
                  title="Users"
                  data-placement="right"
                >
                  <MdBubbleChart size={18} />
                  Site Earnings
                </span>
              </p>
              <div className="collapse-content">
                <Link
                  to="/restaurant-dashboard"
                  id="dashRestaurant"
                  className="nav-link mg-t-0 py-0 mt-0"
                >
                  {" "}
                  Dashboard
                </Link>
              </div>
            </div>
            {/* Site Earning */}
            <div>
              <p
                style={{ cursor: "pointer" }}
                id="homedash"
                className="collapsible"
              >
                <span
                  data-toggle="tooltip"
                  title="Users"
                  data-placement="right"
                >
                  <MdCardMembership size={18} />
                  &nbsp;Payments
                </span>
              </p>
              <div className="collapse-content">
                <Link
                  to="/restaurant-dashboard"
                  id="dashRestaurant"
                  className="nav-link mg-t-0 py-0 mt-0"
                >
                  {" "}
                  Dashboard
                </Link>
              </div>
            </div>
            {/* Payments  */}
          </nav>
        </div>
        {/* contact-navleft */}
        {/* </div> */}
      </>
    );
  }
}
