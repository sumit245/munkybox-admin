const express = require("express");
const moment = require("moment");
const router = express.Router();
const Order = require("../models/orders.model");
const NewRestaurant = require("../models/newrest.model");
const CurrentOrder = require("../models/currentorders.model")
const Meals = require("../models/meals.model")
const pdfTemplate = require("../receipt");
const pdf = require("html-pdf");
const { add } = require('../utility/utility')

router.route("/create-pdf/").post(async (req, res) => {
  pdf
    .create(pdfTemplate(req.body), {})
    .toFile(`${__dirname}/receipt.pdf`, (err) => {
      if (err) {
        console.log(err);
      }
      res.send(Promise.resolve());
    });
});

router.route("/fetch-pdf").get(async (req, res) => {
  await res.sendFile(`${__dirname}/receipt.pdf`);
});

router.route("/").get(function (req, res) {
  Order.find(function (err, order) {
    if (!err) {
      res.json(order);
    }
  });
});
//get all orders

router.route("/:id").get(async function (req, res) {
  const { id } = req.params;
  const order = await Order.findById(id)
  res.json(order)
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

router.route("/forchefhome/:restaurant_id/:day/:category").get(async (req, res) => {
  const { restaurant_id, day, category } = req.params
  let activeorders = await Order.find({ restaurant_id: restaurant_id, $or: [{ status: "accepted" }, { status: "started" }] });
  let orderedAdOns = [].concat.apply(
    [],
    activeorders.flatMap((item) => item.add_on)
  );
  let restaurant = await NewRestaurant.findOne({ restaurant_id: restaurant_id });
  let { meals } = await Meals.findOne({ restaurant_id: restaurant_id })
  meals = meals.find((meal) => meal.category === category).items
  let dateInNumber = moment().day();
  dateInNumber >= 0 ? dateInNumber : 1;
  let meal = {};
  let meal_name = "";
  let type = "";
  let add_on = [];
  let count = 0;
  let filtered_add_ons = [];
  let add_on_name = [];
  let total_ad_on = 0;
  if (req.params.day === "Today") {
    const today = moment();
    activeorders = activeorders.filter((item) =>
      today.isBetween(item.start_date, moment(item.end_date).add(1, "day"))
    );
    count = activeorders.length;
    meal = meals[dateInNumber - 1];
    meal_name = meal.meal_name;
    type = meal.type;
    add_on = meal.add_on;
    add_on_name = Array.isArray(add_on) && add_on.length !== 0 ? add_on.map((data) => data.add_on) : [];
    // add_on_name.forEach((add_on) =>
    //   filtered_add_ons.push(
    //     orderedAdOns
    //       .filter(
    //         (item) =>
    //           item.item === add_on &&
    //           item.order_date === moment().format("DD-MMM-YYYY")
    //       )
    //       .map((item) => item.qty)
    //       .reduce(add, 0)
    //   )
    // );
    // total_ad_on = filtered_add_ons.reduce(add, 0);
    // add_on_name.forEach((element, index) => {
    //   let obj = {
    //     add_on_name: add_on_name[index],
    //     qty: filtered_add_ons[index],
    //   };
    //   add_ons_orders.push(obj);
    // });
  } else if (req.params.day === "Tomorrow") {
    const today = moment().add(1, "days");
    activeorders = activeorders.filter((item) =>
      today.isBetween(item.start_date, moment(item.end_date).add(1, "day"))
    );
    count = activeorders.length;
    meal = meals[dateInNumber];
    meal_name = meal.meal_name;
    type = meal.type;
    add_on = meal.add_on;
    add_on_name = Array.isArray(add_on) && add_on.length !== 0 ? add_on.map((data) => data.add_on) : [];
    // add_on_name.forEach((add_on) =>
    //   filtered_add_ons.push(
    //     orderedAdOns
    //       .filter(
    //         (item) =>
    //           item.item === add_on &&
    //           item.order_date === moment().format("DD-MMM-YYYY")
    //       )
    //       .map((item) => item.qty)
    //       .reduce(add, 0)
    //   )
    // );
    // total_ad_on = filtered_add_ons.reduce(add, 0);
    // add_on_name.forEach((element, index) => {
    //   let obj = {
    //     add_on_name: add_on_name[index],
    //     qty: filtered_add_ons[index],
    //   };
    //   add_ons_orders.push(obj);
    // });
  } else {
    const today = moment().add(2, "days");
    activeorders = activeorders.filter((item) =>
      today.isBetween(item.start_date, moment(item.end_date).add(1, "day"))
    );
    count = activeorders.length;
    meal = meals[dateInNumber + 1];
    meal_name = meal.meal_name;
    type = meal.type;
    add_on = meal.add_on;
    add_on_name = Array.isArray(add_on) && add_on.length !== 0 ? add_on.map((data) => data.add_on) : [];
    // add_on_name.forEach((add_on) =>
    //   filtered_add_ons.push(
    //     orderedAdOns
    //       .filter(
    //         (item) =>
    //           item.item === add_on &&
    //           item.order_date === moment().format("DD-MMM-YYYY")
    //       )
    //       .map((item) => item.qty)
    //       .reduce(add, 0)
    //   )
    // );
    // total_ad_on = filtered_add_ons.reduce(add, 0);
    // add_on_name.forEach((element, index) => {
    //   let obj = {
    //     add_on_name: add_on_name[index],
    //     qty: filtered_add_ons[index],
    //   };
    //   add_ons_orders.push(obj);
    // });
  }
  res.json({
    // activeorders: activeorders,
    count: count,
    meal_name: meal_name,
    add_ons: add_on_name,
    type: type,
  });
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

router.route("/getorderbyuser/:id").get(async function (req, res) {
  let { id } = req.params;
  const orders = await Order.find({ user_id: id });
  const restaurants = await NewRestaurant.find()
  let myOrders = []
  orders.map(async (order) => {
    restaurants.filter((restaurant) => {
      if (restaurant.restaurant_id === order.restaurant_id) {
        order.restaurant_image = restaurant.documents[0].restaurant_image
      }
    })
    order.color = order.status === "accepted" ? "#ffc300" :
      order.status === "started" ? "#f5a617" :
        order.status === "pending" ? "#aaa" :
          order.status === "rejected" ? "#777" : "#22cf6c"
    myOrders.push(order)
  })
  res.json({ myOrders: myOrders, totalCount: myOrders.length });
});
//get all order by user

router.route("/getsubscription/:id").get(async function (req, res) {
  let { id } = req.params;
  const orders = await Order.find({ user_id: id, status: "started" });
  const restaurants = await NewRestaurant.find()
  let myOrders = []
  orders.map(async (order) => {
    restaurants.filter((restaurant) => {
      if (restaurant.restaurant_id === order.restaurant_id) {
        order.restaurant_image = restaurant.documents[0].restaurant_image
        order.meals = restaurant.meals
      }
    })
    myOrders.push(order)
  })
  res.json({ mySubscription: myOrders, totalCount: myOrders.length });
});
//get all subscription by user

router.route("/getSubscriptionDetails/:id").get(async function (req, res) {
  let { id } = req.params;
  const order = await Order.findOne({ order_id: id, status: "started" });
  res.json({ mySubscription: order, remaining: 0, add_ons: [], futuremeals: [], delivered: false });
});
//get all subscription by user

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
  const discountTwo = twoOrders
    .filter((item) => item.promo_id !== "PROMOADMIN")
    .map((item) => item.discount)
    .reduce(add, 0);
  const sumFifteen = fifteenOrders
    .map((item) => item.base_price)
    .reduce(add, 0);
  const discountFifteen = fifteenOrders
    .filter((item) => item.promo_id !== "PROMOADMIN")
    .map((item) => item.discount)
    .reduce(add, 0);
  const sumThirty = thirtyOrders
    .filter((item) => item.promo_id !== "PROMOADMIN")
    .map((item) => item.base_price)
    .reduce(add, 0);
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
