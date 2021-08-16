const mongoose = require('mongoose');
require('dotenv').config()
const connection = process.env.MONGODB_URL
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));