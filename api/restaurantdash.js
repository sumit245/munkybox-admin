const express = require("express");
const router = express.Router();
const NewRestaurant = require("../models/newrest.model");
const Orders = require("../models/orders.model");
const Banner = require("../models/banners.model");
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
  let totalorders = myorders.length;
  let accepted = myorders.filter(
    (item) =>
      item.status !== "rejected" ||
      item.status !== "pending" ||
      item.status !== "cancelled"
  );
  let rejected = myorders.filter((item) => item.status === "rejected");
  let acceptedCount = accepted.length;
  let rejectedCount = rejected.length;
  RestaurantDashboard.findOne(
    { restaurant_name: req.params.restaurant_name },
    function (err, orders) {
      res.json({
        totalOrders: totalorders,
        acceptedCount: acceptedCount,
        rejectedCount: rejectedCount,
        accptanceRate: (acceptedCount / totalorders) * 100,
        rectanceRate: (rejectedCount / totalorders) * 100,
        orders,
      });
    }
  );
});

router
  .route("/getchefbyidandupdatebannercount/:restaurant")
  .get(async (req, res) => {
    const response = await Banner.findOne({
      restaurant_id: req.params.restaurant,
    });
    let { clicks, due, rpc } = response;
    clicks += 1;
    due += parseFloat(rpc);
    const update = await Banner.findByIdAndUpdate(
      { _id: response._id },
      { clicks: clicks, due: due }
    );
    res.json(update);
  });

router.route("/getchefbyidandrevenue/:restaurant").get(async (req, res) => {
  const response = await Banner.findOne({
    restaurant_id: req.params.restaurant,
  });
  const myOrders = await Orders.find({ promo_code: response.promo_code });

  let prices = myOrders.map((item) => item.base_price);
  const adder = (accumulator, curr) => accumulator + curr;
  let revenue = prices.reduce(adder);

  let discounts = myOrders.map((item) => item.discount);
  let discount = discounts.reduce(adder);

  const userids = myOrders.map((item) => item.user_id);
  let uniq = [...new Set(userids)];

  res.json({
    totalOrders: myOrders.length,
    orders: myOrders,
    banner: response,
    due: response.due,
    clicks: response.clicks,
    discount: discount,
    revenue: revenue,
    users: uniq.length,
  });
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
