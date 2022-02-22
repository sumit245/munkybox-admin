const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Payout = new Schema({
  restId: String,
  restEmail: String,
  restName: String,
  chef: String,
  txnID: String,
  amtPaid: String,
  payDate: String,
  totalMerchAmt: String,
  totalCommissionAmt: String,
  totalCancelAmt: String,
  orders: Array,
});
module.exports = mongoose.model("Payout", Payout);
