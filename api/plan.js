const express = require("express");
const router = express.Router();
const Plan = require("../models/plans.model");

router.route("/").get(async (req, res) => {
  const plans = await Plan.find()
  res.json(plans);

});

router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Plan.findById(id, function (err, user) {
    res.json(user);
  });
});

router.put("/:id", function (req, res) {
  let id = req.params.id;
  let { plans } = req.body;
  Plan.findByIdAndUpdate(id, plans, function (err, resp) {
    res.json(plans);
  });
});
//add an address

router.route("/").post(async (req, res) => {
  const { plan } = req.body
  const plans = new Plan(plan)
  const response = await plans.save()
  res.json(response)
});
//update a plan
router.route("/:id").delete(function (req, res, next) {
  Plan.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(next(err));
      res.status(200).json({ data: "deleted" });
    } else {
      console.log("deleted_succesfully");
    }
  });
});

module.exports = router;
