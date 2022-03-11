const express = require("express");
const router = express.Router();
const Payout = require("../models/payoutcylce.model");

router.route("/").get(function (req, res) {
  Payout.find({}, null, {sort: {start_date: -1}},function (err, payouts) {
    if (!err) {
      res.json(payouts);
    }
  });
});
// get all payout cycle

router.route("/:id").get(function (req, res) {
  Payout.findById(req.params.id, (err, cycle) => {
    if (!err) {
      res.json(cycle);
    }
  });
});
//get specific payout cycle

router.route("/").post(async (req, res) => {
  let payoutcycle = new Payout(req.body);
  const result = await payoutcycle.save();
  res.json(result);
});
//post a payout

router.route("/:id").delete(async (req, res) => {
  const response = await Payout.findByIdAndDelete(req.params.id);
  if (response !== null) {
    res.json(response);
  }
});
//delete single payout

module.exports = router;
