const express = require("express");
const moment = require("moment");
const router = express.Router();
const NewRestaurant = require("../models/newrest.model");
const Orders = require("../models/orders.model");
const Payout = require("../models/payouts.model");
const RestaurantDashboard = require("../models/restaurant_dashboard.model");
const Payoutcycle = require("../models/payoutcylce.model");

router.route("/").get(async (req, res) => {
  const restaurants = await NewRestaurant.find({}, { restaurant_id: 1, restaurant_name: 1, email: 1 })
  const orders = await Orders.find({}, { order_id: 1, restaurant_id: 1, price: 1, base_price: 1, plan: 1, add_on: 1, start_date: 1 })
  function add(accumulator, a) {
    return parseFloat(accumulator) + parseFloat(a);
  }

  let payouts = []
  restaurants.forEach(restaurant => {
    payouts.push({
      restID: restaurant.restaurant_id,
      restEmail: restaurant.email,
      restName: restaurant.restaurant_name,
      totalMerchAmt: orders.filter(order => order.restaurant_id === restaurant.restaurant_id)
        .map(item => item.base_price).reduce(add, 0),
      totalAddOnAmt: orders.filter(order => order.restaurant_id === restaurant.restaurant_id)
        .map(item => item.add_on).length > 0 ?
        [].concat.apply([], orders.filter(order => order.restaurant_id === restaurant.restaurant_id)
          .flatMap(item => item.add_on)).map(item => item.subtotal).reduce(add, 0) : 0,
      totalCommissionAmt: orders.filter(order => order.restaurant_id === restaurant.restaurant_id)
        .map(item => parseFloat(item.base_price).toFixed(2) * 0.1).reduce(add, 0),
      commissionAmt: orders.filter(order => order.restaurant_id === restaurant.restaurant_id)
        .map(item => parseFloat(item.base_price).toFixed(2) * 0.1).reduce(add, 0)
    })
  })
  payouts.map(item => {
    item.totalAddOnCommissionAmt = parseFloat(item.totalAddOnAmt).toFixed(2) * 0.1
  })
  payouts.map(item => {
    item.totalCommissionAmt = parseFloat(item.totalCommissionAmt + item.totalAddOnCommissionAmt).toFixed(2)
  })
  payouts.map((item) => { item.payable = item.totalMerchAmt - item.totalCommissionAmt })
  res.json({
    payouts: payouts
  })
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
  const discounts = updatedorders.filter(item => item.promo_id !== "PROMOADMIN").map((order) => order.discount);
  let totalDiscount = discounts.reduce(add, 0);

  let x = updatedorders.map((order) => order.add_on);

  let addOns = updatedorders.map((el) => el.add_on);
  addOns = [].concat.apply([], addOns)
  addOns = addOns.reduce((prev, curr) => prev.concat(curr))
  let quantities = addOns.map((item) => item.qty);
  let totalCount = quantities.reduce(add, 0);

  let prices = addOns.map((item) => item.subtotal);
  let totalPrice = prices.reduce(add, 0);

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

// router.route("/getAdminRevenue/").get(async (req, res) => {
//   function add(accumulator, a) {
//     return parseFloat(accumulator) + parseFloat(a);
//   }

//   const payoutcycle = await Payoutcycle.findOne({ status: "current" });
//   const { start_date, end_date } = payoutcycle;
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
//   const discounts = updatedorders.filter(item => item.promo_id !== "PROMOADMIN").map((order) => order.discount);
//   let totalDiscount = discounts.reduce(add, 0);

//   let x = updatedorders.map((order) => order.add_on);

//   let addOns = updatedorders.map((el) => el.add_on);
//   addOns = [].concat.apply([], addOns)
//   addOns = addOns.reduce((prev, curr) => prev.concat(curr))
//   let quantities = addOns.map((item) => item.qty);
//   let totalCount = quantities.reduce(add, 0);

//   let prices = addOns.map((item) => item.subtotal);
//   let totalPrice = prices.reduce(add, 0);

//   const dashboard = await RestaurantDashboard.find();

//   let { banners } = dashboard;
//   let dues = banners.map((item) => item.due);
//   let dueAmt = dues.reduce(add, 0);

//   res.json({
//     income: income,
//     orders: orders,
//     commission: commission,
//     paidtochef:paidtochef
//   });
// });
//get current payout for all chef

router.route("/getpastpayout/:rest_id").get(async (req, res) => {
  function add(accumulator, a) {
    return parseFloat(accumulator) + parseFloat(a);
  }

  const payoutcycle = await Payoutcycle.find({ status: "expired" }, null, {
    sort: { start_date: -1 },
  });
  let pastpayouts = payoutcycle.map((item) => ({
    start_date: item.start_date,
    end_date: item.end_date,
  }));
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
  const dashboard = await RestaurantDashboard.findOne({
    restaurant_id: req.params.rest_id,
  });
  let pp = pastpayouts.map((item) => {
    let sd = item.start_date;
    let nd = item.end_date;
    let updatedorders = myorders.filter((item) =>
      moment(item.order_time).isBetween(moment(sd), moment(nd), null, "[]")
    );
    const basePrices = updatedorders.map((order) => order.base_price);
    const addOns = updatedorders.map((el) => el.add_on);
    let quantities = addOns.map((extras) => extras.map((item) => item.qty));
    let subtotal = quantities.map((item) => item.reduce(add, 0));
    let totalCount = subtotal.reduce(add, 0);

    let prices = addOns.map((extras) => extras.map((item) => item.subtotal));
    let subtotalPrice = prices.map((item) => item.reduce(add, 0));
    let totalPrice = subtotalPrice.reduce(add, 0);
    let totalBaseIncome = basePrices.reduce(add, 0);
    const discounts = updatedorders.map((order) => order.discount);
    let totalDiscount = discounts.reduce(add, 0);
    let { banners } = dashboard;
    let dues = banners.map((item) => item.due);
    let dueAmt = dues.reduce(add, 0);
    return {
      restID: req.params.id,
      orders: updatedorders,
      numOrders: updatedorders.length,
      totalBaseIncome: totalBaseIncome,
      totalDiscount: totalDiscount,
      due: dueAmt,
      payout_end_date: nd,
      payout_start_date: sd,
      totalAddOns: totalCount,
      totalAddOnRevenue: totalPrice,
    };
  });
  res.json(pp);
});
//get past payout for all chef


module.exports = router;
