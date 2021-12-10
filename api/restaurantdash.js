const express = require("express");
const router = express.Router();
const NewRestaurant = require("../models/newrest.model");
const Orders = require("../models/orders.model");
const Users = require("../models/users.model");
const RestaurantDashboard = require("../models/restaurant_dashboard.model");

router.route("/getusertypesbyrestaurant/:restaurant").get(async (req, res) => {
  const { restaurant } = req.params;
  const myOrders = await Orders.find({ restaurant: restaurant });
  const userids = myOrders.map((item) => item.user_id);
  let uniq = [...new Set(userids)];
  const countOccurrences = (arr, val) =>
    arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
  let x = uniq.map((item) => countOccurrences(userids, item));
  newUse = 0;
  repeat = 0;
  x.forEach((element) => {
    if (element !== 1) {
      repeat += 1;
    } else {
      newUse += 1;
    }
  });
  res.json({
    newusers: uniq.length,
    repeatedUsers: repeat,
    more: x,
  });
});
router.route("/").post(function (req, res) {
  let order = new RestaurantDashboard(req.body);
  order
    .save()
    .then((response) => {
      res.json({ data: response, msg: "Dashboard Created", status: 200 });
    })
    .catch((err) => {
      res.status(400).send("Failed");
    });
});
//create a dashboard

router.route("/:restaurant_name").get(async (req, res) => {
  let myorders = await Orders.find({
    restaurant: req.params.restaurant_name,
  });
  RestaurantDashboard.findOne(
    { restaurant_name: req.params.restaurant_name },
    function (err, orders) {
      res.json({ totalOrders: myorders.length,orders });
    }
  );
});

router
  .route("/getchefbynameandupdatemenucount/:restaurant")
  .get(function (req, res) {
    RestaurantDashboard.findOne(
      {
        restaurant_name: req.params.restaurant,
      },
      function (err, response) {
        if (!err) {
          if (response !== null) {
            let { menuvisits, _id } = response;
            menuvisits = parseInt(menuvisits) + 1;
            RestaurantDashboard.findByIdAndUpdate(
              _id,
              { menuvisits: menuvisits },
              function (err, docs) {
                res.json(docs);
              }
            );
          } else {
            let dashboard = {
              restaurant_name: req.params.restaurant,
              menuvisits: 1,
            };
            let dash = new RestaurantDashboard(dashboard);
            dash.save().then((response) => {
              res.json(response);
            });
          }
        }
      }
    );
  });

router
  .route("/getchefbynameandupdatecartcount/:restaurant")
  .get(function (req, res) {
    RestaurantDashboard.findOne(
      {
        restaurant_name: req.params.restaurant,
      },
      function (err, response) {
        if (!err) {
          if (response !== null) {
            let { cartVisit, _id } = response;
            cartVisit = parseInt(cartVisit) + 1;
            RestaurantDashboard.findByIdAndUpdate(
              _id,
              { cartVisit: cartVisit },
              function (err, docs) {
                res.json(docs);
              }
            );
          } else {
            let dashboard = {
              restaurant_name: req.params.restaurant,
              cartVisit: 1,
            };
            let dash = new RestaurantDashboard(dashboard);
            dash.save().then((response) => {
              res.json(response);
            });
          }
        } else {
          res.json(err);
        }
      }
    );
  });

module.exports = router;
