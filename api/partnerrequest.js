const express = require("express");
const router = express.Router();
const Partner = require("../models/partnerrequest.model");

router.route("/").get(function (req, res) {
    Partner.find(function (err, partners) {
        if (err) {
            console.log(err);
        } else {
            res.json(partners);
        }
    });
});

router.route("/").post(function (req, res) {
    let partner = new Partner(req.body);
    partner
        .save()
        .then((partner) => partner)
        .then((partner) => {
            res.status(200).json({ partner: "Done..." });
            res.send(partner);
        })
        .catch((err) => {
            res.status(400).send("adding new partner failed");
        });
});
//save a singe partner to database

router.route("/:id").get(function (req, res) {
    let id = req.params.id;
    Partner.findById(id, function (err, partner) {
        res.json(partner);
    });
});
//get specific partner

router.route("/:id").post(function (req, res) {
    Partner.findById(req.params.id, function (err, partner) {
        if (!partner) res.status(404).send("data is not found");
        else
            (partner.first_name = req.body.first_name),
                (partner.last_name = req.body.last_name),
                (partner.postal_code = req.body.postal_code),
                (partner.email = req.body.email),
                (partner.phone = req.body.phone),
                (partner.status = req.body.status)
        partner
            .save()
            .then((partner) => {
                res.json("Partner Update Successfully");
            })
            .catch((err) => {
                res.status(400).send("Update not possible");
            });
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
module.exports = router;
