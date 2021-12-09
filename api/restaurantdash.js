const express = require("express");
const router = express.Router();
const NewRestaurant = require("../models/newrest.model");
const Orders = require("../models/orders.model");
const Users = require("../models/users.model");

router.route("/getusertypesbyrestaurant/:restaurant").get(async (req, res) => {
  const { restaurant } = req.params;
  const myOrders = await Orders.find({ restaurant: restaurant });
  const userids = myOrders.map((item) => item.user_id);
  let uniq = [...new Set(userids)];
  res.json({
    newusers: uniq.length,
    repeatedUsers: userids.length - uniq.length,
  });
});

module.exports = router;
