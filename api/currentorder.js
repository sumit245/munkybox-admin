const express = require("express");
const router = express.Router();
const Order = require("../models/orders.model");
const currentOrders = require("../models/currentorders.model");
const { response } = require("express");

router.route("/").get(function (req, res) {
  currentOrders.find(function (err, order) {
    if (err) {
      console.log(err);
    } else {
      res.json(order);
    }
  });
});
//get all orders

router.route("/").post(function (req, res) {
  let order = new currentOrders(req.body);
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

router.route("/getOrderDetails/:order_id").get(function (req, res, next) {
  let id = req.params.order_id;
  currentOrders.findOne({ order_id: id }, function (err, order) {
    if (!err) {
      res.json(order);
    } else {
      res.json(order);
    }
  });
});
//get specific order

router.put("/getandupdateorderstatus/:order_id", function (req, res, next) {
  let { order_id } = req.params;
  currentOrders.findOneAndUpdate(
    { order_id: order_id },
    req.body,
    (err, response) => {
      if (!err) {
        res.json({ data: response, status: 200, msg: "Updated" });
      }
    }
  );
});
//update an order

router.route("/:id").delete(async (req, res) => {
  const response = await currentOrders.findByIdAndDelete(req.params.id);
  if (response !== null) {
    res.json({ status: 200, msg: "Deleted", data: response });
  }
});
//delete single order

router.put("/:id", function (req, res, next) {
  let id = req.params.id;
  currentOrders.findByIdAndUpdate(id, req.body, (err, response) => {
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
  currentOrders.deleteMany({}, (err, resp) => {
    res.json({ msg: "All Deleted" });
  });
});
//delete all

module.exports = router;
