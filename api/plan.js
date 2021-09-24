const express = require("express");
const router = express.Router();
const Plan = require("../models/plans.model");

router.route("/").get(function (req, res) {
  Plan.find(function (err, plans) {
    if (err) {
      console.log(err);
    } else {
      res.json(plans);
    }
  });
});

router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Plan.findById(id, function (err, user) {
    res.json(user);
  });
});

router.put("/:id", function (req, res) {
  let id = req.params.id;
  let {plans} = req.body;
  console.log(plans);
  Plan.findByIdAndUpdate(id, plans, function (err, resp) {
    res.json(plans);
  });
});
//add an address

router.route("/:id").post(function (req, res) {
  Plan.findById(req.params.id, function (err, plan) {
    if (!plan) res.status(404).send("data is not found");
    else
      (plan.twoPlan = req.body.twoPlan),
        (plan.fifteenPlan = req.body.fifteenPlan),
        (plan.thirtyPlan = req.body.thirtyPlan),
        plan
          .save()
          .then((plan) => {
            res.json("Plan Update Successfully");
          })
          .catch((err) => {
            res.status(400).send("Update not possible");
          });
  });
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
