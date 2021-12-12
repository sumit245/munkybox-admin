const express = require("express");
const router = express.Router();
const Coupon = require("../models/coupons.model");
const Promo = require("../models/promo.model");
const Orders = require("../models/orders.model");

router.route("/").get(function (req, res) {
  Coupon.find(function (err, coupons) {
    if (err) {
      res.json(err);
    } else {
      res.json(coupons);
    }
  });
});
//get all coupons

router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Coupon.findById({ _id: id }, function (err, coupon) {
    if (!err) {
      res.json(coupon);
    }
  });
});
//get specific coupon

router.route("/getcouponforchef/:restaurant").get(async (req, res) => {
  
  const myCoupons = await Coupon.find({ restaurant_id: req.params.restaurant });
  res.json(myCoupons);
});

router.route("/getpromotedorders/:restaurant_id").get(async (req, res) => {
  const myPromotedOrders = await Orders.find({ restaurant_id: req.params.restaurant_id });
  res.json({
    used_by: myPromotedOrders.length,
    promotedOrders: myPromotedOrders,
  });
});
//get all promo

router.route("/promo/:promo_id").get(function (req, res) {
  Promo.find({ promo_id: req.params.promo_id }, function (err, promo) {
    if (!err) {
      res.json({ status: 200, data: promo, msg: "Coupons Fetched" });
    }
  });
});
//get promo used by user

router.route("/add_promo").post(function (req, res) {
  let promo = new Promo(req.body);
  promo
    .save()
    .then((response) => response)
    .then((data) => {
      res.json({ status: 200, data: data, msg: "Done" });
    })
    .catch((err) => {
      res.json({ status: 200, data: err, msg: "Applying coupon failed" });
    });
});
//register a promo

router.route("/").post(function (req, res) {
  let coupon = new Coupon(req.body);
  coupon
    .save()
    .then((coupon) => coupon)
    .then((coupon) => {
      res.json({ status: 200, data: coupon, msg: "Done" });
    })
    .catch((err) => {
      res.status(400).send("adding new Client failed");
    });
});
//save a singe coupon to database

router.route("/:id").delete((req, res, next) => {
  Coupon.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      res.status(200).json({ data: err });
    } else {
      res.json({ status: 200, data: data });
    }
  });
});
//delete a coupon

router.route("/").delete((req, res, next) => {
  Coupon.deleteMany({}, (err, resp) => {
    res.json({ msg: "All Deleted" });
  });
});
//delete all users
module.exports = router;
