const express = require("express");
const router = express.Router();
const Cuisine = require("../models/cuisine.model");

router.route("/").get(function (req, res) {
  Cuisine.find(function (err, cuisine) {
    if (err) {
      console.log(err);
    } else {
      res.json(cuisine);
    }
  });
});

router.route("/").post(function (req, res) {
  let cuisine = new Cuisine(req.body);
  cuisine
    .save()
    .then((cuisine) => cuisine)
    .then((cuisine) => {
      res.json({
        status: 200,
        data: cuisine,
        msg: "Cuisine Added Successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: 404, data: err });
    });
});

router.route("/:id").delete((req, res, next) => {
  Cuisine.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});
//delete a user

module.exports = router;
