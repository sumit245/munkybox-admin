const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Partner = new Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  postal_code: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  status: {
    type: String,
    default: "Pending",
  },
  restaurant_name: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
});

module.exports = mongoose.model("Partner", Partner);
