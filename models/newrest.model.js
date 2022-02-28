const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let NewRestaurant = new Schema({
  restaurant_id: { type: String },
  about: { type: String },
  pin: { type: String },
  account_name: { type: String },
  account_number: { type: String },
  bank_name: { type: String },
  branch_number: { type: String },
  institution_number: { type: String },
  city: { type: String },
  country: { type: String },
  commission: { type: String },
  cuisine_type: { type: String },
  documents: {
    type: Array,
    items: [
      {
        image: { type: String },
        image_name: { type: String },
      },
    ],
  },
  papers: [
    {
      image: { type: String },
      image_name: { type: String },
    },
  ],
  email: { type: String },
  locality: { type: String },
  owner_name: { type: String },
  postal_code: { type: String },
  phone: { type: String },
  base_2price: { type: String },
  base_15price: { type: String },
  base_30price: { type: String },
  state: { type: String },
  restaurant_name: { type: String },
  status: { type: String, default: "Inactive" },
  meals: {
    type: Array,
    items: [
      {
        description: { type: String },
        image: { type: String },
        meal_name: { type: String },
        slot: { type: String },
        day: { type: String },
        type: { type: String },
        add_on: {
          type: Array,
          items: [
            {
              add_on: { type: String },
              add_on_price: { type: String },
              add_on_image: { type: String },
            },
          ],
        },
      },
    ],
  },
  promo: [
    {
      promo_id: String,
      promo_code: String,
      plan_name: String,
      discount: String,
      discount_type: String,
      status: String,
    },
  ],
  advert_id: { type: String },
  category: { type: String },
  meal_type: { type: String },
  rating: { type: String },
  reviews: [
    {
      user_name: { type: String },
      reviews: { type: String },
    },
  ],
});

module.exports = mongoose.model("NewRestaurant", NewRestaurant);
