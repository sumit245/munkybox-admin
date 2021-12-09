import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Tabs, Tab } from "react-bootstrap";
import AddressDetails from "./AddressDetails";
import PaymentDetails from "./PaymentDetails";
import PersonalDetails from "./PersonalDetails";

export default function ViewUser() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loaded, setLoaded] = useState(false);
  const fetchUserById = async (id) => {
    const response = await axios.get("/api/users/" + id);
    const data = await response.data;
    setUser(data);
    setLoaded(true);
  };
  useEffect(() => {
    fetchUserById(id);
  }, [id]);
  if (loaded) {
    return (
      <div className="wrapper wrapper-content">
        <Tabs
          defaultActiveKey="personal"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="personal" title="Personal Details">
            <PersonalDetails user={user} />
          </Tab>
          <Tab eventKey="address" title="Address Details">
            <AddressDetails address={user.addresses} />
          </Tab>
          <Tab eventKey="payment" title="Payment Details">
            <PaymentDetails cards={user.cards} />
          </Tab>
        </Tabs>
      </div>
    );
  } else {
    return null;
  }
}
