import React, { useEffect, useState } from "react";
import AllRequests from "../components/requests/AllRequests";
import CurrentRequest from "../components/requests/CurrentRequest";
import { useParams } from "react-router";
import axios from "axios";

export default function Requests() {
  const { id } = useParams();
  const [partner, setPartner] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/partnerrequest/" + id)
      .then((res) => {
        console.log(res);
        setPartner(res.data)
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="wrapper wrapper-content">
      <div className="row">
        <AllRequests />
        <CurrentRequest partner={partner} />
      </div>
    </div>
  );
}
