import axios from "axios";
import React from "react";

export default function CurrentRequest({ partner }) {
  const handleDelete = (id) => {
    axios
      .delete("/api/partnerrequest/" + id)
      .then((alert("Deleted"), (window.location.href = "/")))
      .catch((err) => {
        alert(err);
      });
  };
  const handleDone = async () => {
    const id = partner.data._id;
    const status = { status: "Done" };
    const response = await axios.put("/api/partnerrequest/" + id, status);
    if (response !== null) {
      window.location.reload();
    }
  };
  const handleReject = async () => {
    const id = partner.data._id;
    const status = { status: "Reject" };
    const response = await axios.put("/api/partnerrequest/" + id, status);
    if (response !== null) {
      window.location.reload();
    }
  };
  return (
    <div className="col-lg-8 animated fadeInRight">
      <div className="mail-box-header">
        <div className="float-right tooltip-demo">
          <button
            data-placement="top"
            data-toggle="tooltip"
            type="button"
            data-original-title="Print"
            className="btn btn-sm btn-white mr-1"
          >
            <i className="fa fa-print" /> Print
          </button>
          <button
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
        <h2 className="row">
          View Message
          <h6>
            <i
              className={
                partner.data.status === "Done"
                  ? "fa fa-circle text-success mx-2"
                  : partner.data.status === "Reject"
                  ? "fa fa-circle text-danger mx-2"
                  : "fa fa-circle text-warning mx-2"
              }
            />
          </h6>
        </h2>

        <div className="mail-tools tooltip-demo m-t-md">
          <h3>
            <span className="font-normal">Subject: </span>New Request from{" "}
            {partner.data.first_name + " " + partner.data.last_name}
          </h3>
          <h5>
            <span className="float-right font-normal">
              {partner.data.created_at}
            </span>
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
            <strong>Restaurant Name: </strong>
            {partner.data.restaurant_name}
            <br />
            <strong>Phone:</strong>
            {partner.data.phone}
            <br />
            <strong>Postal Code:</strong>
            {partner.data.postal_code}
            <br />
          </p>
        </div>

        <div className="mail-body text-right tooltip-demo ">
          <button
            data-placement="top"
            data-toggle="tooltip"
            type="button"
            data-original-title="Print"
            className="btn btn-sm btn-success mr-1"
            onClick={handleDone}
          >
            <i className="fa fa-check" /> Done
          </button>
          <button
            data-placement="top"
            data-toggle="tooltip"
            type="button"
            data-original-title="Print"
            className="btn btn-sm btn-danger"
            onClick={handleReject}
          >
            <i className="fa fa-times" /> Reject
          </button>
        </div>
      </div>
    </div>
  );
}
