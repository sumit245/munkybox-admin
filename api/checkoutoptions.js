const express = require("express");
const router = express.Router();
const Checkout = require("../models/checkout.model");

router.route("/").get(function (req, res) {
  Checkout.find(function (err, checks) {
    if (err) {
      res.json(err);
    } else {
      res.json({ status: 200, data: checks });
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

router.put("/:id", function (req, res) {
  let id = req.params.id;
  console.log(req.body);
  Checkout.findByIdAndUpdate(id, req.body, function (err, resp) {
    if (err) {
      res.json(err);
    } else {
      res.json(resp);
    }
  });
});
//update a check
module.exports = router;
