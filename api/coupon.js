const express = require("express");
const router = express.Router();
const Coupon = require("../models/coupons.model");

router.route("/").get(function (req, res) {
    Coupon.find(function (err, coupons) {
        if (err) {
            console.log(err);
        } else {
            res.json(coupons);
        }
    });
});

router.route("/").post(function (req, res) {
    let coupon = new Coupon(req.body);
    coupon
        .save()
        .then((coupon) => coupon)
        .then((coupon) => {
            res.status(200).json({ coupon: "Done..." });
            res.send(coupon);
        })
        .catch((err) => {
            res.status(400).send("adding new Client failed");
        });
});
//save a singe coupon to database

router.route("/:id").get(function (req, res) {
    let id = req.params.id;
    Coupon.findById(id, function (err, coupon) {
        res.json(coupon);
    });
});
//get specific coupon

router.route("/:id").delete((req, res, next) => {
    Coupon.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            console.log(next(err));
            res.status(200).json({ data: "deleted" });
        } else {
            console.log("deleted_succesfully");
        }
    });
});
//delete a coupon

module.exports = router;
