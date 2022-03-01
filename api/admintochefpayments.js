const express = require("express");
const moment = require("moment");
const router = express.Router();
const NewRestaurant = require("../models/newrest.model");
const Orders = require("../models/orders.model");
const Payout = require("../models/payouts.model");
const RestaurantDashboard = require("../models/restaurant_dashboard.model");
const Payoutcycle = require("../models/payoutcylce.model");

router.route("/").get(function (req, res) {
  Payout.find(function (err, payouts) {
    if (!err) {
      res.json(payouts);
    }
  });
});
// get all payouts for chef

router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Payout.findById(id, function (err, payout) {
    if (!err) {
      res.json(payout);
    }
  });
});
//get specific payout

router.route("/").post(function (req, res) {
  let payout = new Payout(req.body);
  payout
    .save()
    .then((response) => {
      res.json({ data: response, msg: "New Payout Saved", status: 200 });
    })
    .catch((err) => {
      res.status(400).send("Failed");
    });
});
//post a payout

router.route("/:id").delete(async (req, res) => {
  const response = await Payout.findByIdAndDelete(req.params.id);
  if (response !== null) {
    res.json({ status: 200, msg: "Deleted", data: response });
  }
});
//delete single payout

router.route("/getchefpayout/:rest_id").get(async (req, res) => {
  function add(accumulator, a) {
    return parseFloat(accumulator) + parseFloat(a);
  }

  const payoutcycle = await Payoutcycle.findOne({ status: "current" });
  const { start_date, end_date } = payoutcycle;
  const myorders = await Orders.find({
    $and: [
      { restaurant_id: req.params.rest_id },
      {
        $or: [
          { status: "accepted" },
          { status: "started" },
          { status: "completed" },
        ],
      },
    ],
  });

  let updatedorders = myorders.filter((item) =>
    moment(item.order_time).isBetween(
      moment(start_date),
      moment(end_date),
      null,
      "[]"
    )
  );

  const basePrices = updatedorders.map((order) => order.base_price);
  let totalBaseIncome = basePrices.reduce(add, 0);

  const discounts = updatedorders.map((order) => order.discount);
  let totalDiscount = discounts.reduce(add, 0);

  let x = updatedorders.map((order) => order.add_on);

  const addOns = updatedorders.map((el) => el.add_on);
  let quantities = addOns.map((extras) => extras.map((item) => item.qty));
  let subtotal = quantities.map((item) => item.reduce(add, 0));
  let totalCount = subtotal.reduce(add, 0);

  let prices = addOns.map((extras) => extras.map((item) => item.subtotal));
  let subtotalPrice = prices.map((item) => item.reduce(add, 0));
  let totalPrice = subtotalPrice.reduce(add, 0);

  const dashboard = await RestaurantDashboard.findOne({
    restaurant_id: req.params.rest_id,
  });
  let { banners } = dashboard;
  let dues = banners.map((item) => item.due);
  let dueAmt = dues.reduce(add, 0);

  res.json({
    restID: req.params.restaurant_id,
    totalBaseIncome: totalBaseIncome,
    totalDiscount: totalDiscount,
    numOrders: updatedorders.length,
    due: dueAmt,
    orders: updatedorders,
    payout_start_date: start_date,
    payout_end_date: end_date,
    totalAddOns: totalCount,
    totalAddOnRevenue: totalPrice,
  });
});
//get current payout for all chef

router.route("/getpastpayout/:rest_id").get(async (req, res) => {
  function add(accumulator, a) {
    return parseFloat(accumulator) + parseFloat(a);
  }
  const restaurant = await NewRestaurant.findOne({
    restaurant_id: req.params.rest_id,
  });

  const { restaurant_id, restaurant_name, owner_name, email } = restaurant;
  const payoutcycle = await Payoutcycle.find({ status: "expired" });
  let pastpayouts = payoutcycle.map((item) => {
    const { start_date, end_date } = item;
    //   const myorders = await Orders.find({
    //     $and: [
    //       { restaurant_id: req.params.rest_id },
    //       {
    //         $or: [
    //           { status: "accepted" },
    //           { status: "started" },
    //           { status: "completed" },
    //         ],
    //       },
    //     ],
    //   });

    //   let updatedorders = myorders.filter((item) =>
    //     moment(item.order_time).isBetween(
    //       moment(start_date),
    //       moment(end_date),
    //       null,
    //       "[]"
    //     )
    //   );

    //   const basePrices = updatedorders.map((order) => order.base_price);
    //   let totalBaseIncome = basePrices.reduce(add, 0);

    //   const discounts = updatedorders.map((order) => order.discount);
    //   let totalDiscount = discounts.reduce(add, 0);

    //   const dashboard = await RestaurantDashboard.findOne({
    //     restaurant_id: req.params.rest_id,
    //   });
    //   let { banners } = dashboard;
    //   let dues = banners.map((item) => item.due);
    //   let dueAmt = dues.reduce(add, 0);
    // res.json({
    //   restID: restaurant_id,
    //   restEmail: email,
    //   restName: restaurant_name,
    //   chef: owner_name,
    //   totalBaseIncome: totalBaseIncome,
    //   totalDiscount: totalDiscount,
    //   numOrders: updatedorders.length,
    //   due: dueAmt,
    //   orders: updatedorders,
    // });
  });
  res.json(pastpayouts);
});
//get past payout for all chef

module.exports = router;
