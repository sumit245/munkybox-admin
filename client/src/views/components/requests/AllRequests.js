import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AllRequests() {
  const [request, setRequest] = useState([]);
  useEffect(() => {
    axios.get("https://munkybox-admin.herokuapp.com/api/partnerrequest").then((res) => {
      setRequest(res.data.data);
    });
  }, []);
  return (
    <div className="col-lg-4">
      <div className="ibox">
        <div className="ibox-title">
          <h5>Current Requests</h5>
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
                  <i className="fa fa-clock-o"></i> {data.datetime}
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
