import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Cuisine from "./Cuisine";
import DeliverySlots from "./DeliverySlots";
import ProfitMargin from "./ProfitMargin";
import Promo from "./Promo";
import ServiceCharges from "./ServiceCharges";
import SummerNoteEditor from "./SummerNoteEditor";

export default function SettingNav() {
  const [key, setKey] = useState("profit_margin");
  return (
    <div className="ibox">
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="profit_margin" title="Profit Margin">
          <ProfitMargin />
        </Tab>
        <Tab eventKey="charges" title="Service Charges">
          <ServiceCharges />
        </Tab>
        <Tab eventKey="cuisine" title="Cuisine">
          <Cuisine />
        </Tab>
        <Tab eventKey="slots" title="Delivery Slots">
          <DeliverySlots />
        </Tab>
        <Tab eventKey="promos" title="Promos">
          <Promo />
        </Tab>
        <Tab eventKey="privacy" title="Privacy Policies">
          <SummerNoteEditor />
        </Tab>
        <Tab eventKey="privacy" title="Create Meal Plan">
          <SummerNoteEditor />
        </Tab>
      </Tabs>
    </div>
  );
}
