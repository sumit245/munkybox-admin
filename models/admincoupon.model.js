const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let AdminCoupon = new Schema({
    promo_code: { type: String },
    price: { type: String },
    discount: { type: String },
    orders:{type:String},
    status: { type: String, default: "Active" },
});

module.exports = mongoose.model("AdminCoupon", AdminCoupon);
