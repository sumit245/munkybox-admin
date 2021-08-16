const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Coupon = new Schema({
    promo_code: {
        type: String
    },
    discount: {
        type: String
    }
});

module.exports = mongoose.model('Coupon', Coupon);