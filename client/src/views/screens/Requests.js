import React, { useEffect, useState } from "react";
import AllRequests from "../components/requests/AllRequests";
import CurrentRequest from "../components/requests/CurrentRequest";
import { useParams } from "react-router";
import axios from "axios";

export default function Requests() {
  const { id } = useParams();
  const [partner, setPartner] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get("/api/partnerrequest/" + id)
      .then((res) => {
        setPartner(res.data);
        setLoading(true);
      })
      .catch((err) => console.error(err));
  }, [id]);
  return (
    <div className="wrapper wrapper-content">
      <div className="row">
        <AllRequests />
        {loading && <CurrentRequest partner={partner} />}
      </div>
    </div>
  );
}
