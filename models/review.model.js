const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = new Schema({
  user_id: String,
  restaurant_id: String,
  role: String,
  order_id: String,
  delivered_on: String,
  plan_name: String,
  base_price: String,
  rating: String,
  issues: Array,
  details: String,
  comments: [
    {
      role: String,
      body: String,
      commented_at: { type: String, default: Date.now().toLocaleString() },
    },
  ],
});

module.exports = mongoose.model("Review", Review);
