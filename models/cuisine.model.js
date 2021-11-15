const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Cuisine = new Schema({
  image: {
    type: String,
    required: true,
  },
  cuisineName: String,
  count: Number,
  cuisine_id: String,
});

module.exports = mongoose.model("Cuisine", Cuisine);
