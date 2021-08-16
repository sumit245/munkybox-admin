const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Plan = new Schema({
    twoPlan: {
       type:String
    },
    fifteenPlan: {
        type:String
    },
    thirtyPlan: {
        type:String
    }
});

module.exports = mongoose.model("Plan", Plan);
