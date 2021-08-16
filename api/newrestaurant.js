const express = require("express");
const router = express.Router();
const NewRestaurant = require("../models/newrest.model");

router.route("/").get(function (req, res) {
  NewRestaurant.find(function (err, factories) {
    if (err) {
      console.log(err);
    } else {
      res.json(factories);
    }
  });
});
//get all restaurants
router.route("/login").post(function (req, res) {
  NewRestaurant.findOne({ email: req.body.email })
    .then((profile) => {
      if (!profile) {
        res.send("User does not exist");
      } else {
        if (profile.phone === req.body.phone) {
          res.send(profile);
        } else {
          res.send("Authentication Failed");
        }
      }
    })
    .catch((err) => {
      console.log("Error is", err.message);
    });
});
//restaurant login

router.route("/:id").delete((req, res, next) => {
  NewRestaurant.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(next(err));
      res.status(200).json({ data: "deleted" });
    } else {
      console.log("deleted successfully");
    }
  });
});
//delete a restaurant

router.route("/").post(function (req, res) {
  let restaurant = new NewRestaurant(req.body);
  restaurant
    .save()
    .then((restaurant) => {
      res.status(200).json({ restaurant: "restaurant added successfully" });
    })
    .catch((err) => {
      res.status(400).send("Failed");
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

router.route("/cuisine_type/:meal").get(function (req, res) {
  const meal_type = req.params.meal;
  NewRestaurant.find(function (err, restaurants) {
    if (err) {
      console.log(err);
    } else {
      const filtered_restaurant = restaurants.filter(function (item) {
        return item.cuisine_type === meal_type;
      });
      res.json(filtered_restaurant);
    }
  });
});
// filter by cuisine_type

router.route("/category/:food").get(function (req, res) {
  const meal_type = req.params.food;
  NewRestaurant.find(function (err, restaurants) {
    if (err) {
      console.log(err);
    } else {
      const filtered_restaurant = restaurants.filter(
        (data) => data.category === meal_type
      );
      res.json(filtered_restaurant);
    }
  });
});
// filter by lunch dinner

router.route("/meal_type/:food").get(function (req, res) {
  const meal_type = req.params.food;
  NewRestaurant.find(function (err, restaurants) {
    if (err) {
      console.log(err);
    } else {
      const filt_rest = restaurants.filter(function (item) {
        return item.meal_type === meal_type;
      });
      res.json(filt_rest);
    }
  });
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

module.exports = router;
