const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Contacts = new Schema({
  id: String,
  sender: String,
  receipient: String,
  subject: String,
  body: String,
  restaurant_name: String,
  sender_name: String,
  phone: String,
  label: String,
  timestamp: {
    type: String,
    default: Date.now().toLocaleString(),
  },
});

module.exports = mongoose.model("Contacts", Contacts);
