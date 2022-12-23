const express = require("express");
const router = express.Router();
const NewRestaurant = require("../models/newrest.model");
const Meals = require('../models/meals.model')
const Orders = require("../models/orders.model");

router.route("/").get(async function (req, res) {
  const response = await NewRestaurant.find({})
  const meals = await Meals.find({})
  let restaurants = []
  response.forEach((restaurant) => {
    meals.filter((meal) => {
      if (restaurant.restaurant_id === meal.restaurant_id) {
        restaurant.meals = meal.meals
        restaurants.push(restaurant)
      }
    })
  })
  res.json(restaurants)
});
// get all restaurant for admin

router.route("/active").get(async function (req, res) {
  const response = await NewRestaurant.find({ status: "Active" })
  const meals = await Meals.find({})
  let restaurants = []
  response.forEach((restaurant) => {
    meals.filter((meal) => {
      if (restaurant.restaurant_id === meal.restaurant_id) {
        restaurant.meals = meal.meals
        restaurants.push(restaurant)
      }
    })
  })
  res.json(restaurants)
});
//get active restaurants for user

router.route("/login").post(async (req, res) => {
  const newChef = await NewRestaurant.findOne({ phone: req.body.phone }).exec();
  if (newChef && newChef.status !== "unapproved") {
    res.json({ status: 200, data: newChef });
  } else {
    res.json({ status: 404 });
  }
});
//restaurant login

router.route("/:id").delete(async (req, res, next) => {
  const { id } = req.params
  const response = await NewRestaurant.findByIdAndDelete(id)
  res.json({
    status: 200,
    msg: "Deleted"
  })
});
//delete a restaurant

router.route("/").post(async function (req, res) {
  let restaurant = new NewRestaurant(req.body);
  const response = await restaurant.save()
  res.json({
    data: restaurant,
    status: 200,
    msg: "Restaurant Added Successfully",
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

router.route("/:id").get(async function (req, res) {
  let { id } = req.params;
  const response = await NewRestaurant.findById(id)
  const meals = await Meals.find({})
  let restaurant = response
  meals.forEach((meal) => {
    if (restaurant.restaurant_id === meal.restaurant_id) {
      restaurant.meals = meal.meals
    }
  })
  res.json(restaurant)
});
//get specific restaurant

router.route("/getchefbyId/:id").get(async (req, res) => {
  const response = await NewRestaurant.findOne({ restaurant_id: req.params.id })
  const meals = await Meals.find({})
  let restaurant = response
  meals.forEach((meal) => {
    if (meal.restaurant_id === restaurant.restaurant_id) {
      restaurant.meals = meal.meals
    }
  })
  res.json(restaurant);
});
//get specific restaurant

router.route("/cuisine_type/:cuisine").get(async function (req, res) {
  const { cuisine } = req.params;
  const restaurants = await NewRestaurant.find({ $and: [{ status: "Active" }, { cuisine_type: cuisine }] })
  res.json(restaurants)

});
// filter by cuisine_type

router.route("/category/:food").get(async function (req, res) {
  const { food } = req.params;
  const response = await NewRestaurant.find({ $and: [{ status: "Active" }] })
  const meals = await Meals.find({})
  let restaurants = []
  response.forEach((restaurant) => {
    meals.forEach((meal) => {
      if (restaurant.restaurant_id === meal.restaurant_id) {
        const { meals } = meal
        restaurant.meals = meals.find((meal) => meal.category === food).items
        restaurants.push(restaurant)
      }

    })
  })
  res.json(restaurants)
});
// filter by lunch dinner

router.route("/meal_type/:meal_type").get(async function (req, res) {
  const { meal_type } = req.params;
  const restaurants = await NewRestaurant.find({ $and: [{ status: "Active" }, { meal_type: meal_type }] })
  res.json(restaurants)

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
