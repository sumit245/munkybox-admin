const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Checkout = new Schema({
    delivery_fee: {
        type: String
    },
    service_fee: {
        type: String
    },
    taxes: {
        type: String
    }
});

module.exports = mongoose.model("Checkout", Checkout);
