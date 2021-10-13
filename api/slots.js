// routes/api/slots.js

const express = require("express");
const router = express.Router();

// Load Slot model
const Slot = require("../models/slot.model");

router.get("/", (req, res) => {
  Slot.find()
    .then((slots) => res.json(slots))
    .catch((err) => res.status(404).json({ nobooksfound: "No Books found" }));
});

router.get('/:id', (req, res) => {
  Slot.findById(req.params.id)
    .then(slot => res.json(slot))
    .catch(err => res.status(404).json({ nobookfound: 'No Slot found' }));
});

router.post("/", (req, res) => {
  Slot.create(req.body)
    .then((slot) => res.json({ msg: "Slot added successfully" }))
    .catch((err) => res.status(400).json({ error: "Unable to add this slot" }));
});

router.put("/:id", (req, res) => {
  Slot.findByIdAndUpdate(req.params.id, req.body)
    .then((slot) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

router.delete("/:id", (req, res) => {
  Slot.findByIdAndRemove(req.params.id, req.body)
    .then((slot) => res.json({ mgs: "Slot entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a slot" }));
});

module.exports = router;
