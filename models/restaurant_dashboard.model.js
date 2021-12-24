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
  acceptedOrderCount: Number,
  startedOrderCount: Number,
  completedOrdersCount: Number,
  cancelledOrderCount: Number,
  rejectedOrderCount: Number,
  menuvisits: Number,
  cartVisit: { type: Number, default: 0 },
  totalOrders: Number,
  newUsers: Number,
  repeatUser: Number,
  coupons: [
    {
      promo_id: { type: String },
      category: { type: Array },
      plan_name: { type: String },
      discount_type: { type: String },
      absolute_value: { type: String },
      start_date: { type: String },
      end_date: { type: String },
      promo_code: { type: String },
      price: { type: String },
      discount: { type: String },
      duration: { type: String },
      status: { type: String, default: "Inactive" },
      totalOrders: { type: String },
      totalBaseIncome: { type: String },
      totalDiscountPaid: { type: String },
      totalUsed: { type: String },
    },
  ],
  banners: [
    {
      promo_id: String,
      restaurant_id: String,
      plan_name: String,
      rpc: String,
      duration: String,
      status: { type: String, default: "Inactive" },
      discount_type: String,
      meal_plan: String,
      discount: String,
      promo_code: String,
      start_date: String,
      end_date: String,
      clicks: { type: Number, default: 0 },
      due: { type: Number, default: 0 },
      paid: { type: Number, default: 0 },
      users: { type: Number, default: 0 },
      orders: Array,
      totalDiscount: Number,
      revenue: { type: Number, default: 0 },
    },
  ],
});

module.exports = mongoose.model("RestaurantDashboard", RestaurantDashboard);
