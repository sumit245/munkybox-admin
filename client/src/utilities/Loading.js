import React from "react";

function Loading() {
  return (
    <div className="progress">
      <div
        className="progress-bar progress-bar-striped progress-bar-animated progress-bar-danger"
        style={{ width: "50%" }}
        role="progressbar"
        aria-valuenow="50"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  );
}

export default Loading;
