import React from "react";
import AllRequests from "../components/requests/AllRequests";
import CurrentRequest from "../components/requests/CurrentRequest";

export default function Requests() {
  return (
    <div className="wrapper wrapper-content">
      <div className="row">
        <AllRequests />
        <CurrentRequest />
      </div>
    </div>
  );
}
