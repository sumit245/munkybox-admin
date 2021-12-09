import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Tab } from "react-bootstrap";
import SlotPicker from "./SlotPicker";
import { LUNCH, DINNER } from "../../../utilities/slots";

export default function DeliverySlots() {
  const [lunchSlots, setLunchSlots] = useState([]);
  const [dinnerSlots, setdinnerSlots] = useState([]);
  const [key, setKey] = useState("lunch");
  const fetchslots = async () => {
    const response = await axios.get("/api/slots");
    const slots = await response.data;
    const { lunchSlots, dinnerSlots } = slots[0];
    setLunchSlots(lunchSlots);
    setdinnerSlots(dinnerSlots);
  };

  useEffect(() => {
    let components = true;
    if (components) {
      fetchslots();
    }
    return () => {
      components = false;
    };
  }, []);
  const addSlots = (data) => {
    let slot = {};
    if (key === "lunch") {
      slot.id = lunchSlots.length + 1;
      slot.slot_name = "Slot " + parseInt(lunchSlots.length + 1);
      slot.slot_time = data;
      setLunchSlots([...lunchSlots, slot]);
    } else {
      slot.id = dinnerSlots.length + 1;
      slot.slot_name = "Slot " + parseInt(dinnerSlots.length + 1);
      slot.slot_time = data;
      setdinnerSlots([...dinnerSlots, slot]);
    }
  };
  const deleteSlots = (id) => {
    if (key === "lunch") {
      let slots = [...lunchSlots];
      slots.splice(id, 1);
      setLunchSlots(slots);
    } else {
      let dins = [...dinnerSlots];
      dins.splice(id, 1);
      setdinnerSlots(dins);
    }
  };
  const done = async () => {
    const slot = {
      lunchSlots,
      dinnerSlots,
    };
    const response = await axios.put(
      "/api/slots/61601a6cd0b32f4f0cdf35aa",
      slot
    );
    const update = await response.data;
    alert(update.msg);
  };
  return (
    <div>
      <div className="row justify-content-end">
        <button className="btn btn-outline-info" onClick={done}>
          DONE
        </button>
      </div>
      <Tabs
        defaultActiveKey="lunch"
        id="uncontrolled-tab-example"
        className="mb-3"
        onSelect={(key) => setKey(key)}
      >
        <Tab eventKey="lunch" title="Lunch">
          <SlotPicker
            slot={lunchSlots}
            timepicker={LUNCH}
            addSlots={addSlots}
            deleteSlots={deleteSlots}
          />
        </Tab>
        <Tab eventKey="dinner" title="Dinner">
          <SlotPicker
            slot={dinnerSlots}
            timepicker={DINNER}
            addSlots={addSlots}
            deleteSlots={deleteSlots}
          />
        </Tab>
      </Tabs>
    </div>
  );
}
