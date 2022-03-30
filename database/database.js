const mongoose = require("mongoose");
require("dotenv").config();
const connection = process.env.FEASTI_URL;
mongoose
  .connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 90000,
    serverSelectionTimeoutMS: 90000,
  })
  .then(() => console.warn("Database Connected Successfully"))
  .catch((err) => console.error(err));
