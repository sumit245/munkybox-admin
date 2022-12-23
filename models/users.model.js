const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Users = new Schema({
  user_id: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  profile_picture: { type: String },
  phone: { type: String },
  email_id: { type: String },
  addresses: [
    {
      addressLine1: { type: String },
      addressLine2: { type: String },
      city: { type: String },
      states: { type: String },
      country: { type: String },
      address_type: { type: String },
      postal_code: { type: String },
      geo: {
        latitude: { type: String },
        longitude: { type: String },
      },
    },
  ],
  cards: [
    {
      card_holder: String,
      number: String,
      expiry: String,
      brand: String,
      cvc: String,
      postal_code: String,
      country: String,
    },
  ],
  status: {
    type: String,
    default: "Active",
  },
  favorite: {
    type: Array,
  },
  wallet_balance: { type: String, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Users", Users);
