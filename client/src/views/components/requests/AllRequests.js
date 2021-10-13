import React, { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";

export default function AllRequests() {
  const [request, setRequest] = useState([]);
  useEffect(() => {
    axios
      .get("/api/partnerrequest")
      .then((res) => {
        setRequest(res.data.data);
      });
  }, []);
  return (
    <div className="col-lg-4">
      <div className="ibox">
        <div className="ibox-title">
          <h5>Current Requests</h5>
          <div className="row row-sm mx-1">
            <input
              type="search"
              id="searchrequest"
              className="col-sm-9 form-control"
              placeholder="Search"
            />
            <button
              className="btn btn-white col-sm-2"
              id="btnTrigger"
              data-toggle="modal"
              data-target="#mymodal"
              onClick={() => $("#mymodal").show("fast")}
            >
              <i className="fa fa-filter" />
            </button>
          </div>
          <div className="modal" tabindex="-1" role="dialog" id="mymodal">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modal title</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row row-sm">
                    <div className="col-sm-4 border-right">
                      <div className="border-bottom center">
                        <p className="btn btn-white active">Status</p>
                      </div>
                      <div className="border-bottom center">
                        <p>Date</p>
                      </div>
                    </div>
                    <div className="col-sm-8">
                      <div>
                        <label>
                          <input type="checkbox" value="" /> Pending{" "}
                        </label>
                      </div>
                      <div>
                        <label>
                          <input type="checkbox" value="" /> Done{" "}
                        </label>
                      </div>
                      <div>
                        <label>
                          <input type="checkbox" value="" /> Rejected{" "}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary">
                    Apply
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={() => $("#mymodal").hide("fast")}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ibox-content no-padding">
          <ul
            className="list-group"
            style={{ overflowY: "scroll", height: 600, paddingBottom: 10 }}
          >
            {request.map((data, key) => (
              <li className="list-group-item" key={key}>
                <p>
                  <a className="text-info" href="/">
                    {data.first_name + " " + data.last_name}
                  </a>{" "}
                  want to get partnership for his restaurant{" "}
                  <a className="text-info" href="/">
                    @{data.restaurant_name}
                  </a>{" "}
                </p>

                <small className="block text-muted">
                  <i className="fa fa-clock-o"></i> {data.created_at}
                </small>
                <a
                  className="text-center text-success align-self-center "
                  href={`/newrequest/${data._id}`}
                >
                  Click to See more
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
