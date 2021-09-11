import React from "react";

export default function CurrentRequest({ partner }) {
  return (
    // <div className="col-lg-8">
    //   <div className="ibox">
    //     <div className="ibox-title">
    //       <h5>
    //
    //       </h5>
    //     </div>
    //   </div>
    // </div>
    <div className="col-lg-8 animated fadeInRight">
      <div className="mail-box-header">
        <div className="float-right tooltip-demo">
          <a
            href="#"
            className="btn btn-white btn-sm"
            data-toggle="tooltip"
            data-placement="top"
            title="Print email"
          >
            <i className="fa fa-print" />{" "}
          </a>
          <a
            href="mailbox.html"
            className="btn btn-white btn-sm"
            data-toggle="tooltip"
            data-placement="top"
            title="Move to trash"
          >
            <i className="fa fa-trash-o" />{" "}
          </a>
        </div>
        <h2>View Message</h2>
        <div className="mail-tools tooltip-demo m-t-md">
          <h3>
            <span className="font-normal">Subject: </span>New Request from{" "}
            {partner.first_name + " " + partner.last_name}
          </h3>
          <h5>
            <span className="float-right font-normal">{partner.datetime}</span>
            <span className="font-normal">From: </span>
            {partner.email}
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
            {partner.first_name + " " + partner.last_name}
            <br />
            <strong>Phone:</strong>
            {partner.phone}
            <br />
            <strong>Status:</strong>
            Pending
          </p>
          <p>
            <strong>
              In the below we can get documents from chef while putting request
            </strong>
          </p>
        </div>
        <div className="mail-attachment">
          <p>
            <span>
              <i className="fa fa-paperclip" /> 2 attachments -{" "}
            </span>
            <a href="#">Download all</a>|<a href="#">View all images</a>
          </p>
          <div className="attachment">
            <div className="file-box">
              <div className="file">
                <a href="#">
                  <span className="corner" />
                  <div className="icon">
                    <i className="fa fa-file" />
                  </div>
                  <div className="file-name">
                    Document_2014.doc
                    <br />
                    <small>Added: Jan 11, 2014</small>
                  </div>
                </a>
              </div>
            </div>
            <div className="file-box">
              <div className="file">
                <a href="#">
                  <span className="corner" />
                  <div className="image">
                    <img alt="image" className="img-fluid" src="img/p1.jpg" />
                  </div>
                  <div className="file-name">
                    Italy street.jpg
                    <br />
                    <small>Added: Jan 6, 2014</small>
                  </div>
                </a>
              </div>
            </div>
            <div className="file-box">
              <div className="file">
                <a href="#">
                  <span className="corner" />
                  <div className="image">
                    <img alt="image" className="img-fluid" src="img/p2.jpg" />
                  </div>
                  <div className="file-name">
                    My feel.png
                    <br />
                    <small>Added: Jan 7, 2014</small>
                  </div>
                </a>
              </div>
            </div>
            <div className="clearfix" />
          </div>
        </div>
        <div className="mail-body text-right tooltip-demo">
          <a className="btn btn-sm btn-white" href="mail_compose.html">
            <i className="fa fa-reply" /> Reply
          </a>
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
