const express = require("express");
const router = express.Router();
const NewRestaurant = require("../models/newrest.model");
const Orders = require("../models/orders.model");
const Payout = require("../models/payouts.model");

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
  const restaurant = await NewRestaurant.findOne({
    restaurant_id: req.params.rest_id,
  });
  
  const { restaurant_id, restaurant_name, owner_name, email } = restaurant;

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

  const basePrices = myorders.map((order) => order.base_price);
  let totalBaseIncome = basePrices.reduce(add, 0);

  const discounts = myorders.map((order) => order.discount);
  let totalDiscount = discounts.reduce(add, 0);

  res.json({
    restID: restaurant_id,
    restEmail: email,
    restName: restaurant_name,
    chef: owner_name,
    totalBaseIncome: totalBaseIncome,
    totalDiscount: totalDiscount,
    orders: myorders,
    numOrders: myorders.length,
  });
});
//delete single payout

module.exports = router;
