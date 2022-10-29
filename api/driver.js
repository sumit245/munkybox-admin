const express = require("express");
const router = express.Router();
const Drivers = require("../models/driver.model");

router.route("/").get(function (req, res) {
    Drivers.find(function (err, drivers) {
        if (err) {
            console.log(err);
        } else {
            res.json(drivers);
        }
    });
});
//get all user

router.route("/").post(async function (req, res) {
    let data = req.body;
    if (typeof data.phone !== "undefined") {
        const phone = await Drivers.findOne({ phone: data.phone, $ne: { status: "Unapproved" } }).exec();
        if (phone) {
            return res.json({ status: 201, data: phone, msg: "User Already Exists" });
        } else {
            let driver_length = await Drivers.find();
            driver_length = driver_length.length;
            driver_length = driver_length.toString().padStart(4, "0");
            data.driver_id = "DRV".concat(driver_length);
            const drivers = new Drivers(data);
            drivers
                .save()
                .then((response) => {
                    res.json({
                        status: 200,
                        data: response,
                        msg: "Welcome to Feasti. Our representative will contact you soon after verification of documents attached.",
                    });
                })
                .catch((err) => {
                    res.send(err);
                });
        }
    }
});
//save a singe user to database

router.route("/:id").get(function (req, res) {
    let id = req.params.id;
    Drivers.findById(id, function (err, user) {
        res.json(user);
    });
});
//get specific drivers

router.put("/:id", function (req, res, next) {
    let id = req.params.id;
    Drivers.findByIdAndUpdate(id, req.body, (err, response) => {
        if (err) {
            res.json({ status: 403, msg: "Bad Request" });
        } else {
            Drivers.findById(id, function (error, user) {
                res.json({
                    status: 201,
                    data: user,
                    msg: "Account Updated Successfully",
                });
            });
        }
    });
});
//update a user

router.route("/:id").delete((req, res, next) => {
    Drivers.findOneAndDelete({ _id: req.params.id })
        .then((data) => res.json(data))
        .catch(next);
});
//delete a user

router.route("/").delete((req, res, next) => {
    Drivers.deleteMany({}, (err, resp) => {
        res.json({ msg: "All Deleted" });
    });
});
//delete all drivers

module.exports = router;
