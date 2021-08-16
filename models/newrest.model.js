const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let NewRestaurant = Schema({
    about: { type: String },
    area: { type: String },
    locality: { type: String },
    city: { type: String },
    country: { type: String },
    postal_code: { type: String },
    state: { type: String },
    cuisine_type: { type: String },
    email: { type: String },
    owner_name: { type: String },
    phone: { type: String },
    restaurant_name: { type: String },
    commission:{type:String},
    status: { type: String },
    documents: {
        type: Array,
        items: [
            {
                image: { type: String },
                image_name: { type: String }
            }
        ]
    },
    meals: {
        type: Array,
        items: [
            {
                description: { type: String },
                image: { type: String },
                meal_name: { type: String },
                slot: { type: String },
                day: { type: String },
                type: { type: String },
                add_on: {
                    type: Array,
                    items: [
                        {
                            add_on: { type: String },
                            add_on_price: { type: String }
                        }
                    ]
                }
            }
        ]
    },
    plan: {
        twoPlan: {
            base_2price: { type: String },
            customer_2price: { type: String }
        },
        fifteenPlan: {
            base_15price: { type: String },
            customer_15price: { type: String }
        },
        thirtyPlan: {
            base_30price: { type: String },
            customer_30price: { type: String }
        }
    },
    bank_info: {
        account_name: { type: String },
        account_number: { type: String },
        bank_name: { type: String },
        branch_number: { type: String },
        instituion_number: { type: String }
    },
    category: { type: String },
    meal_type: { type: String },
    rating: { type: String },
    reviews: [
        {
            user_name: { type: String },
            reviews:{type:String},  
        }
    ]
})

module.exports = mongoose.model("NewRestaurant", NewRestaurant);