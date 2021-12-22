const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let RestaurantDashboard = new Schema({
  restaurant_id: String,
  restaurant_name: String,
  sumTwoPlan: Number,
  sumfifteenPlan: Number,
  sumthirtyPlan: Number,
  discountTwoPlan: Number,
  discountFifteenPlan: Number,
  discountThirtyPlan: Number,
  totalRevenue: Number,
  totalDiscount: Number,
  grossRevenue: Number,
  bannerDue: Number,
  bannerPaid: Number,
  commissionPaid: Number,
  acceptedOrderCount:Number ,
  startedOrderCount: Number,
  completedOrdersCount: Number,
  cancelledOrderCount: Number,
  rejectedOrderCount: Number,
  menuvisits: Number,
  cartVisit: Number,
  totalOrders: Number,
  newUsers: Number,
  repeatUser: Number,
});

module.exports = mongoose.model("RestaurantDashboard", RestaurantDashboard);
