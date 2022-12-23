const express = require("express");
const router = express.Router();
const coupons = require("../models/admincoupon.model");
const restaurants = require("../models/newrest.model");
const orders = require("../models/orders.model");
const users = require("../models/users.model");
const commissions = require("../models/checkout.model");
const profit_margins = require("../models/plans.model");

router.route("/restaurants").get(async function (req, res) {
  let total = await restaurants.find();
  total = total.length;
  let active = await restaurants.find({ status: "Active" });
  active = active.length;
  let inactive = await restaurants.find({ status: "Inactive" });
  inactive = inactive.length;
  res.json({ inactive: inactive, active: active, totalrestaurants: total });
});
//get all restaurants

router.route("/users").get(async function (req, res) {
  let total = await users.find();
  total = users.length;
  let active = await users.find({ status: "Active" });
  active = active.length;
  let inactive = await users.find({ status: "Inactive" });
  inactive = inactive.length;
  res.json({ active: active, inactive: inactive, totalusers: total });
});
//get all users

router.route("/orders").get(async function (req, res) {
  let totalorders = await orders.find();
  totalorders = totalorders.length;
  let pendingorders = await orders.find({ status: "pending" });
  pendingorders = pendingorders.length;
  let acceptedorders = await orders.find({ status: "accepted" });
  acceptedorders = acceptedorders.length;
  let runningorders = await orders.find({ status: "started" });
  runningorders = runningorders.length;
  let completedorders = await orders.find({ status: "completed" });
  completedorders = completedorders.length;
  let rejectedorders = await orders.find({ status: "rejected" });
  rejectedorders = rejectedorders.length;
  res.json({
    totalorders: totalorders,
    pendingorders: pendingorders,
    acceptedorders: acceptedorders,
    runningorders: runningorders,
    completedorders: completedorders,
    rejectedorders: rejectedorders,
  });
});
//get all orders

router.route("/revenue").get(async function (req, res) {
  function add(accumulator, a) {
    return parseFloat(accumulator) + parseFloat(a);
  }
  let neworders = await orders.find({
    $or: [
      { status: "completed" },
      { status: "started" },
      { status: "accepted" },
    ],
  });
  let mealrevenue = neworders.map((item) => item.price);
  mealrevenue = mealrevenue.reduce(add, 0); //meal revenue
  let baserevenue = neworders.map((item) => item.base_price);
  baserevenue = baserevenue.reduce(add, 0); //base revenue
  let totaldelivery = neworders.map((item) => item.delivery_fee);
  totaldelivery = totaldelivery.reduce(add, 0); //Delivery revenue
  let totalservicefee = neworders.map(
    (item) => item.service_fee * 0.01 * item.price
  );
  totalservicefee = totalservicefee.reduce(add, 0); //Service Revenue
  let profits = await profit_margins.find();
  let commission_array = await commissions.find();
  // const { commission } = commission_array[0];
  const commission = 0
  let tips = await neworders.map((item) => item.tip);
  tips = tips.reduce(add, 0); //Tips Revenue
  let taxes = await neworders.map((item) => item.taxes);
  taxes = taxes.reduce(add, 0); //Taxes Revenue
  let discount = await neworders
    .filter((order) => order.promo_id === "PROMOADMIN")
    .map((order) => order.discount);
  discount = discount.reduce(add, 0); //Discounts
  let totalrevenue = parseFloat(
    mealrevenue + totaldelivery + totalservicefee + tips + taxes - discount
  ).toFixed(2);
  let add_ons = await neworders.map((order) => order.add_on);
  add_ons = [].concat.apply([], add_ons);
  add_ons = [].concat.apply([], add_ons);
  let add_on_total = add_ons.map((add_on) => add_on.subtotal);
  add_on_total = add_on_total.reduce(add, 0);
  let add_on_commission = parseFloat((add_on_total * commission) / 100).toFixed(
    2
  );
  let base_commission = parseFloat((baserevenue * commission) / 100).toFixed(2);
  res.json({
    mealrevenue: mealrevenue,
    totaldelivery: totaldelivery,
    totalservicefee: totalservicefee,
    tips: tips,
    baserevenue: baserevenue,
    taxes: taxes,
    discount: discount,
    totalrevenue: totalrevenue,
    add_on_total: add_on_total,
    add_on_commission: add_on_commission,
    base_commission: base_commission,
  });
});
//get all revenue

module.exports = router;
