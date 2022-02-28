const mongoose = require("mongoose");
require("dotenv").config();
const connection = process.env.FEASTI_COMPASS;
mongoose
  .connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    socketTimeoutMS: 90000,
    serverSelectionTimeoutMS: 90000,
  })
  .then(() => console.warn("Database Connected Successfully"))
  .catch((err) => console.error(err));
