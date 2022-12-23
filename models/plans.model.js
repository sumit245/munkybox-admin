const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// let Plan = new Schema({
//     singlePlan: String,
//     twoPlan: String,
//     sevenPlan: String,
//     fifteenPlan: String,
//     thirtyPlan: String
// });

let Plan = new Schema({
    plan_name: String,
    profit_margin: String,
    duration: String,
    code_name: String
})

module.exports = mongoose.model("Plan", Plan);
