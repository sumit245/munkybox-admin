const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let PricePlans = new Schema({
    restaurant_id: { type: String },
    isDelivery: Boolean,
    price_plans: [
        {
            plan_name: String,
            base_price: String,
            customer_price: String,
            delivery_price: String,
        }
    ]
});

module.exports = mongoose.model("PricePlans", PricePlans);
