import React, { Component } from "react";
import TopNav from "../components/TopNav";
import SideNav from "../components/SideNav";
import "../../assets/css/dashforge.demo.css";
import ViewProfile from "../components/ViewProfile";
import { MdSettings } from "react-icons/md";
import { Disc, DollarSign, User, Users } from "react-feather";
import CreateUserForm from "../components/CreateUserForm";
import $ from "jquery";
import CompanySetup from "../components/CompanySetup";
import Smssetup from "../components/Smssetup";
import ProfitMargin from '../components/ProfitMargin'
import Cuisine from '../components/Cuisine'
import ServiceCharges from '../components/settings/ServiceCharges'
import { Link } from 'react-router-dom'

export default class Settings extends Component {
  state = {
    url: "settingProfile",
  };
  handleChange = (param) => {
    switch (param) {
      case "profile":
        this.setState({ url: "settingProfile" });
        $("#profile").addClass("active");
        $("#company").removeClass("active");
        $("#users").removeClass("active");
        $("#sms").removeClass("active");
        $("#profit").removeClass("active");
        $("#cuisine").addClass("active");

        break;
      case "company":
        this.setState({ url: "settingCompany" });
        $("#company").addClass("active");
        $("#profile").removeClass("active");
        $("#users").removeClass("active");
        $("#sms").removeClass("active");
        $("#profit").removeClass("active");
        $("#cuisine").removeClass("active");
        break;
      case "users":
        this.setState({ url: "settingUsers" });
        $("#users").addClass("active");
        $("#profile").removeClass("active");
        $("#company").removeClass("active");
        $("#profit").removeClass("active");
        $("#cuisine").removeClass("active");
        $("#sms").removeClass("active");
        break;
      case "sms":
        this.setState({ url: "settingSMS" });
        $("#users").removeClass("active");
        $("#profile").removeClass("active");
        $("#company").removeClass("active");
        $("#profit").removeClass("active");
        $("#cuisine").removeClass("active");
        $("#sms").addClass("active");
        break;
      case "profit":
        this.setState({ url: "profit" });
        $("#users").removeClass("active");
        $("#profile").removeClass("active");
        $("#company").removeClass("active");
        $("#sms").removeClass("active");
        $("#cuisine").removeClass("active");
        $("#profit").addClass("active");
        break;
      case "cuisine":
        this.setState({ url: "cuisine" });
        $("#users").removeClass("active");
        $("#profile").removeClass("active");
        $("#company").removeClass("active");
        $("#profit").removeClass("active");
        $("#sms").removeClass("active");
        $("#cuisine").addClass("active");
        break;
      case "servicecharges":
        this.setState({ url: "servicecharges" });
        $("#users").removeClass("active");
        $("#profile").removeClass("active");
        $("#company").removeClass("active");
        $("#profit").removeClass("active");
        $("#sms").removeClass("active");
        $("#cuisine").removeClass("active");
        $("#servicecharges").addClass("active");
        break;
      default:
        break;
    }
  };
  render() {
    const url = this.state.url;
    return (
      <>
        <TopNav />
        <div className="contact-wrapper">
          <SideNav />
          <div
            className="d-flex mx-5 content content-component"
            style={{
              flexDirection: "column",
              height: 500,
              overflowY: "scroll",
            }}
          >
            <div className="container">
              <div
                id="sidebarMenu"
                className="sidebar sidebar-fixed sidebar-components"
                style={{
                  position: "fixed",
                  left: 50,
                  backgroundColor: "#fff",
                  borderLeft: "1px solid #e2e5ed",
                }}
              >
                <div
                  className="sidebar-body "
                  style={{ backgroundColor: "#fff" }}
                >
                  <ul className="sidebar-nav">
                    <li className="nav-label mg-b-15">
                      <MdSettings size={20} />
                      Settings{" "}
                    </li>
                    <ul style={{ listStyleType: "none" }}>
                      <li
                        className="nav-item"
                        onClick={() => this.handleChange("profile")}
                        style={{ cursor: "pointer" }}
                      >
                        <Link id="profile" className="nav-link">
                          <User size={18} />
                          Profile Setting
                        </Link>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => this.handleChange("users")}
                        style={{ cursor: "pointer" }}
                      >
                        <Link className="nav-link" id="users">
                          <Users />
                          Users Settings
                        </Link>
                      </li>

                      <li
                        className="nav-item"
                        onClick={() => this.handleChange("company")}
                        style={{ cursor: "pointer" }}
                      >
                        <Link className="nav-link" id="company">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#555"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-package"
                          >
                            <path d="M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z"></path>
                            <polyline points="2.32 6.16 12 11 21.68 6.16"></polyline>
                            <line x1="12" y1="22.76" x2="12" y2="11"></line>
                            <line x1="7" y1="3.5" x2="17" y2="8.5"></line>
                          </svg>
                          Company Setting
                        </Link>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => this.handleChange("profit")}
                        style={{ cursor: "pointer" }}
                      >
                        <Link className="nav-link" id="profit">
                          <DollarSign />
                          Profit Margin
                        </Link>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => this.handleChange("servicecharges")}
                        style={{ cursor: "pointer" }}
                      >
                        <Link className="nav-link" id="servicecharges">
                          <DollarSign />
                          Service Charges
                        </Link>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => this.handleChange("cuisine")}
                        style={{ cursor: "pointer" }}
                      >
                        <Link className="nav-link" id="cuisine">
                          <Disc />
                          Cuisines
                        </Link>
                      </li>
                      <li
                        className="nav-item"
                        onClick={() => this.handleChange("sms")}
                        style={{ cursor: "pointer" }}
                      >
                        <Link className="nav-link" id="users">SMS config
                        </Link>
                      </li>
                    </ul>
                  </ul>
                </div>
              </div>
              {url === "settingProfile" ? <ViewProfile /> : url === 'settingCompany' ? <CompanySetup /> : url === "settingSMS" ? <Smssetup /> : url === "profit" ? <ProfitMargin /> : url === "cuisine" ? <Cuisine /> : url === "servicecharges" ? <ServiceCharges /> : <CreateUserForm />}
            </div>
            {/* df-example */}
          </div>
        </div>
      </>
    );
  }
}
