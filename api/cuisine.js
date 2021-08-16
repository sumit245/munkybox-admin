const express = require("express");
const router = express.Router();
const Cuisine = require("../models/cuisine.model");

router.route("/").get(function (req, res) {
    Cuisine.find(function (err, cuisine) {
        if (err) {
            console.log(err);
        } else {
            res.json(cuisine)

        }
    });
});

router.route("/").post(function (req, res) {
    let cuisine = new Cuisine(req.body);
    cuisine
        .save()
        .then((cuisine) => cuisine)
        .then((cuisine) => {
            res.status(200).json({ cuisine: "Done..." });
            res.send(cuisine);
        })
        .catch((err) => {
            res.status(400).send("adding new Client failed");
        });
});

router.route("/:id").delete((req, res, next) => {
    Cuisine.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            console.log(next(err));
            res.status(200).json({ data: "deleted" });
        } else {
            console.log("deleted_succesfully");
        }
    });
});
//delete a user


module.exports = router;
