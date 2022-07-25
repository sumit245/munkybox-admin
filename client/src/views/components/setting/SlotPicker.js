import React, { useState } from "react";
export default function SlotPicker({
  slot,
  timepicker,
  deleteSlots,
  addSlots,
}) {
  const [slots, setSlot] = useState(false);
  const handleTimeChange = (e) => {
    const { value } = e.target;
    setSlot(value);
  };
  const addslot = () => {
    addSlots(slots);
  };
  return (
    <>
      <div className="ibox">
        <div className="ibox-heading">
          <h3 className="ibox-title">Current Slots</h3>
        </div>
        <div className="ibox-content">
          {slot.map((sloteName, key) => (
            <div key={key}>
              <div className="row justify-content-between">
                <div className="col-lg-10">
                  <strong>{sloteName.slot_name}: </strong> {sloteName.slot_time}
                </div>
                <div className="col-lg-2">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => deleteSlots(key)}
                  >
                    <i className="fa fa-trash-o" />
                  </button>
                </div>
              </div>
              <hr className="hr-line-solid" />
            </div>
          ))}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8">
          <div className="form-group">
            <label>
              Select a time <strong className="text-danger">*</strong>
            </label>
            <select
              name="slot"
              className="form-control required"
              onChange={(e) => handleTimeChange(e)}
              defaultValue="10-11 AM"
            >
              {timepicker.map((data, key) => (
                <option value={data.time} key={key} name="slot">
                  {data.time}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-lg-4">
          <button
            type="button"
            className="btn btn-primary mt-4"
            onClick={addslot}
          >
            SAVE
          </button>
        </div>
      </div>
    </>
  );
}
