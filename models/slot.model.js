const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Slot = new Schema({
  lunchSlots: {
    type: Array,
    items: [
      {
        id: String,
        slot_name: String,
        slot_time: String,
      },
    ],
  },
  dinnerSlots: {
    type: Array,
    items: [
      {
        id: String,
        slot_name: String,
        slot_time: String,
      },
    ],
  },
});

module.exports = mongoose.model("Slot", Slot);
