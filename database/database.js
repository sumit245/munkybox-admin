const mongoose = require('mongoose');
require('dotenv').config()
const connection = process.env.MONGODB_URL;
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.warn("Database Connected Successfully"))
    .catch(err => console.error(err));