const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Order = new Schema({
  order_id: { type: String },
  restaurant_id:{type:String},
  user_id: { type: String },
  user_name: { type: String },
  phone: { type: String },
  email_id: { type: String },
  address: { type: Object },
  card: { type: Object },
  start_date: { type: String },
  end_date: { type: String },
  restaurant: { type: String },
  plan: { type: String },
  price: { type: String },
  tip: { type: String },
  discount: { type: String },
  total: { type: String },
  time: { type: String },
  notes: { type: String },
  order_time: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
  add_on: {
    type: Array,
    items: [
      {
        item: { type: String },
        order_date: { type: String },
        price: { type: String },
        type: { type: String },
      },
    ],
  },
});

module.exports = mongoose.model("Order", Order);
