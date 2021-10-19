const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Promo = new Schema({
  promo_id: { type: String },
  restaurant_id: { type: String },
  used_by: [
    {
      user_id: String,
      order_id: String,
      plan_name: String,
      category: String,
      meal_type: String,
      ordered_at: String,
      discount: String,
    },
  ],
  counts: { type: String },
});

module.exports = mongoose.model("Promo", Promo);
