const express = require("express");
const router = express.Router();
const Banner = require("../models/bannerplan.model");

router.route("/").get(async (req, res) => {
  const banner = await Banner.find();
  res.json({ status: 200, data: banner, msg: "Plans Fetched" });
});
//get all plans

router.route("/").post(async (req, res) => {
  const newBanner = new Banner(req.body);
  const banner = await newBanner.save();
  res.json({ status: 200, data: banner, msg: "New Plan Added" });
});
//save a single plan

router.route("/:id").get(async (req, res) => {
  let { id } = req.params;
  const banner = await Banner.findById(id);
  res.json({ status: 200, data: banner, msg: "Banner Plan Fetched" });
});
//get specific banner

router.route("/:id").put(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const banner = await Banner.findByIdAndUpdate(id, data);
  res.json({ status: 200, data: banner, msg: "Plan Updated" });
});
//update a banner

router.route("/:id").delete(async (req, res) => {
  const { id } = req.params;
  const banner = await Banner.findByIdAndDelete(id);
  res.json({ status: 200, data: banner, msg: "Plan Deleted" });
});
//delete a banner

module.exports = router;
