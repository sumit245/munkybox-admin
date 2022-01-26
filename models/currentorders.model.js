const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CurrentOrder = new Schema({
  order_id: { type: String },
  add_on: {
    type: Array,
    items: [
      {
        item: { type: String },
        order_date: { type: String },
        rate: { type: String },
        qty: { type: String },
        subtotal: { type: String },
        price: { type: String },
      },
    ],
  },
  delivered: {
    type: Boolean,
    default: false,
  },
  skipped: {
    type: Boolean,
    default: false,
  },
  paused: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("CurrentOrder", CurrentOrder);
