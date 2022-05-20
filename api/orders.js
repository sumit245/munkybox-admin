const express = require("express");
const router = express.Router();
const Order = require("../models/orders.model");
const stripe=require("stripe")

router.route("/").get(function (req, res) {
  Order.find(function (err, order) {
    if (!err) {
      res.json(order);
    }
  });
});
//get all orders

router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Order.findById(id, function (err, order) {
    res.json(order);
  });
});
//get specific order

router.route("/getOrderbyID/:id").get(function (req, res) {
  let id = req.params.id;
  Order.findOne({ order_id: id }, function (err, order) {
    if (!err) {
      res.json(order);
    }
  });
});
//get specific order

router.route("/rejected/:restaurant_id").get(async (req, res) => {
  const rejectedorders = await Order.find({
    $and: [{ status: "rejected" }, { restaurant_id: req.params.restaurant_id }],
  });
  res.json({ rejectedorders: rejectedorders, count: rejectedorders.length });
});
//get rejected orders

router.route("/pending/:restaurant_id").get(async (req, res) => {
  const orders = await Order.find({
    $and: [{ status: "pending", restaurant_id: req.params.restaurant_id }],
  });
  res.json({ pendingorders: orders, count: orders.length });
});
//get pending orders

router.route("/accepted/:restaurant_id").get(async (req, res) => {
  const activeorders = await Order.find({
    $and: [{ status: "accepted" }, { restaurant_id: req.params.restaurant_id }],
  });
  res.json({ activeorders: activeorders, count: activeorders.length });
});
//get active orders

router.route("/active/:restaurant_id").get(async (req, res) => {
  const activeorders = await Order.find({
    $and: [{ status: "started" }, { restaurant_id: req.params.restaurant_id }],
  });
  res.json({ activeorders: activeorders, count: activeorders.length });
});
//get active orders

router.route("/completed/:restaurant_id").get(async (req, res) => {
  const completedorders = await Order.find({
    $and: [
      { status: "completed" },
      { restaurant_id: req.params.restaurant_id },
    ],
  });
  res.json({ completedorders: completedorders, count: completedorders.length });
});
//get completed orders

router.route("/cancelled/:restaurant_id").get(async (req, res) => {
  const cancelled = await Order.find({
    $and: [
      { status: "cancelled" },
      { restaurant_id: req.params.restaurant_id },
    ],
  });
  res.json({ cancelled: cancelled, count: cancelled.length });
});
//get cancelled orders

router.route("/forchefhome/:restaurant_id").get(async (req, res) => {
  const activeorders = await Order.find({
    restaurant_id: req.params.restaurant_id,
    $or: [{ status: "accepted" }, { status: "started" }],
  });
  res.json({ activeorders: activeorders, count: activeorders.length });
});
//get active orders

router.route("/:id").delete(async (req, res) => {
  const response = await Order.findByIdAndDelete(req.params.id);
  if (response !== null) {
    res.json({ status: 200, msg: "Deleted", data: response });
  }
});
//delete single order

router.route("/").post(function (req, res) {
  let order = new Order(req.body);
  order
    .save()
    .then((response) => {
      res.json({ data: response, msg: "Order Placed!!!", status: 200 });
    })
    .catch((err) => {
      res.status(400).send("Failed");
    });
});
//save a order

router.route("/getorderbyuser/:user_id").get(async function (req, res) {
  let id = req.params.user_id;
  const orders = await Order.find({ user_id: id });
  res.json(orders);
});
//get specific order by user

router.route("/dashboard/:restaurant_id").get(async (req, res) => {
  let restaurant_id = req.params.restaurant_id;
  const response = await Order.find({
    $and: [
      { restaurant_id: restaurant_id },
      {
        $or: [
          { status: "started" },
          { status: "accepted" },
          { status: "cancelled" },
          { status: "completed" },
        ],
      },
    ],
  });

  const twoOrders = await response.filter((item) => item.plan === "twoPlan");
  const fifteenOrders = await response.filter(
    (item) => item.plan === "fifteenPlan"
  );
  function add(accumulator, a) {
    return parseFloat(accumulator) + parseFloat(a);
  }
  const thirtyOrders = await response.filter(
    (item) => item.plan === "thirtyPlan"
  );
  const sumTwo = twoOrders.map((item) => item.base_price).reduce(add, 0);
  const discountTwo = twoOrders.filter(item=>item.promo_id!=="PROMOADMIN").map((item) => item.discount).reduce(add, 0);
  const sumFifteen = fifteenOrders
    .map((item) => item.base_price)
    .reduce(add, 0);
  const discountFifteen = fifteenOrders
    .filter(item=>item.promo_id!=="PROMOADMIN")
    .map((item) => item.discount)
    .reduce(add, 0);
  const sumThirty = thirtyOrders
    .filter(item => item.promo_id !== "PROMOADMIN")
    .map((item) => item.base_price).reduce(add, 0);
  const discountThirty = thirtyOrders
    .map((item) => item.discount)
    .reduce(add, 0);
  let totalDiscount = discountTwo + discountFifteen + discountThirty;
  let totalRevenue = sumTwo + sumFifteen + sumThirty;
  let grossRevenue = totalRevenue - totalDiscount;
  res.json({
    sumTwo: sumTwo,
    discountTwo: discountTwo,
    sumFifteen: sumFifteen,
    discountThirty: discountThirty,
    discountFifteen: discountFifteen,
    sumThirty: sumThirty,
    totalRevenue: totalRevenue,
    totalDiscount: totalDiscount,
    grossRevenue: grossRevenue,
    countTwoMeals: twoOrders.length,
    countFifteenMeals: fifteenOrders.length,
    countThirtyMeals: thirtyOrders.length,
  });
});

router.put("/:id", function (req, res, next) {
  let id = req.params.id;
  Order.findByIdAndUpdate(id, req.body, (err, response) => {
    if (err) {
      res.json({ status: 403, msg: "Bad Request" });
    } else {
      Order.findById(id, function (error, user) {
        res.json({
          status: 201,
          data: user,
          msg: "Add-On ordered successfully",
        });
      });
    }
  });
});
//update an order

router.route("/").delete((req, res, next) => {
  Order.deleteMany({}, (err, resp) => {
    res.json({ msg: "All Deleted" });
  });
});
//delete all

module.exports = router;
