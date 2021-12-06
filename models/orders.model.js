const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Order = new Schema({
  order_id: { type: String },

  user_name: { type: String },
  phone: { type: String },
  email_id: { type: String },
  address: { type: Object },

  card: { type: Object },

  user_id: { type: String },

  start_date: { type: String },
  end_date: { type: String },

  restaurant_id: { type: String },
  restaurant: { type: String },
  plan: { type: String },
  base_price: { type: String },
  price: { type: String },
  tip: { type: String },
  service_fee: { type: String },
  delivery_fee: { type: String },
  taxes: { type: String },
  promo_code: { type: String },
  discount: { type: String },
  total: { type: String },
  time: { type: String },
  notes: { type: String },
  category: { type: String },
  meal_type: { type: String },
  order_time: {
    type: String,
    default: Date.now().toLocaleString(),
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
        rate: { type: String },
        qty: { type: String },
        subtotal: { type: String },
        price: { type: String },
      },
    ],
  },
});

module.exports = mongoose.model("Order", Order);
