const express = require("express");
const router = express.Router();
const Checkout = require("../models/checkout.model");

router.route("/").get(function (req, res) {
    Checkout.find(function (err, checks) {
        if (err) {
            console.log(err);
        } else {
            res.json(checks);
        }
    });
});

router.route("/").post(function (req, res) {
    let check = new Checkout(req.body);
    check
        .save()
        .then((check) => check)
        .then((check) => {
            res.status(200).json({ check: "Done..." });
            res.send(check);
        })
        .catch((err) => {
            res.status(400).send("adding new checkout option failed");
        });
});
//save a singe check to database

router.route("/:id").get(function (req, res) {
    let id = req.params.id;
    Checkout.findById(id, function (err, check) {
        res.json(check);
    });
});
//get specific check

router.route("/:id").post(function (req, res) {
    Checkout.findById(req.params.id, function (err, check) {
        if (!check) res.status(404).send("data is not found");
        else
            (check.delivery_fee = req.body.delivery_fee),
                (check.service_fee = req.body.service_fee),
                (check.taxes = req.body.taxes),
                check
                    .save()
                    .then((check) => {
                        res.json("Client Update Successfully");
                    })
                    .catch((err) => {
                        res.status(400).send("Update not possible");
                    });
    });
});
//update a check
module.exports = router;
