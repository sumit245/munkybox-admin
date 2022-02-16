const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Checkout = new Schema({
  commission: { type: String },
  delivery_fee: {
    type: String,
  },
  delivery_2_fee: {
    type: String,
  },
  delivery_15_fee: {
    type: String,
  },
  delivery_30_fee: {
    type: String,
  },
  service_fee: {
    type: String,
  },
  taxes: {
    type: String,
  },
});

module.exports = mongoose.model("Checkout", Checkout);
