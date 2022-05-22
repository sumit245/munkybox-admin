const express = require("express");
const router = express.Router();
const Coupon = require("../models/admincoupon.model");
const Order = require("../models/orders.model")

router.route("/").get(function (req, res) {
    Coupon.find(async function (err, coupons) {
        if (err) {
            res.json(err);
        } else {
            function add(accumulator, a) {
                return parseFloat(accumulator) + parseFloat(a);
            }
            let codes = coupons.map((item) => item.promo_code)
            let orders = await Order.find({ promo_id: "PROMOADMIN" })
            orders = orders.filter((item) => codes.indexOf(item.promo_code) > -1)
            let prices = orders.map(item => item.price)
            const sales = prices.reduce(add, 0)
            let twoPlans = orders.filter(item => item.plan === "twoPlan")
            let fifteenPlan = orders.filter(item => item.plan === "fifteenPlan")
            let thirtyPlan = orders.filter(item => item.plan === "thirtyPlan")
            res.json({
                coupons: coupons,
                numOrders: orders.length,
                codes: codes,
                sales: sales,
                twoPlans: twoPlans.length,
                fifteenPlan: fifteenPlan.length,
                thirtyPlan: thirtyPlan.length
            });
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

router.route("/:id").put(async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const response = await Coupon.findByIdAndUpdate(id, data);
    res.json(response);
});
// update a coupon

router.route("/getcouponforuser").get(function (req, res) {
    Coupon.find(function (err, coupons) {
        if (err) {
            res.json(err);
        } else {
            res.json(coupons);
        }
    });
});
//get all coupons

router.route("/").post(function (req, res) {
    let coupon = new Coupon(req.body);
    coupon
        .save()
        .then((coupon) => coupon)
        .then((coupon) => {
            res.json({ status: 200, data: coupon, msg: "Added a new admin coupon" });
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
