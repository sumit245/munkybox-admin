const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let BannerPlan = new Schema({
  advert_id: { type: String },
  pack_name: { type: String },
  rpc: { type: Number },
  duration: { type: String },
  status: { type: String, default: "Active" },
});

module.exports = mongoose.model("BannerPlan", BannerPlan);
