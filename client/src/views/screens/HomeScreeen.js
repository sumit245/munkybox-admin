import React, { Component } from "react";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import DummyTable from "../components/users/read/DummyTable";
import { getClients } from "../../controllers/ClientController";
import ErrorBoundary from "../components/ErrorBoundary";
import {
  Users,
} from "react-feather";


const Clt = getClients();
export default class HomeScreeen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      ClientData: [],
      active: [],
      inactive: [],
      name: "",
    };
  }

  componentDidMount() {
    Clt.then((data) => {
      let active = data.filter(function (e) {
        return e.status === 'Active'
      })
      let inactive = data.filter(function (e) {
        return e.status === 'Inactive'
      })

      this.setState({ ClientData: data, active: active, inactive: inactive })

    })
      .catch((err) => {
        console.log(err);
      });

  }
  render() {
    const { err, ClientData, active, inactive } = this.state;

    if (err) {
      return <div className="contact-wrapper">Error:{err.message}</div>;
    } else {
      return (
        <>
          <TopNav />
          <div className="contact-wrapper">
            <SideNav />
            <div
              style={{
                position: "absolute",
                left: 157,
                top: 20,
                width: 1200,
                overflowX: "hidden",
              }}
            >
              <div className="row mb-4">
                <div
                  className="col-sm-3 ml-5 col-lg-3 px-0"
                  style={{ backgroundColor: "aliceblue" }}
                >
                  <div
                    className="card card-body px-1"
                    style={{ backgroundColor: "blue" }}
                  >
                    <div className="row">
                      <div className="col-sm-8">
                        <h6 className="tx-normal tx-11 tx-spacing-1 tx-white tx-semibold mg-b-1">
                          All Users
                        </h6>
                        <h6 className="tx-40 tx-spacing-1 tx-white tx-semibold mg-b-5">
                          {ClientData.length}
                        </h6>
                      </div>
                      <div className="col-sm-4 mt-n3">
                        <Users size={40} color="#FFF" />
                      </div>
                    </div>

                  </div>

                </div>
                {/* All Users */}
                <div
                  className="col-sm-3 ml-5 col-lg-3 px-0"
                  style={{ backgroundColor: "teal" }}
                >
                  <div
                    className="card card-body px-1"
                    style={{ backgroundColor: "green" }}
                  >
                    <div className="row">
                      <div className="col-sm-8">
                        <h6 className="tx-normal tx-11 tx-spacing-1 tx-white tx-semibold mg-b-1">
                          Active Users
                        </h6>
                        <h6 className="tx-40 tx-spacing-1 tx-white tx-semibold mg-b-5">
                          {active.length}
                        </h6>
                      </div>
                      <div className="col-sm-4">
                        <Users size={40} color="#FFF" />
                      </div>
                    </div>
                  </div>
                </div>
                {/*Active Users  */}
                <div
                  className="col-sm-3 ml-5 col-lg-3 px-0"
                  style={{ backgroundColor: "red" }}
                >
                  <div
                    className="card card-body px-1"
                    style={{ backgroundColor: "#ff0000" }}
                  >
                    <div className="row">
                      <div className="col-sm-8">
                        <h6 className="tx-normal tx-11 tx-spacing-1 tx-white tx-semibold mg-b-1">
                          Inactive Users
                        </h6>
                        <h2 className="tx-40 tx-spacing-1 tx-white tx-semibold mg-b-5">
                          {inactive.length}
                        </h2>
                      </div>
                      <div className="col-sm-4 mt-n3">
                        <Users size={40} color="white" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Inactive Users */}
              </div>

              <ErrorBoundary>
                <DummyTable userdata={ClientData} />
              </ErrorBoundary>
            </div>
          </div>
        </>
      );
    }
  }
}
