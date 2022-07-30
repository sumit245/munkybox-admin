const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Transaction = new Schema({
  restaurant_id: { type: String },
  paid_amount: { type: String },
  txn_id: { type: String },
  deposit_date: { type: Date },
  start_date: { type: String },
  end_date: { type: String },
  status: { type: String, default: "unpaid" },
});

module.exports = mongoose.model("Transaction", Transaction);
