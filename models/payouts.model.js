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
  commissionAmt:String,
  totalAddOnAmt: String,
  totalAddOnCommissionAmt:String,
  payableAmt: String,
  paidAmt: { type: String, default: 0 },
  totalCancelAmt: String,
  orders: Array,
  totalOrders: Number,
});
module.exports = mongoose.model("Payout", Payout);
