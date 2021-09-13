const express = require("express");
const router = express.Router();
const Partner = require("../models/partnerrequest.model");

router.route("/").get(function (req, res) {
  Partner.find(function (err, partners) {
    if (err) {
      res.json({ status: "404", data: err, msg: "Request not found" });
    } else {
      res.json({ status: "404", data: partners, msg: "Request not found" });
    }
  });
});

router.route("/").post(function (req, res) {
  let partner = new Partner(req.body);
  partner
    .save()
    .then((partner) => partner)
    .then((partner) => {
      res.json({
        status: 200,
        data: partner,
        msg: "Request Submitted successfully",
      });
    })
    .catch((err) => {
      res.json({ status: 404, data: err, msg: "adding new partner failed" });
    });
});
//save a singe partner to database

router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Partner.findById(id, function (err, partner) {
      if (err) {
        res.json({status:404,data:err,msg:"No Request Found!!! Please try later"})
      }
      else {
          res.json({status:200,data:partner,msg:"Request received"})
      }
  });
});
//get specific partner


router.put("/:id", function (req, res, next) {
  let id = req.params.id;
  Partner.findByIdAndUpdate(id, req.body, (err, response) => {
    if (err) {
      res.json({ status: 403, msg: "Bad Request" });
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
      console.log(next(err));
      res.status(200).json({ data: "deleted" });
    } else {
      console.log("deleted_succesfully");
    }
  });
});
router.route('/').delete((req, res, next)=>{
    Partner.deleteMany({}, (err, resp) => {
        res.json({msg:'All Deleted'})
    })
})
module.exports = router;
