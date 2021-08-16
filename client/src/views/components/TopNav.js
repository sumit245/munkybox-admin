import { Avatar } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Settings,
  Edit3,
  LifeBuoy,
  LogOut,
  Bell,
  Mail,
} from "react-feather";
import axios from "axios";

export default class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
      adminName: sessionStorage.getItem("adminName"),
      adminRole: sessionStorage.getItem("adminRole"),
      requests: []
    };
  }
  componentDidMount() {
    axios.get('/api/partnerrequest').then(res => {
      let requests = []
      let obj = res.data.find(o => o.status === 'pending');
      requests.concat(obj)
      this.setState({ requests: res.data })
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    const { adminName, adminRole, requests, show, check, showNotif } = this.state;
    return (
      <>
        <header className="navbar navbar-header navbar-header-fixed">
          <div className="navbar-brand">
            <Link to="../../index.html" className="df-logo">
              Munky<span>box</span>
            </Link>
          </div>
          {/* navbar-brand */}
          <div id="navbarMenu" className="navbar-menu-wrapper">
            <div className="nav navbar-menu">
              <div className="nav-item" style={{ width: 400 }}>
                <div className=" search-form">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search"
                  />
                  <button className="btn" type="button">
                    <Search />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* navbar-menu-wrapper */}

          <div className="navbar-right">
            <div className='dropdown dropdown-message'>
              <Link
                to="#"
                className="dropdown-link"
              >
                <Mail onClick={() => {
                  this.setState((prevState) => ({
                    show: !prevState.show
                  }))
                }}
                  color={requests.length > 0 ? "#e93" : "#777"}
                />
              </Link>
              <div
                className="dropdown-menu dropdown-menu-right"
                style={{ display: show ? "block" : "none" }}
              >
                <div className="dropdown-header">
                  New Message
                </div>
                {
                  requests.map((data, key) => {
                    return (
                      <Link to={{ pathname: `/requests/req_id=?${data._id}` }} key={key} className="dropdown-item">
                        <div className="media">
                          <div className="media-body mg-l-5">
                            <strong>{data.first_name + " " + data.last_name}</strong>
                            <p>You have a new chef request</p>
                            <span>{data.datetime}</span>
                          </div>

                        </div>
                      </Link>
                    )
                  })
                }

                <div className="dropdown-footer">
                  <Link to="/requests">
                    View all message
                  </Link>
                </div>
              </div>
            </div>

            <div className='dropdown dropdown-message'>
              <Link
                to="#"
                className="dropdown-link"
              >
                <Bell onClick={() => {
                  this.setState((prevState) => ({
                    showNotif: !prevState.showNotif
                  }))
                }} />
              </Link>
              <div
                className="dropdown-menu dropdown-menu-right"
                style={{ display: showNotif ? "block" : "none" }}
              >
                <div className="dropdown-header">
                  New Notification
                </div>
                <Link to="/settings" className="dropdown-item">
                  <Edit3 /> View Profile
                </Link>
                <div className="dropdown-footer">
                  View All
                </div>
              </div>
            </div>

            <div className="dropdown dropdown-profile">
              <Link
                to='#'
                onClick={() => {
                  this.setState((prevState) => ({
                    check: !prevState.check,
                  }));
                }}
              >
                <div className="avatar avatar-sm">
                  <Avatar className="rounded-circle">Ad</Avatar>
                </div>
              </Link>
              <div
                className="dropdown-menu dropdown-menu-right tx-13"
                style={{ display: check ? "block" : "none" }}
              >
                <div className="avatar avatar-sm">
                  <Avatar className="avatar-initial rounded-circle">Ad</Avatar>
                </div>
                <h6 className="tx-semibold tx-uppercase">{adminName}</h6>
                <p className="tx-12 tx-uppercase tx-color-03">
                  {adminRole}
                </p>
                {adminRole === "admin" ? (
                  <>
                    <Link to="/settings" className="dropdown-item">
                      <Edit3 /> View Profile
                  </Link>
                    <div className="dropdown-divider" />
                    <Link to="/settings" className="dropdown-item">
                      <LifeBuoy /> Company Setting
                 </Link>
                    <Link to="/settings" className="dropdown-item">
                      <Settings />
                   Account Settings
                 </Link>
                    <Link to="/logout" className="dropdown-item">
                      <LogOut />
                   Sign Out
                 </Link>
                  </>
                ) : (
                  <>
                    <Link to="/settings" className="dropdown-item">
                      <Edit3 /> View Profile
                  </Link>
                    <div className="dropdown-divider" />
                    <Link to="/logout" className="dropdown-item">
                      <LogOut />
                   Sign Out
                 </Link>
                  </>
                )}
              </div>
              {/* dropdown-menu */}
            </div>
            {/* dropdown */}
          </div>
          {/* navbar-right */}
        </header>
        {/* navbar */}
      </>
    );
  }
}
