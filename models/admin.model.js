const mongoose = require('mongoose');

const Admin= mongoose.model('Admin', {
    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },
});


module.exports = Admin