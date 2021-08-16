import React, { Component } from "react";
import "jquery";
import "../../assets/css/dashforge.css";
import $ from "jquery";
import DisplayContent from "./DisplayContent";
import EditContent from "./EditContent";
import SidebarClient from "./SidebarClient";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import { deleteClient, getClients } from "../../controllers/ClientController";
import { arrayFindObjectByProp } from "../../helper/arrayFindObjectByProp";
import { Dropdown, Modal } from "react-bootstrap";
import {
  Save,
  Edit2,
  Trash,
  MoreVertical,
  CreditCard,
  Book,
} from "react-feather";
import {
  getChallans,
  updateChallans,
} from "../../controllers/ChallanController";
import { addPayments } from "../../controllers/PaymentController";
let Challans = getChallans();
const Clt = getClients();
export default class ClientTable extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.state = {
      editState: false,
      isLoaded: true,
      ClientData: [],
      err: null,
      mobile: "",
      challandetails: [],
      allChallans: [],
    };
  }
  handler() {
    this.setState((prevstate) => ({ editState: !prevstate.editState }));
    console.log(`${this.state.editState}`);
  }

  onAcceptPay = () => {
    let modal = document.getElementById("acceptPayForm");
    modal.style.display = "block";
  };
  acceptPayment = () => {
    const challanupdater = {};
    const newPayment = this.state;
    newPayment.collected_by = "Admin";
    newPayment.challan_num = newPayment.challandetails.challan_num;
    newPayment.client_name = newPayment.challandetails.client_name;
    newPayment.collection_date = "12 jan 2012";
    let x = parseInt(newPayment.collection_amount);
    let y = parseInt(newPayment.challandetails.balance);
    console.log(x, y);
    if (x > y) {
      $("#amountHelper").text("invalid amount").fadeOut(3000);
    } else {
      console.log("no");
      newPayment.balance =
        newPayment.challandetails.balance - newPayment.collection_amount;
      if (newPayment.balance > 0) {
        newPayment.status = "Pending";
      } else {
        newPayment.status = "Settled";
      }
      challanupdater.balance = newPayment.balance;
      challanupdater.status = newPayment.status;
      challanupdater.challan_num = newPayment.challandetails.challan_num;
      challanupdater.challan_date = newPayment.challandetails.challan_date;
      challanupdater.client_name = newPayment.challandetails.client_name;
      challanupdater.mobile_number = newPayment.challandetails.mobile_number;
      challanupdater.company = newPayment.challandetails.company;
      challanupdater.address = newPayment.challandetails.address;
      challanupdater.item_name = newPayment.challandetails.item_name;
      challanupdater.item_cost = newPayment.challandetails.item_cost;
      challanupdater.quantity = newPayment.challandetails.quantity;
      challanupdater.item_disc = newPayment.challandetails.item_disc;
      challanupdater.item_description =
        newPayment.challandetails.item_description;
      challanupdater.gst_num = newPayment.challandetails.gst_num;
      challanupdater.item_price = newPayment.challandetails.item_price;
      challanupdater.grand_disc = newPayment.challandetails.grand_disc;
      challanupdater.grand_total = newPayment.challandetails.grand_total;
      challanupdater.amount_paid = newPayment.collection_amount;

      updateChallans(newPayment.challandetails._id, challanupdater);
      addPayments(newPayment);
      window.location.href =
        "/challandetail?data=" + newPayment.challandetails.challan_num;
    }
    console.log(newPayment);
  };

  componentDidMount() {
    var url = window.location.href;
    var data = url.split("data=").pop();
    this.setState({ mobile: data });
    Challans.then((data) => data)
      .then((json) => {
        this.setState({ allChallans: json });
      })
      .catch((err) => {
        console.log(err);
      });
    Clt.then((data) => data)
      .then(
        (json) => {
          this.setState({ isLoaded: true, ClientData: json });
        },
        (err) => {
          this.setState({ isLoaded: true, err });
          console.log(err);
        }
      )
      .catch((err) => {
        console.log(err);
      });
    $("#tabClients").addClass("active show");
    $("#contactInformation").addClass("active show");
    $("#continfo").addClass("active");
    $("#continfo").text("client");
    $("#deleteclient").on("click", function () {
      let dltmdl = document.getElementById("modalDeleteContact");
      dltmdl.style.display = "block";
    });
    $("#closearr").on("click", function () {
      let dltmdl = document.getElementById("modalDeleteContact");
      dltmdl.style.display = "none";
    });
    $("#closebtn").on("click", function () {
      let dltmdl = document.getElementById("modalDeleteContact");
      dltmdl.style.display = "none";
    });
  }
  abortController = new AbortController();
  componentWillUnmount() {
    this.abortController.abort();
  }
  deleteClients = () => {
    const { ClientData, mobile } = this.state;
    var client = arrayFindObjectByProp(ClientData, "mobile_number", mobile);
    let idx = client._id;
    deleteClient(idx);
    window.location.href = "/";
  };
  render() {
    const { isLoaded, ClientData, mobile } = this.state;
    if (isLoaded) {
      var client = arrayFindObjectByProp(ClientData, "mobile_number", mobile);
      // console.log(client)
      return (
        <>
          <TopNav />
          <div className="contact-wrapper">
            <SideNav />
            <SidebarClient client={client} />

            <div className="contact-content">
              <div className="contact-content-header">
                <nav className="nav">
                  <a
                    href="#contactInformation"
                    id="continfo"
                    className="nav-link"
                  >
                    Client
                  </a>
                  <a
                    href="#moreInformation"
                    id="moreinfo"
                    className="nav-link"
                  >
                    More
                  </a>
                  
                </nav>
                <div style={{ position: "fixed", right: 300 }}>
                  <nav className="navbar navbar-right mg-l-auto">
                    <div className="nav-item ml-1">
                      <button
                        id="edtclnt"
                        onClick={this.onAcceptPay}
                        className="btn btn-sm btn-white "
                      >
                        <CreditCard />
                      </button>
                    </div>
                    <div className="nav-item ml-1">
                      <button
                        id="edtclnt"
                        onClick={this.handler}
                        className="btn btn-sm btn-white"
                      >
                        <Book />
                      </button>
                    </div>

                    {/* <div className=''> */}
                    <div className="nav-item ml-1">
                      <button
                        id="edtclnt"
                        onClick={this.handler}
                        className="btn btn-sm btn-white"
                      >
                        {this.state.editState ? <Save /> : <Edit2 />}
                      </button>
                    </div>
                    <div className="nav-item ml-1">
                      <button
                        id="deleteclient"
                        data-toggle="modal"
                        className="btn btn-sm btn-white"
                      >
                        <Trash />
                      </button>
                    </div>
                  </nav>
                </div>

                {/* </div>   */}
              </div>
              {/* contact-content-header */}
              <div className="contact-content-body">
                <div className="tab-content">
                  {this.state.editState ? (
                    <EditContent client={client} />
                  ) : (
                    <DisplayContent client={client} key={mobile} />
                  )}
                  {/* tab-pane */}
                </div>
                {/* tab-content */}
              </div>
              {/* contact-content-body */}
              <div className="contact-content-sidebar"></div>
              {/* contact-content-sidebar */}
            </div>
            {/* contact-content */}
            <Modal
              className="modal"
              id="acceptPayForm"
              tabIndex={-1}
              role="dialog"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-sm"
                role="document"
              >
                <div className="modal-content">
                  <Modal.Header className="modal-header">
                    <h6 className="modal-title">Accept Payment</h6>
                    <button
                      type="button"
                      className="close"
                      id="closearr"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </Modal.Header>
                  <Modal.Body className="modal-body">
                    <form>
                      <div className="row row-sm">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label
                              htmlFor="amountpaid"
                              className="col-form-label"
                            >
                              Amount
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="amountpaid"
                              name="collection_amount"
                              value={this.state.collection_amount}
                              onChange={this.onChangeHandler}
                            />
                            <small
                              id="amountHelper"
                              class="form-text text-danger"
                            ></small>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label
                              htmlFor="modeofpayment"
                              className="col-form-label"
                            >
                              Mode
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="payment_mode"
                              onChange={this.onChangeHandler}
                              value={this.state.payment_mode}
                              id="moddeofpayment"
                            />
                          </div>
                        </div>
                      </div>

                      {/* <div className="row row-sm"> */}
                      <div className="form-group">
                        <label htmlFor="txnId">Transaction Id</label>
                        <input
                          type="text"
                          name="transaction_id"
                          onChange={this.onChangeHandler}
                          value={this.state.transaction_id}
                          className="form-control col-sm-12"
                          id="txnId"
                        />
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="message-text"
                          className="col-form-label"
                        >
                          Comment
                        </label>
                        <textarea
                          className="form-control"
                          maxLength={5}
                          id="message-text"
                          name="comments"
                          onChange={this.onChangeHandler}
                          value={this.state.comments}
                        />
                      </div>
                      {/* </div> */}
                    </form>
                  </Modal.Body>
                  <Modal.Footer className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      id="closebtn"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={this.acceptPayment}
                      className="btn btn-primary"
                    >
                      Accept Payment
                    </button>
                  </Modal.Footer>
                </div>
              </div>
            </Modal>
            <div
              className="modal"
              id="modalDeleteContact"
              tabIndex={-1}
              role="dialog"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-sm"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h6 className="modal-title">Delete Contact</h6>
                    <button
                      type="button"
                      className="close"
                      id="closearr"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p className="mg-b-0">
                      Do you really want to delete this contact?
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      id="closebtn"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={this.deleteClients}
                      className="btn btn-primary"
                    >
                      Continue Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}
