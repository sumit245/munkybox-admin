import React, { Component } from "react";

export default class CompanySetup extends Component {
  render() {
    return (
      <div
        className="contact-content p-3 ml-n5"
        style={{ height: 600, overflowY: "scroll" }}
      >
        <div data-label="Company Setup " className="df-example demo-forms mb-4">
          <form
            id="selectForm"
            className="parsley-style-1"
            method="post"
            data-parsley-validate
            noValidate
          >
            <div className="d-flex justify-content-end ">
              <div className="px-2">
                <button
                  type="submit"
                  className="btn btn-sm  btn-icon btn-white px-4 mx-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-sm  btn-icon btn-primary px-4 mx-1"
                >
                  Edit
                </button>
              </div>
            </div>
            <div className="p-3">
              <div className="row mt-2">
                <div className="col-md-6 mx-n3">
                  <label className="labels">Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Company Name"
                  />
                </div>
                <div className="col-md-6 ml-3">
                  <label className="labels">Logo</label>
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div data-label="Billing Setup " className="df-example demo-forms mb-4">
          <form
            id="selectForm1"
            className="parsley-style-1"
            method="post"
            data-parsley-validate
            noValidate
          >
            <div className="d-flex justify-content-end ">
              <div className="px-2">
                <button
                  type="submit"
                  className="btn btn-sm  btn-icon btn-white px-4 mx-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-sm  btn-icon btn-primary px-4 mx-1"
                >
                  Edit
                </button>
              </div>
            </div>
            <div className="p-3">
              <div className="row mt-2">
                <div className="col-md-6 mx-n3">
                  <label className="labels">GST Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Gst Number"
                  />
                </div>
                <div className="col-md-6 ml-3">
                  <label className="labels">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="row mt-2 px-3">
                  <label className="labels">Contact Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Contact Number"
                  />
                </div>
              </div>
              <div className="row mt-2 ">
                <label className="labels">Address</label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Address"
                />
              </div>
            </div>
          </form>
        </div>
        <div
          data-label="Challan Number Format"
          className="df-example demo-forms mb-4"
        >
          <form
            id="selectForm2"
            className="parsley-style-1"
            method="post"
            data-parsley-validate
            noValidate
          >
            <div className="p-3">
              <div className="row mt-2">
                <div className="col-md-4 mx-n3">
                  <label className="labels">Prefix</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Inv-2017-18"
                  />
                </div>
                <div className="col-md-4 ml-3">
                  <label className="labels">Sl. No</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="col-md-4 ml-3">
                  <button
                    type="submit"
                    className="btn btn-sm  btn-icon btn-white px-4 mx-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-sm  btn-icon btn-primary px-4 mx-1"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
