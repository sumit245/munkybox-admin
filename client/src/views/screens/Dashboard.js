import React, { Component } from "react";
import TopNav from "../components/TopNav";
import SideNav from "../components/SideNav";
import "../../assets/css/dashforge.dashboard.css";
import {
  ArrowRightCircle,
  Briefcase,
  PieChart,
  UserPlus,
} from "react-feather";
import { MdRestaurantMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import { getClients } from "../../controllers/ClientController";
// import {getRestaurants} from '../../controllers/RestaurantController'

const Clt = getClients();
// const Restaurants = getRestaurants();
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
      users: [],
      active: [],
      inactive: [],
      restaurants: [],
      activeRestaurants: [],
      InactiveRestaurants:[],
    };
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    this.props.LogOutRequest();
  }
  componentDidMount() {
    Clt.then((data) => {
      let active = data.filter(function (e) {
        return e.status === 'Active'
      })
      let inactive = data.filter(function (e) {
        return e.status === 'Inactive'
      })

      this.setState({ users: data, active: active, inactive: inactive })

    })
      .catch((err) => {
        console.log(err);
      });
    // Restaurants.then((data) => {
    //   let active = data.filter(function (e) {
    //     return e.status === 'Active'
    //   })
    //   let inactive = data.filter(function (e) {
    //     return e.status === 'Inactive'
    //   })

    //   this.setState({ restaurants: data, activeRestaurants: active, inactiveRestaurants: inactive })

    // })
    //   .catch((err) => {
    //     console.log(err);
    //   });

  }
  render() {
    const {users,active,inactive,restaurants,activeRestaurants,inactiveRestaurants}=this.state
    return (
      <>
        <TopNav />
        <div className="contact-wrapper">
          <SideNav />
          <div
            className="d-flex ml-5 content content-component"
            style={{
              flexDirection: "column",
              height: 580,
              overflowY: "scroll",
            }}
          >
            <div className="row row-xs ml-5  px-4">
              <div
                className="col-sm-2 ml-4 col-lg-2 px-0"
                style={{ backgroundColor: "#481f01" }}
              >
                <div
                  className="card card-body px-1"
                  style={{ backgroundColor: "#5e2c04" }}
                >
                  <div className="row">
                    <div className="col-sm-8">
                      <h6 className="tx-uppercase tx-11 tx-spacing-1 tx-white tx-semibold mg-b-1">
                        Orders
                      </h6>
                      <h6 className="tx-11 tx-spacing-1 tx-white tx-semibold mg-b-5">
                        10
                      </h6>
                    </div>
                    <div className="col-sm-4 mt-n3">
                      <Briefcase size={40} color="white" />
                    </div>
                  </div>
                  <div className="row mt-2 mb-2 ">
                    <div className="col-sm-6">
                      <h6 className="tx-normal tx-white tx-rubik mg-b-0 mg-r-5 lh-1">
                        Completed
                      </h6>
                      <p className="tx-11 tx-color-03 mg-b-0">
                        <span className="tx-medium tx-white">12345</span>
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <h6 className="tx-normal tx-white tx-rubik mg-b-0 mg-r-5 lh-1">
                        In Progess
                      </h6>
                      <p className="tx-11 tx-color-03 mg-b-0">
                        <span className="tx-medium tx-white">12345</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card card-footer py-0">
                  <Link className="tx-normal tx-white tx-12 mg-b-0 pb-0 px-4">
                    <span className="tx-medium tx-white">More info</span>{" "}
                    <ArrowRightCircle size={14} color="white" />{" "}
                  </Link>
                </div>
              </div>
              {/* Orders */}
              <div
                className="col-sm-3 ml-3 col-lg-2 px-0"
                style={{ backgroundColor: "#9e4244" }}
              >
                <div
                  className="card card-body px-1"
                  style={{ backgroundColor: "#E11584" }}
                >
                  <div className="row">
                    <div className="col-sm-8">
                      <h6 className="tx-uppercase tx-11 tx-spacing-1 tx-white tx-semibold mg-b-1">
                        User
                      </h6>
                      <h6 className="tx-11 tx-spacing-1 tx-white tx-semibold mg-b-5">
                        {users.length}
                      </h6>
                    </div>
                    <div className="col-sm-4 mt-n3">
                      <UserPlus size={40} color="white" />
                    </div>
                  </div>
                  <div className="row mt-2 mb-2 ">
                    <div className="col-sm-6">
                      <h6 className="tx-normal tx-white tx-rubik mg-b-0 mg-r-5 lh-1">
                        Active
                      </h6>
                      <p className="tx-11 tx-color-03 mg-b-0">
                        <span className="tx-medium tx-white">{active.length}</span>
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <h6 className="tx-normal tx-white tx-rubik mg-b-0 mg-r-5 lh-1">
                        Inactive
                      </h6>
                      <p className="tx-11 tx-color-03 mg-b-0">
                        <span className="tx-medium tx-white">{inactive.length}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card card-footer py-0">
                  <Link className="tx-normal tx-white tx-12 mg-b-0 pb-0 px-4" to="users-dashboard" >
                    <span className="tx-medium tx-white">More info</span>{" "}
                    <ArrowRightCircle size={14} color="white" />{" "}
                  </Link>
                </div>
              </div>
              {/*Users */}
              <div
                className="col-sm-3 ml-3 col-lg-2 px-0"
                style={{ backgroundColor: "#853500" }}
              >
                <div
                  className="card card-body px-1"
                  style={{ backgroundColor: "#e05a00" }}
                >
                  <div className="row">
                    <div className="col-sm-8">
                      <h6 className="tx-uppercase tx-11 tx-spacing-1 tx-white tx-semibold mg-b-1">
                        Restaurants
                      </h6>
                      <h6 className="tx-11 tx-spacing-1 tx-white tx-semibold mg-b-5">
                        {restaurants && restaurants.length}
                      </h6>
                    </div>
                    <div className="col-sm-4 mt-n3">
                      <MdRestaurantMenu size={40} color="white" />
                    </div>
                  </div>
                  <div className="row mt-2 mb-2 ">
                    <div className="col-sm-6">
                      <h6 className="tx-normal tx-white tx-rubik mg-b-0 mg-r-5 lh-1">
                        Active
                      </h6>
                      <p className="tx-11 tx-color-03 mg-b-0">
                        <span className="tx-medium tx-white">
                          {activeRestaurants  && activeRestaurants.length}
                        </span>
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <h6 className="tx-normal tx-white tx-rubik mg-b-0 mg-r-5 lh-1">
                        Inactive
                      </h6>
                      <p className="tx-11 tx-color-03 mg-b-0">
                        <span className="tx-medium tx-white">
                          {inactiveRestaurants && inactiveRestaurants.length}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card card-footer py-0">
                  <Link className="tx-normal tx-white tx-12 mg-b-0 pb-0 px-4" to="/restaurant-dashboard" >
                    <span className="tx-medium tx-white">More info</span>{" "}
                    <ArrowRightCircle size={14} color="white" />{" "}
                  </Link>
                </div>
              </div>
              {/* Restaurant */}
              <div
                className="col-sm-3 ml-3 col-lg-2 px-0"
                style={{ backgroundColor: "#853500" }}
              >
                <div
                  className="card card-body px-1"
                  style={{ backgroundColor: "#e05a00" }}
                >
                  <div className="row">
                    <div className="col-sm-8">
                      <h6 className="tx-uppercase tx-11 tx-spacing-1 tx-white tx-semibold mg-b-1">
                        Earnings
                      </h6>
                      <h6 className="tx-11 tx-spacing-1 tx-white tx-semibold mg-b-5">
                        $0.00
                      </h6>
                    </div>
                    <div className="col-sm-4 mt-n3">
                      <PieChart size={40} color="white" />
                    </div>
                  </div>
                  <div className="row mt-2 mb-2 ">
                    <div className="col-sm-6">
                      <h6 className="tx-normal tx-white tx-rubik mg-b-0 mg-r-5 lh-1">
                        Admin
                      </h6>
                      <p className="tx-11 tx-color-03 mg-b-0">
                        <span className="tx-medium tx-white">$0.00</span>
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <h6 className="tx-normal tx-white tx-rubik mg-b-0 mg-r-5 lh-1">
                        Marketing
                      </h6>
                      <p className="tx-11 tx-color-03 mg-b-0">
                        <span className="tx-medium tx-white">$0.00</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card card-footer py-0">
                  <Link className="tx-normal tx-white tx-12 mg-b-0 pb-0 px-4">
                    <span className="tx-medium tx-white">More info</span>{" "}
                    <ArrowRightCircle size={14} color="white" />{" "}
                  </Link>
                </div>
              </div>
              {/* Earning */}
            </div>
            <div className="row row-xs ml-5 p-2 mg-t-4">
              <div className="col-sm-2 ml-4 col-lg-2 px-0">
                <h3 className="tx-normal tx-20 tx-spacing-2 tx-black tx-semibold mg-b-1">
                  Today's Statistics
                </h3>
              </div>
            </div>

            <div className="row row-xs ml-5 px-4 mg-t-4">
              <div
                className="col-sm-3 ml-4 col-lg-2 px-0"
                style={{ backgroundColor: "#03c04a" }}
              >
                <div
                  className="card card-body"
                  style={{ backgroundColor: "#234f1e" }}
                >
                  <div className="row">
                    <div className="col-sm-8">
                      <h6 className="tx-uppercase tx-11 tx-spacing-1 tx-white tx-semibold mg-b-1">
                        Accepted Orders
                      </h6>
                    </div>
                    <div className="col-sm-4 mt-n3">
                      <Briefcase size={40} color="white" />
                    </div>
                  </div>
                  <div className="row mt-2 mb-2 ">
                    <div className="col-sm-6">
                      <h6 className="tx-normal tx-white tx-rubik mg-b-0 mg-r-5 lh-1">
                        User
                      </h6>
                      <p className="tx-11 tx-color-03 mg-b-0">
                        <span className="tx-medium tx-white">0</span>
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <h6 className="tx-normal tx-white tx-rubik mg-b-0 mg-r-5 lh-1">
                        Restaurants
                      </h6>
                      <p className="tx-11 tx-color-03 mg-b-0">
                        <span className="tx-medium tx-white">0</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card card-footer py-0">
                  <Link className="tx-normal tx-white tx-12 mg-b-0 pb-0 px-4">
                    <span className="tx-medium tx-white">More info</span>{" "}
                    <ArrowRightCircle size={14} color="white" />{" "}
                  </Link>
                </div>
              </div>
              {/* Accepted */}
              <div
                className="col-sm-3 ml-3 col-lg-2 px-0"
                style={{ backgroundColor: "#c21807" }}
              >
                <div
                  className="card card-body"
                  style={{ backgroundColor: "#7c0a02" }}
                >
                  <div className="row">
                    <div className="col-sm-8">
                      <h6 className="tx-uppercase tx-11 tx-spacing-1 tx-white tx-semibold mg-b-1">
                        Rejected Orders
                      </h6>
                    </div>
                    <div className="col-sm-4 mt-n3">
                      <Briefcase size={40} color="white" />
                    </div>
                  </div>
                  <div className="row mt-2 mb-2 ">
                    <div className="col-sm-6">
                      <h6 className="tx-normal tx-white tx-rubik mg-b-0 mg-r-5 lh-1">
                        Users
                      </h6>
                      <p className="tx-11 tx-color-03 mg-b-0">
                        <span className="tx-medium tx-white">0</span>
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <h6 className="tx-normal tx-white tx-rubik mg-b-0 mg-r-5 lh-1">
                        Restaurant
                      </h6>
                      <p className="tx-11 tx-color-03 mg-b-0">
                        <span className="tx-medium tx-white">0</span>
                      </p>
                    </div>
                  </div>
                </div>
                {/* Rejected */}
                <div className="card card-footer py-0">
                  <Link className="tx-normal tx-white tx-12 mg-b-0 pb-0 px-4">
                    <span className="tx-medium tx-white">More info</span>{" "}
                    <ArrowRightCircle size={14} color="white" />{" "}
                  </Link>
                </div>
              </div>
            </div>

            <div className="row row-xs ml-5 px-4 mg-t-4">
              <div className="col-lg-8 col-xl-8 mg-t-10">
                <div className="card">
                  <div className="card-header pd-t-20 pd-b-0 bd-b-0">
                    <h6 className="mg-b-5">Order Statistics</h6>
                  </div>
                  {/* card-header */}
                  <div className="card-body pd-20">
                    <div className="chart-two mg-b-20">
                      <div id="flotChart2" className="flot-chart" />
                    </div>
                    {/* chart-two */}
                    <div className="row">
                      <div className="col-sm">
                        <h4 className="tx-normal tx-rubik tx-spacing--1 mg-b-5">
                        <small></small>
                        </h4>
                        <p className="tx-11 tx-uppercase tx-spacing-1 tx-semibold mg-b-10 tx-primary">
                          
                        </p>
                        <div className="tx-12 tx-color-03">
                          
                        </div>
                      </div>
                      {/* col */}
                      <div className="col-sm mg-t-20 mg-sm-t-0">
                        <h4 className="tx-normal tx-rubik tx-spacing--1 mg-b-5">
                          <small></small>
                        </h4>
                        <p className="tx-11 tx-uppercase tx-spacing-1 tx-semibold mg-b-10 tx-pink">
                          
                        </p>
                        <div className="tx-12 tx-color-03">
                          
                        </div>
                      </div>
                      {/* col */}
                    </div>
                    {/* row */}
                  </div>
                  {/* card-body */}
                </div>
                {/* card */}
              </div>
              <div className="col-lg-4 col-xl-4 mg-t-10">
                <div className="card">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h6 className="mg-b-0">Sales Revenue</h6>
                    <div className="tx-13 d-flex align-items-center">
                      <span className="mg-r-5">Country:</span>{" "}
                      <a
                        href="dashboard-one.html"
                        className="d-flex align-items-center link-03 lh-0"
                      >
                        Canada <i className="icon ion-ios-arrow-down mg-l-5" />
                      </a>
                    </div>
                  </div>
                  {/* card-header */}
                  <div className="card-body pd-0">
                    <div className="table-responsive">
                      <table className="table table-borderless table-dashboard table-dashboard-one">
                        <thead>
                          <tr>
                            <th className="wd-40">States</th>
                            <th className="wd-25 text-right">Orders</th>
                            <th className="wd-35 text-right">Earnings</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="tx-medium">Ontario</td>
                            <td className="text-right">12,201</td>
                            <td className="text-right">$150,200.80</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* table-responsive */}
                  </div>
                  {/* card-body */}
                </div>
                {/* card */}
              </div>
              {/* col */}
            </div>
          </div>
        </div>
      </>
    
    );
  }
}
