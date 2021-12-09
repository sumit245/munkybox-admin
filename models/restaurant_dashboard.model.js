const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let RestaurantDashboard = new Schema({
  restaurant_id: String,
  restaurant_name: String,
  sumTwoPlan: String,
  sumfifteenPlan: String,
  sumthirtyPlan: String,
  discountTwoPlan: String,
  discountFifteenPlan: String,
  discountThirtyPlan: String,
  totalRevenue: String,
  totalDiscount: String,
  grossRevenue: String,
  bannerDue: String,
  bannerPaid: String,
  commissionPaid: String,
  acceptedOrderCount: String,
  startedOrderCount: String,
  completedOrdersCount: String,
  cancelledOrderCount: String,
  rejectedOrderCount: String,
  menuvisits: String,
  cartVisit: String,
  totalOrders: String,
  newUsers: String,
  repeatUser: String,
});

module.exports = mongoose.model("RestaurantDashboard", RestaurantDashboard);
