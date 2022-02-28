const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Coupon = new Schema({
  promo_id: { type: String },
  restaurant_id: { type: String },
  category: { type: Array },
  plan_name: { type: String },
  discount_type: { type: String },
  absolute_value: { type: String },
  start_date: { type: String },
  deactivation_date: { type: String },
  end_date: { type: String },
  promo_code: { type: String },
  price: { type: String },
  discount: { type: String },
  duration: { type: String },
  status: { type: String, default: "Active" },
});

module.exports = mongoose.model("Coupon", Coupon);
