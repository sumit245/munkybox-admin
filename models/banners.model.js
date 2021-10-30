const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Banners = new Schema({
  advert_id: String,
  plan_name: String,
  rpc: String,
  restaurant_id: String,
  duration: String,
  status: { type: String, default: "queued" },
  discount: String,
  promo_code: String,
  start_date: String,
  end_date: String,
  orders: String,
  clicks: String,
  revenue: String,
  due: String,
  new_customers: String,
  users: String,
});

module.exports = mongoose.model("Banners", Banners);
