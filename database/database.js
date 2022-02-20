const mongoose = require("mongoose");
require("dotenv").config();
const connection = process.env.MONGODB_URL;
mongoose
  .connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => console.warn("Database Connected Successfully"))
  .catch((err) => console.error(err));
