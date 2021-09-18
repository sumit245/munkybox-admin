import axios from "axios";
import React from "react";

export default function CurrentRequest({ partner }) {
  const handleDelete = (id) => {
    axios
      .delete("http://munkybox-admin.herokuapp.com/api/partnerrequest/" + id)
      .then((alert("Deleted"), window.location.href="/"))
      .catch((err) => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
      });
  };
  return (
    <div className="col-lg-8 animated fadeInRight">
      <div className="mail-box-header">
        <div className="float-right tooltip-demo">
          <button
            title
            data-placement="top"
            data-toggle="tooltip"
            type="button"
            data-original-title="Print"
            className="btn btn-sm btn-white mr-1"
          >
            <i className="fa fa-print" /> Print
          </button>
          <button
            title
            data-placement="top"
            data-toggle="tooltip"
            type="button"
            data-original-title="Print"
            className="btn btn-sm btn-white"
            onClick={() => handleDelete(partner.data._id)}
          >
            <i className="fa fa-trash-o" /> Delete
          </button>
        </div>
        <h2>View Message</h2>
        <div className="mail-tools tooltip-demo m-t-md">
          <h3>
            <span className="font-normal">Subject: </span>New Request from{" "}
            {partner.data.first_name + " " + partner.data.last_name}
          </h3>
          <h5>
            <span className="float-right font-normal">{partner.data.created_at}</span>
            <span className="font-normal">From: </span>
            {partner.data.email}
          </h5>
        </div>
      </div>
      <div className="mail-box">
        <div className="mail-body">
          <p>
            Hello Admin!
            <br />
            <br />
            Here we can put sample text and other details from chef request
          </p>
          <p>
            <strong> Chef Name:</strong>{" "}
            {partner.data.first_name + " " + partner.data.last_name}
            <br />
            <strong>Phone:</strong>
            {partner.data.phone}
            <br />
            <strong>Postal Code:</strong>
            {partner.data.postal_code}
            <br />
          </p>
          <p>
            <strong>
              In the below we can get documents from chef while putting request
            </strong>
          </p>
        </div>

        <div className="mail-body text-right tooltip-demo">
          <button
            title
            data-placement="top"
            data-toggle="tooltip"
            type="button"
            data-original-title="Print"
            className="btn btn-sm btn-white mr-1"
          >
            <i className="fa fa-reply" /> Reply
          </button>
          <button
            title
            data-placement="top"
            data-toggle="tooltip"
            type="button"
            data-original-title="Print"
            className="btn btn-sm btn-white"
          >
            <i className="fa fa-print" /> Print
          </button>
        </div>
      </div>
    </div>
  );
}
