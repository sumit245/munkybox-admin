const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PayoutCycle = new Schema({
    start_date: String,
    end_date: String,
    cycle_count: Number,
    status:String
});

module.exports = mongoose.model("PayoutCycle", PayoutCycle);
