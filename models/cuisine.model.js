const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Cuisine = new Schema(
  {
    _id: String,
    image: {
      type: String,
      required: true,
    },
    cuisineName: String,
    count: Number,
  },
  { _id: false }
);

module.exports = mongoose.model("Cuisine", Cuisine);
