const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = new Schema({
  user_id: String,
  user_name: String,
  restaurant_id: String,
  role: String,
  order_id: String,
  order_time: String,
  delivered_on: String,
  plan_name: String,
  base_price: String,
  start_date: String,
  end_date:String,
  rating: String,
  likes: Array,
  details: String,
  comments: [
    {
      role: String,
      restaurant_name: String,
      body: String,
      commented_at: { type: String, default: Date.now() },
    },
  ],
  review_at: {
    type: String,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Review", Review);
