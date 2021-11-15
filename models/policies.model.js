const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Policies = new Schema({
    title:String,
    post_id: String,
    text: String,
});

module.exports = mongoose.model("Policies", Policies);
