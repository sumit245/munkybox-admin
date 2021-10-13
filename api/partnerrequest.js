const express = require("express");
const router = express.Router();
const Partner = require("../models/partnerrequest.model");

router.route("/").get(function (req, res) {
  Partner.find(function (err, partners) {
    if (err) {
      res.json({ status: "404", data: err, msg: "Request not found" });
    } else {
      res.json({
        status: "200",
        data: partners.reverse(),
        msg: "Requests found",
      });
    }
  });
});

router.route("/").post(function (req, res) {
  Partner.findOne({ phone: req.body.phone },function (err,partners) {
      if (partners === null) {
        let partner = new Partner(req.body);
        partner
          .save()
          .then((partner) => {
            res.json({
              status: 200,
              data: partner,
              msg: "Request Submitted successfully",
            });
          })
          .catch((err) => {
            res.json({
              status: 404,
              data: err,
              msg: "Adding new partner failed",
            });
          });
      } else {
        res.json({ status: 403, data: [], msg: "You have already requested" });
      }
  });

});
//save a singe partner to database

router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Partner.findById(id, function (err, partner) {
    if (err) {
      res.json({
        status: 404,
        data: err,
        msg: "No Request Found!!! Please try later",
      });
    } else {
      res.json({ status: 200, data: partner, msg: "Request received" });
    }
  });
});
//get specific partner

router.put("/:id", function (req, res, next) {
  let id = req.params.id;
  Partner.findByIdAndUpdate(id, req.body, (err, response) => {
    if (err) {
      res.json({ status: 403, msg: "Bad Request", data: response });
    } else {
      Partner.findById(id, function (error, partner) {
        res.json({
          status: 201,
          data: partner,
          msg: "Request Updated Successfully",
        });
      });
    }
  });
});
//update a partner

router.route("/:id").delete((req, res, next) => {
  Partner.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      res.json({ data: err, msg: "Request Not Found", status: 404 });
    } else {
      res.json({ data: data, msg: "Request Deleted", status: 200 });
    }
  });
});

router.route("/").delete((req, res, next) => {
  Partner.deleteMany({}, (err, resp) => {
    res.json({ msg: "All Deleted" });
  });
});
//delete all
module.exports = router;
