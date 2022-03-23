const express = require("express");
const router = express.Router();
const NewRestaurant = require("../models/newrest.model");
const Orders = require("../models/orders.model");

router.route("/").get(function (req, res) {
  NewRestaurant.find(function (err, restaurants) {
    if (err) {
      res.json(err);
    } else {
      res.json(restaurants);
    }
  });
});
// get all restaurant for admin

router.route("/active").get(function (req, res) {
  NewRestaurant.find({ status: "Active" }, function (err, restaurant) {
    if (err) {
      res.json(err);
    } else {
      res.json(restaurant);
    }
  });
});
//get active restaurants for user

router.route("/login").post(async (req, res) => {
  const newChef = await NewRestaurant.findOne({ phone: req.body.phone }).exec();
  if (newChef) {
    res.json({ status: 200, data: newChef });
  } else {
    res.json({ status: 404 });
  }
});
//restaurant login

router.route("/:id").delete((req, res, next) => {
  NewRestaurant.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      res.json({ msg: "not delete", status: 403, data: err });
    } else {
      res.json({ msg: "deleted", status: 200, data: data });
    }
  });
});
//delete a restaurant

router.route("/").post(function (req, res) {
  let restaurant = new NewRestaurant(req.body);
  restaurant
    .save()
    .then((restaurant) => {
      res.json({
        data: restaurant,
        status: 200,
        msg: "Restaurant Added Successfully",
      });
    })
    .catch((err) => {
      res.json({ status: 400, msg: "Some error" });
    });
});
//save a restaurant

router.route("/:id").put(function (req, res, next) {
  NewRestaurant.findByIdAndUpdate(
    req.params.id,
    req.body,
    function (err, restaurant) {
      if (err) return next(err);
      res.json(restaurant);
    }
  );
});
//update a restaurant

router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  NewRestaurant.findById(id, function (err, restaurant) {
    res.json(restaurant);
  });
});
//get specific restaurant

router.route("/getchefbyId/:id").get(async (req, res) => {
  const restaurant = await NewRestaurant.findOne({
    restaurant_id: req.params.id,
  });
  res.json(restaurant);
});
//get specific restaurant

router.route("/cuisine_type/:meal").get(function (req, res) {
  const meal_type = req.params.meal;
  NewRestaurant.find(
    {
      $and: [{ status: "Active" }, { cuisine_type: meal_type }],
    },
    function (err, restaurants) {
      if (!err) {
        res.json(restaurants);
      }
    }
  );
});
// filter by cuisine_type

router.route("/category/:food").get(function (req, res) {
  const meal_type = req.params.food;
  NewRestaurant.find(
    { $and: [{ status: "Active" }, { category: meal_type }] },
    function (err, restaurants) {
      if (!err) {
        res.json(restaurants);
      }
    }
  );
});
// filter by lunch dinner

router.route("/meal_type/:food").get(function (req, res) {
  const meal_type = req.params.food;
  NewRestaurant.find(
    { $and: [{ status: "Active" }, { meal_type: meal_type }] },
    function (err, restaurants) {
      if (!err) {
        res.json(restaurants);
      }
    }
  );
});
// filter by veg non-veg

router.route("/price/:order").get(function (req, res) {
  const order = req.params.order;
  NewRestaurant.find(function (err, restaurants) {
    if (err) {
      console.log(err);
    } else {
      function compare(a, b) {
        let p1 = a.plan.twoPlan.base_2price;
        let p2 = b.plan.twoPlan.base_2price;
        if (order === "asc") {
          return parseFloat(p1) - parseFloat(p2);
        } else {
          return parseFloat(p2) - parseFloat(p1);
        }
      }
      const filtered_restaurant = restaurants.sort(compare);
      res.json(filtered_restaurant);
    }
  });
});
// filter by price

router.route("/").delete((req, res, next) => {
  NewRestaurant.deleteMany({}, (err, resp) => {
    res.json({ msg: "All Deleted" });
  });
});
//delete all

router.route("/push_promo").put(async (req, res) => {
  const id = req.body._id;
  const { coupon } = req.body;
  NewRestaurant.findById(id, function (err, rest) {
    if (rest) {
      rest.promo.push(coupon);
      rest
        .save()
        .then((rest) => rest)
        .then((restaurant) => {
          res.json({
            statusText: "updated",
            data: restaurant,
            msg: "Coupon Added Successfully",
          });
        })
        .catch((err) => {
          res.status(400).send("adding new coupon failed");
        });
    } else {
      res.json({ statusText: "NF", msg: "Please login first to proceed" });
    }
  });
});
//

router.route("/getorders/:restaurant_id").get(async (req, res) => {
  const response = await NewRestaurant.findOne({
    restaurant_id: req.params.restaurant_id,
  });
  const profile_pic = await response.documents[1].banner_image;
  const myorders = await Orders.find({
    restaurant_id: req.params.restaurant_id,
  });
  const totalOrders = await myorders.length;
  const meals = await response.meals;
  res.json({
    totalOrders: totalOrders,
    meals: meals,
    profile_pic: profile_pic,
  });
});

module.exports = router;
