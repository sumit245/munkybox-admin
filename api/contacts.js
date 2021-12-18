const express = require("express");
const router = express.Router();
const Contact = require("../models/contacts.model");

router.route("/").get(function (req, res) {
  Contact.find(function (err, contact) {
    if (err) {
      console.log(err);
    } else {
      res.json(contact);
    }
  });
});
//get all orders

router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Contact.findById(id, function (err, contact) {
    res.json(contact);
  });
});
//get specific contact

router.route("/").post(function (req, res) {
  let contact = new Contact(req.body);
  contact
    .save()
    .then((response) => {
      res.json({ data: response, msg: "Contact Placed!!!", status: 200 });
    })
    .catch((err) => {
      res.status(400).send("Failed");
    });
});
//save a contact

router.route("/:id").delete(async (req, res) => {
  const response = await Contact.findByIdAndDelete(req.params.id);
  if (response !== null) {
    res.json({ status: 200, msg: "Deleted", data: response });
  }
});
//delete single contact


router.route("/").delete((req, res, next) => {
  Contact.deleteMany({}, (err, resp) => {
    res.json({ msg: "All Deleted" });
  });
});
//delete all

module.exports = router;
