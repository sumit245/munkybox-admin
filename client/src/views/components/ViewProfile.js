import { Modal } from "react-bootstrap";
import React, { Component } from "react";

export default class ViewProfile extends Component {
  state = {
    isOpenChange: false,
  };
  hideModal = () => {
    this.setState({ isOpenChange: false });
  };
  showModal = () => {
    this.setState({ isOpenChange: true });
  };

  render() {
    return (
      <div className="contact-content p-3 ml-n5">
        <div
          data-label="Profile Setting "
          className="df-example demo-forms mb-4"
        >
          <form
            id="selectForm2"
            className="parsley-style-1"
            
          >
            <div className="d-flex justify-content-end ">
              <div className="px-2">
                <button
                  className="btn btn-sm  btn-icon btn-white px-4 mx-1"
                  onClick={this.showModal}
                >
                  Change Password
                </button>
                <button
                  className="btn btn-sm  btn-icon btn-primary px-4 mx-1"
                >
                  Edit
                </button>
              </div>
            </div>
            <div className="p-3">
              <div className="row mt-2">
                <div className="col-md-6 mx-n3">
                  <label className="labels">User Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User Name"
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
              </div>
              <div className="row mt-2">
                <label className="labels">Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter phone number"
                />
              </div>
              <div className="row mt-2">
                <label className="labels">Address Line 1</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter address line 1"
                />
              </div>
              <div className="row mt-2">
                <label className="labels">Address Line 2</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter address line 2"
                />
              </div>
              <div className="row mt-2">
                <label className="labels">Postcode</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Postal Code"
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">Country</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="country"
                />
              </div>
              <div className="col-md-6">
                <label className="labels">State/Region</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="state"
                />
              </div>
            </div>
          </form>
        </div>
        <Modal
          show={this.state.isOpenChange}
          onHide={this.hideModal}
          className="modal fade"
        >
          <Modal.Header className="modal-header">
            <h4 className="modal-title">Change Password</h4>
            <button
              type="button"
              onClick={this.hideModal}
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              ×
            </button>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="••••••"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="••••••"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>
                    Confirm <span className="d-none d-xl-inline">Password</span>
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="••••••"
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <div className="row">
                <div className="col-md-6">
            <input
              type="button"
              onClick={this.hideModal}
              className="btn btn-white"
              data-dismiss="modal"
              defaultValue="Cancel"
            />
            </div>
            <div className="col-md-6">
            <input
              type="submit"
              value="Delete"
              className="btn btn-danger"
              defaultValue="Delete"
              onClick={this.deletestaff}
            />
            </div>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
    
}
