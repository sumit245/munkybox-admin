const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Banners = new Schema({
  promo_id: String,
  restaurant_id: String,
  plan_name: String,
  rpc: String,
  duration: String,
  status: { type: String, default: "queued" },
  discount_type: String,
  meal_plan: String,
  discount: String,
  promo_code: String,
  start_date: String,
  end_date: String,
  clicks: { type: Number, default: 0 },
  due: { type: Number, default: 0 },
  paid: { type: Number, default: 0 },
  users: { type: Number, default: 0 },
  orders: { type: Number, default: 0 },
  revenue: { type: Number, default: 0 },
});

module.exports = mongoose.model("Banners", Banners);
