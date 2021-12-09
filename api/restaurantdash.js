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

module.exports = router;
