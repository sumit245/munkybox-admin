const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Order = new Schema({
  address: { type: Object },
  card: { type: Object },
  discount: { type: String },
  email_id: { type: String },
  end_date: { type: String },
  user_name: { type: String },
  notes: { type: String },
  order_time: {
    type: String,
  },
  phone: { type: String },
  plan: { type: String },
  price: { type: String },
  restaurant: { type: String },
  start_date: { type: String },
  status: {
    type: String,
    default: "pending",
  },
  time: { type: String },
  tip: { type: String },
  total: { type: String },
  user_id: { type: String },
});

module.exports = mongoose.model("Order", Order);
