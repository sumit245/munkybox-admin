const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Banners = new Schema({
  promo_id: String,
  restaurant_id: String,
  plan_name: String,
  rpc: String,
  duration: String,
  status: { type: String, default: "queued" },
  discount_type:String,
  discount: String,
  promo_code: String,
  start_date: String,
  end_date: String,
  clicks: String,
  due: String,
  paid:String,
  users: String,
  orders: String,
  revenue: String,
});

module.exports = mongoose.model("Banners", Banners);
