const express = require("express");
const router = express.Router();
const Promo = require("../models/banners.model");
const Restaurants = require("../models/newrest.model");

router.route("/").get(async (req, res) => {
  const banner = await Promo.find();
  res.json({ status: 200, data: banner, msg: "Plans Fetched" });
});
//get all banners

router.route("/active").get(async (req, res) => {
  const allRestaurants = await Restaurants.find();
  const allBanners = await Promo.find();
  let promoted_restaurants = [];
  for (let i = 0; i < allRestaurants.length; i++) {
    for (let j = 0; j < allBanners.length; j++) {
      if (allBanners[j].restaurant_id === allRestaurants[i].restaurant_id) {
        promoted_restaurants.push(allRestaurants[i]);
      }
    }
  }
  res.json(promoted_restaurants);
});
//get promotions for users
router.route("/:restaurant_id").get(async (req, res) => {
  const banner = await Promo.find({ restaurant_id: req.params.restaurant_id });
  res.json(banner);
});
router.route("/").post(async (req, res) => {
  const newBanner = new Promo(req.body);
  const banner = await newBanner.save();
  res.json({ status: 200, data: banner, msg: "New Plan Added" });
});
//save a banner

router.route("/:id").get(async (req, res) => {
  let { id } = req.params;
  const banner = await Promo.findById(id);
  res.json({ status: 200, data: banner, msg: "Promo Plan Fetched" });
});
//get specific banner

router.route("/:id").put(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const banner = await Promo.findByIdAndUpdate(id, data);
  res.json({ status: 200, data: banner, msg: "Plan Updated" });
});
//update a banner

router.route("/:id").delete(async (req, res) => {
  const { id } = req.params;
  const banner = await Promo.findByIdAndDelete(id);
  res.json({ status: 200, data: banner, msg: "Plan Deleted" });
});
//delete a banner

router.route("/").delete(async (req, res) => {
  const response = await Promo.deleteMany({});
  res.json({ status: 200, data: response.data, msg: "All Deleted" });
});
// Delete all

module.exports = router;
