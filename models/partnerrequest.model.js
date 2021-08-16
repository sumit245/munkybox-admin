
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Partner = new Schema({

    first_name: {
        type: String
    },
    datetime: {
        type: String
    },
    last_name: {
        type: String
    },
    postal_code: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    status: {
        type: String
    }
});

module.exports = mongoose.model("Partner", Partner);
