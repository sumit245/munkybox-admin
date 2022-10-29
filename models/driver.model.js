const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

let Drivers = new Schema(
    {
        driver_id: { type: String },
        driver_name: { type: String },
        phone: { type: String },
        email_id: { type: String },
        driver_picture: { type: String },
        pin: { type: String },
        account_name: { type: String },
        account_number: { type: String },
        bank_name: { type: String },
        branch_number: { type: String },
        institution_number: { type: String },
        address_line_1: { type: String },
        address_line_2: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        postal_code: { type: String },
        vehicle_name: { type: String },
        model_number: { type: String },
        vin: { type: String },
        license_plate: { type: String },
        registration_number: { type: String },
        registration_certificate: { type: String },
        driving_license_number: { type: String },
        driving_license_front: { type: String },
        driving_license_rear: { type: String },
        insurance: { type: String },
        status: {
            type: String,
            default: "Unapproved",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Drivers", Drivers);
