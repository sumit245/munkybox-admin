const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Users = new Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  profile_picture: {
    type: String,
  },
  phone: {
    type: String,
  },
  email_id: {
    type: String,
  },
  addresses: {
    type: Array,
    address: {
      flat_num: { type: String },
      locality: { type: String },
      city: { type: String },
      address_type: { type: String },
      state: { type: String },
      postal_code: { type: String },
      geo: {
        lat: { type: String },
        lng: { type: String },
      },
    },
  },
  cards: {
    type: Array,
    card: {
      card_holder: String,
      number: String,
      expiry: String,
      brand: String,
      cvc: String,
      postal_code: String,
      country: String,
    },
  },
  status: {
    type: String,
  },
  favorite: {
    type: Array,
  },
});

module.exports = mongoose.model("Users", Users);
