import React, { Component } from "react";
import { Edit, Trash } from "react-feather";
import $ from "jquery";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { Switch } from "@material-ui/core";
import { Link } from 'react-router-dom'

const state = {
  staffData: [
    {
      staff_name: "sumit",
      mobile_number: "912",
      address: "a",
      emailid: "b",
    },
  ],
  isOpen: false,
};
export default class CreateUserForm extends Component {

  deletestaff() {
    axios
      .delete("/api/staff/" + this.state.delete_id)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => alert(err));
  }
  edtStaff(idofstaff) {
    axios
      .get("/api/staff/" + idofstaff)
      .then((res) => {
        this.setState({
          staffid: idofstaff,
          staffName: res.data.staff_name,
          staffMob: res.data.mobile_number,
          staffAdd: res.data.address,
          staffEmail: res.data.email_id,
        });
      })
      .catch((err) => console.log(err));
  }
  componentDidMount() {
    // $('[data-toggle="tooltip"]').tooltip();

    // Select/Deselect checkboxes
    var checkbox = $('table tbody input[type="checkbox"]');
    $("#selectAll").click(function () {
      if (this.checked) {
        checkbox.each(function () {
          this.checked = true;
        });
      } else {
        checkbox.each(function () {
          this.checked = false;
        });
      }
    });
    checkbox.click(function () {
      if (!this.checked) {
        $("#selectAll").prop("checked", false);
      }
    });
    axios
      .get("/api/staff/")
      .then((res) => {
        this.setState({ staffData: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  showModal = () => {
    this.setState({ isOpen: true });
  };

  render() {
    return (
      <div className="contact-content p-3 ml-n5">
        <div className="table-title">
          <div className="row">
            <div className="col-sm-6">
              <h2>
                Manage <b>Staff</b>
              </h2>
            </div>
            <div className="col-sm-6 ml-6 d-flex justify-content-end my-2">
              <button
                onClick={this.showModal}
                className="btn btn-sm  btn-icon btn-white px-4 mx-1"
                data-toggle="modal"
              >
                <span>Delete</span>
              </button>
              <Link
                to="#addEmployeeModal"
                className="btn btn-sm  btn-icon btn-primary px-4 mx-1"
                data-toggle="modal"
              >
                <span>Add</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="table-responsive card">
          <table className="table table-hover">
            <thead style={{ backgroundColor: "#f5f6fa", fontWeight: "bold" }} >
              <tr>
                <th>
                  <span className="mx-n3 px-0 custom-checkbox">
                    <input type="checkbox" id="selectAll" />
                    <label htmlFor="selectAll" />
                  </span>
                </th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.staffData.map((data, key) => {
                return (
                  <tr key={key}>
                    <td>
                      <span className="mx-n3 px-0 custom-checkbox">
                        <input
                          type="checkbox"
                          id="checkbox1"
                          name="options[]"
                          defaultValue={1}
                        />
                        <label htmlFor="checkbox1" />
                      </span>
                    </td>
                    <td>{data.staff_name}</td>
                    <td>{data.mobile_number}</td>
                    <td>{data.address}</td>
                    <td>{data.email_id}</td>
                    <td>{data.email_id}</td>
                    <td>
                      <Link to="#editEmployeeModal" data-toggle="modal">
                        <Edit
                          size={16}
                          data-toggle="tooltip"
                          title="Edit"
                          onClick={() => {
                            this.edtStaff(data._id);
                          }}
                        />
                      </Link>
                      <Link to="#deleteEmployeeModal" data-toggle="modal">
                        <Trash
                          size={16}
                          className="tx-danger"
                          data-toggle="tooltip"
                          onClick={() => {
                            this.setState({ delete_id: data._id });
                          }}
                          title="Delete"
                        />
                      </Link>
                      <Link to="#deleteEmployeeModal" data-toggle="modal">
                        <Switch
                          size="small"
                          color="primary"
                          data-toggle="tooltip"
                          title="Active"
                        />
                      </Link>

                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <DeleteModal />
        <AddModal />
        <EditModal />
      </div>
    );
  }
}

class DeleteModal extends Component {
  hideModal = () => {
    this.setState({ isOpen: false });
  };
  render() {
    const isOpen = state.isOpen;
    return (
      <>
        <Modal show={isOpen} onHide={this.hideModal} className="modal fade">
          <Modal.Header className="modal-header">
            <h4 className="modal-title">Delete Employee</h4>
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
            <p>Are you sure you want to delete these Records?</p>
            <p className="text-warning">
              <small>This action cannot be undone.</small>
            </p>
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
      </>
    );
  }
}

class AddModal extends Component {
  hideModal = () => {
    this.setState({ isOpen: false });
  };
  render() {
    const isOpen = state.isOpen;
    return (
      <>
        <Modal
          id="addEmployeeModal"
          show={isOpen}
          onHide={this.hideModal}
          className="modal fade"
        >
          <form>
            <Modal.Header className="modal-header">
              <h4 className="modal-title">Add Users</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                ×
              </button>
            </Modal.Header>
            <Modal.Body className="modal-body">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={state.staffName}
                // onChange={onStaffNameChanged}
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Mobile</label>
                    <input
                      type="phone"
                      className="form-control"
                      value={state.staffMob}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={state.staffEmail}

                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={state.staffMob}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Role</label>
                    <select class="custom-select">
                      <option selected>Select a Role</option>
                      <option value="1">Admin</option>
                      <option value="2">Accountant</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea
                  className="form-control"
                  value={state.staffAdd}
                />
              </div>
            </Modal.Body>
            <Modal.Footer className="modal-footer">
              <div className="row row-sm">
                <div className="col-md-6">
                  <input
                    type="button"
                    className="btn btn-white"
                    data-dismiss="modal"
                    defaultValue="Cancel"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="submit"
                    value="Add"
                    className="btn btn-primary"
                    defaultValue="Add"
                    onClick={this.addStaff}
                  />
                </div>
              </div>
            </Modal.Footer>
          </form>
        </Modal>
      </>
    );
  }
}

class EditModal extends Component {
  hideModal = () => {
    this.setState({ isOpen: false });
  };
  render() {
    const isOpen = state.isOpen;
    return (
      <>
        <Modal
          id="addEmployeeModal"
          show={isOpen}
          onHide={this.hideModal}
          className="modal fade"
        >
          <form>
            <Modal.Header className="modal-header">
              <h4 className="modal-title">Edit Users</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                ×
                  </button>
            </Modal.Header>
            <Modal.Body className="modal-body">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={state.staffName}

                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Mobile</label>
                    <input
                      type="phone"
                      className="form-control"
                      value={state.staffMob}

                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={state.staffEmail}

                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={state.staffMob}

                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Role</label>
                    <select class="custom-select">
                      <option selected>Select a Role</option>
                      <option value="1">Admin</option>
                      <option value="2">Accountant</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea
                  className="form-control"
                  value={state.staffAdd}

                />
              </div>
            </Modal.Body>
            <Modal.Footer className="modal-footer">
              <div className="row row-sm">
                <div className="col-md-6">
                  <input
                    type="button"
                    className="btn btn-white"
                    data-dismiss="modal"
                    defaultValue="Cancel"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="submit"
                    value="Save"
                    className="btn btn-primary"
                    defaultValue="Add"
                    onClick={this.addStaff}
                  />
                </div>
              </div>
            </Modal.Footer>
          </form>
        </Modal>
      </>
    );
  }

}