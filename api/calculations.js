const express = require("express");
const router = express.Router();
const coupons = require("../models/admincoupon.model");
const restaurants = require("../models/newrest.model");
const orders = require("../models/orders.model");
const users = require("../models/users.model");
const commissions = require("../models/checkout.model");
const profit_margins = require("../models/plans.model");

router.route("/restaurants").get(function (req, res) {
  res.json({ data: "restaurants" });
});
//get all restaurants

router.route("/users").get(function (req, res) {
  res.json({ data: "users" });
});
//get all users

router.route("/orders").get(function (req, res) {
  res.json({ data: "orders" });
});
//get all orders

router.route("/revenue").get(function (req, res) {
  res.json({ data: "revenue" });
});
//get all orders

module.exports = router;
