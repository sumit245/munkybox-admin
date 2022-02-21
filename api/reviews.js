const express = require("express");
const router = express.Router();
const Review = require("../models/review.model");

router.route("/").get(function (req, res) {
  Review.find(function (err, review) {
    if (err) {
      console.log(err);
    } else {
      res.json(review);
    }
  });
});
//get all orders

router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Review.findById(id, function (err, review) {
    res.json(review);
  });
});
//get specific review

router.route("/getmyreview/:id").get(function (req, res) {
  let id = req.params.id;
  Review.find({ restaurant_id: id }, function (err, review) {
    res.json(review);
  });
});
//get specific review

router.route("/getreviewByUser/:id/:order_id").get(function (req, res) {
  let id = req.params.id;
  let order_id = req.params.order_id;
  Review.find(
    {
      $and: [
        { user_id: id },
        {
          order_id: order_id,
        },
      ],
    },
    function (err, review) {
      if (review.length!==0) {
        res.json({ hasReview: true, review: review });
      } else {
        res.json({ hasReview: false, review: review });
      }
    }
  );
});
//get specific review

router.route("/:id").put(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const response = await Review.findByIdAndUpdate(id, data);
  res.json(response);
});

router.route("/").post(function (req, res) {
  let review = new Review(req.body);
  review
    .save()
    .then((response) => {
      res.json({ data: response, msg: "Review Placed!!!", status: 200 });
    })
    .catch((err) => {
      res.status(400).send("Failed");
    });
});
//save a review

router.route("/:id").delete(async (req, res) => {
  const response = await Review.findByIdAndDelete(req.params.id);
  if (response !== null) {
    res.json({ status: 200, msg: "Deleted", data: response });
  }
});
//delete single review

router.route("/").delete((req, res, next) => {
  Review.deleteMany({}, (err, resp) => {
    res.json({ msg: "All Deleted" });
  });
});
//delete all

module.exports = router;
