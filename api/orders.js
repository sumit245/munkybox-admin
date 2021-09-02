const express = require("express");
const router = express.Router();
const Order = require("../models/orders.model");

router.route("/").get(function (req, res) {
  Order.find(function (err, order) {
    if (err) {
      console.log(err);
    } else {
      res.json(order);
    }
  });
});
//get all orders

router.route("/:id").delete((req, res, next) => {
  Order.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(next(err));
      res.status(200).json({ data: "deleted" });
    } else {
      console.log("deleted successfully");
    }
  });
});
//delete a order

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

router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Order.findById(id, function (err, order) {
    res.json(order);
  });
});
//get specific order

router.put("/:id", function (req, res, next) {
  let id = req.params.id;
  console.log(req.body);
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

module.exports = router;
