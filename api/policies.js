const express = require("express");
const router = express.Router();

// Load Policy model
const Policy = require("../models/policies.model");

router.get("/", (req, res) => {
  Policy.find()
    .then((slots) => res.json(slots))
    .catch((err) => res.status(404).json({ nobooksfound: "No Policy found" }));
});

router.get("/:id", (req, res) => {
  Policy.findById(req.params.id)
    .then((slot) => res.json(slot))
    .catch((err) => res.status(404).json({ nobookfound: "No Policy found" }));
});

router.post("/", (req, res) => {
  Policy.create(req.body)
    .then((slot) => res.json({ msg: "Policy added successfully" }))
    .catch((err) => res.status(400).json({ error: "Unable to add this slot" }));
});

router.put("/:id", (req, res) => {
  Policy.findByIdAndUpdate(req.params.id, req.body)
    .then((slot) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

router.delete("/:id", (req, res) => {
  Policy.findByIdAndRemove(req.params.id, req.body)
    .then((slot) => res.json({ mgs: "Policy entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a slot" }));
});

module.exports = router;
