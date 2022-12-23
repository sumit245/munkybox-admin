const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Meals = new Schema({
    restaurant_id: String,
    meals: {
        type: Array,
        category: String,
        items: [
            {
                meal_name: String,
                description: String,
                image: String,
                slot: String,
                day: String,
                type: String,
                add_on: [
                    {
                        add_on: String,
                        add_on_price: String,
                        add_on_image: String
                    }
                ]
            }
        ]
    }
});

module.exports = mongoose.model("Meals", Meals);
