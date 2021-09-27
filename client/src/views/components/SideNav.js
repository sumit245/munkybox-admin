import React, { useRef } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import adminImage from "../../img/profile_small.jpg";

export default function SideNav() {
  const dashboardmenu = useRef(null);
  const rest = useRef(null);
  const user = useRef(null);
  const ordermenu = useRef(null);
  const invoicemenu = useRef(null);
  const paymentmenu = useRef(null);
  const couponmenu = useRef(null);
  const settingmenu = useRef(null);

  const onClickRestaurant = () => {
    const menu = rest.current;
    const usermenu = user.current;
    usermenu.className = "";
    usermenu.children[1].className = "collapse";
    menu.className = "active";
    menu.children[1].className = "";
    dashboardmenu.current.className = "";
    ordermenu.current.className = "";
    invoicemenu.current.className = "";
    paymentmenu.current.className = "";
    settingmenu.current.className = "";
    couponmenu.current.className = "";
  };
  const onClickUser = () => {
    const menu = rest.current;
    const usermenu = user.current;
    usermenu.className = "active";
    usermenu.children[1].className = "";
    menu.className = "";
    menu.children[1].className = "collapse";
    dashboardmenu.current.className = "";
    ordermenu.current.className = "";
    invoicemenu.current.className = "";
    paymentmenu.current.className = "";
    settingmenu.current.className = "";
    couponmenu.current.className = "";
  };
  const onClickDashboard = () => {
    user.current.children[1].className = "collapse";
    rest.current.children[1].className = "collapse";
    dashboardmenu.current.className = "active";
    user.current.className = "";
    rest.current.className = "";
    ordermenu.current.className = "";
    invoicemenu.current.className = "";
    paymentmenu.current.className = "";
    settingmenu.current.className = "";
    couponmenu.current.className = "";
  };
  const onClickOrder = () => {
    user.current.children[1].className = "collapse";
    rest.current.children[1].className = "collapse";
    dashboardmenu.current.className = "";
    user.current.className = "";
    rest.current.className = "";
    ordermenu.current.className = "active";
    invoicemenu.current.className = "";
    paymentmenu.current.className = "";
    settingmenu.current.className = "";
    couponmenu.current.className = "";
  };
  const onClickCoupon = () => {
    user.current.children[1].className = "collapse";
    rest.current.children[1].className = "collapse";
    dashboardmenu.current.className = "";
    user.current.className = "";
    rest.current.className = "";
    ordermenu.current.className = "";
    invoicemenu.current.className = "";
    paymentmenu.current.className = "";
    settingmenu.current.className = "";
    couponmenu.current.className = "active";
  };
  const onClickInvoice = () => {
    user.current.children[1].className = "collapse";
    rest.current.children[1].className = "collapse";
    dashboardmenu.current.className = "";
    user.current.className = "";
    rest.current.className = "";
    ordermenu.current.className = "";
    couponmenu.current.className = "";
    invoicemenu.current.className = "active";
    paymentmenu.current.className = "";
    settingmenu.current.className = "";
  };
  const onClickSetting = () => {
    user.current.children[1].className = "collapse";
    rest.current.children[1].className = "collapse";
    dashboardmenu.current.className = "";
    user.current.className = "";
    rest.current.className = "";
    ordermenu.current.className = "";
    invoicemenu.current.className = "";
    paymentmenu.current.className = "";
    settingmenu.current.className = "active";
    couponmenu.current.className = "";
  };
  const onClickPayment = () => {
    user.current.children[1].className = "collapse";
    rest.current.children[1].className = "collapse";
    dashboardmenu.current.className = "";
    user.current.className = "";
    rest.current.className = "";
    ordermenu.current.className = "";
    invoicemenu.current.className = "";
    paymentmenu.current.className = "active";
    settingmenu.current.className = "";
    couponmenu.current.className = "";
  };

  return (
    <Nav
      className="navbar-default navbar-static-side nav-metismenu"
      id="side-menu"
      as="ul"
    >
      <Nav.Item className="nav-header" as="li">
        <div className="dropdown profile-element">
          <img alt="admin" className="rounded-circle" src={adminImage} />
          <Nav.Link data-toggle="dropdown" className="dropdown-toggle" href="/">
            <span className="block m-t-xs font-bold">Admin</span>
          </Nav.Link>
        </div>
      </Nav.Item>

      <Nav.Item
        ref={dashboardmenu}
        className=""
        as="li"
        onClick={onClickDashboard}
      >
        <NavLink to="/" activeClassName="active" className="active">
          <i className="fa fa-th-large" />{" "}
          <span className="nav-label">Dashboard</span>
        </NavLink>
      </Nav.Item>
      {/* Dashboard */}

      <Nav.Item ref={user} className="" as="li">
        <NavLink to="#" activeClassName="active" onClick={onClickUser}>
          <i className="fa fa-user text-white-50" />
          <span className="text-white-50 nav-label">User </span>
          <i className="fa fa-angle-down right ml-5" />
        </NavLink>
        <Nav className="nav nav-second-level flex-column" id="usermenu">
          <Nav.Item className="mx-5">
            <NavLink
              to="/users"
              className="text-white-50"
              activeClassName="active"
            >
              Dashboard
            </NavLink>
          </Nav.Item>
          <Nav.Item className="mx-5 mt-1">
            <NavLink
              to="/add_user"
              className="text-white-50"
              activeClassName="active"
            >
              Add New User
            </NavLink>
          </Nav.Item>
          <Nav.Item className="mx-5 mt-1">
            <NavLink
              to="/restaurant"
              className="text-white-50"
              activeClassName="active"
            >
              Add Restaurant
            </NavLink>
          </Nav.Item>
        </Nav>
      </Nav.Item>
      {/* Users */}

      <Nav.Item ref={rest} className="" as="li">
        <NavLink to="#" activeClassName="active" onClick={onClickRestaurant}>
          <i className="fa fa-spoon text-white-50" />
          <span className="text-white-50 nav-label">Restaurant</span>
          <i className="fa fa-angle-down mx-4" />
        </NavLink>
        <Nav className="nav nav-second-level flex-column collapse">
          <Nav.Item className="mx-5">
            <NavLink
              to="/restaurant"
              className="text-white-50"
              activeClassName="active"
            >
              Dashboard
            </NavLink>
          </Nav.Item>
          <Nav.Item className="mx-5 mt-1">
            <NavLink
              to="/add_user"
              className="text-white-50"
              activeClassName="active"
            >
              Unapproved
            </NavLink>
          </Nav.Item>
          <Nav.Item className="mx-5 mt-1">
            <NavLink
              to="/add_restaurant"
              className="text-white-50"
              activeClassName="active"
            >
              Add Restaurant
            </NavLink>
          </Nav.Item>
        </Nav>
      </Nav.Item>
      {/* Users */}
      {/* Restaurant */}

      <Nav.Item ref={ordermenu} className="" as="li" onClick={onClickOrder}>
        <Nav.Link href="/orders">
          <i className="fa fa-pie-chart" />{" "}
          <span className="nav-label">Orders</span>
        </Nav.Link>
      </Nav.Item>
      {/* Orders */}

      <Nav.Item ref={couponmenu} className="" as="li" onClick={onClickCoupon}>
        <Nav.Link href="/">
          <i className="fa fa-tags" />{" "}
          <span className="nav-label">Coupons</span>
        </Nav.Link>
      </Nav.Item>
      {/* Coupons */}

      <Nav.Item ref={invoicemenu} className="" as="li" onClick={onClickInvoice}>
        <Nav.Link href="/invoices">
          <i className="fa fa-file" />{" "}
          <span className="nav-label">Invoice</span>
        </Nav.Link>
      </Nav.Item>
      {/* Invoice */}

      <Nav.Item ref={paymentmenu} className="" as="li" onClick={onClickPayment}>
        <Nav.Link href="/payments">
          <i className="fa fa-credit-card" />{" "}
          <span className="nav-label">Payments</span>
        </Nav.Link>
      </Nav.Item>
      {/* Payments */}

      <Nav.Item ref={settingmenu} className="" as="li" onClick={onClickSetting}>
        <Nav.Link href="/setting">
          <i className="fa fa-gear" />{" "}
          <span className="nav-label">Setting</span>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
