const { response } = require("express");
const express = require("express");
const router = express.Router();
const Users = require("../models/users.model");
const NewRestaurant = require("../models/newrest.model");
router.route("/").get(function (req, res) {
  Users.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});
//get all user

router.route("/").post(function (req, res) {
  let data = new Users(req.body);
  console.log(data);
  Users.findOne({ phone: req.body.phone }).then((user) => {
    if (user) {
      return res.json({ status: 201, data: user, msg: "User Already Exists" });
    } else {
      data.save((err, users) => {
        if (users) {
          res.json({ status: 200, data: users, msg: "Welcome to Munky-Box" });
        } else {
          Users.findOne({ email_id: data.email_id }).then((user) => {
            return res.json({
              status: 202,
              data: user,
              msg: "Email Already Taken",
            });
          });
        }
      });
    }
  });
});
//save a singe user to database

router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Users.findById(id, function (err, user) {
    res.json({ favorites: user });
  });
});
//get specific user

router.put("/:id", function (req, res, next) {
  let id = req.params.id;
  console.log(req.body);
  Users.findByIdAndUpdate(id, req.body, (err, response) => {
    if (err) {
      console.log(err);
      res.json({status:403,msg:'Bad Request'})
    } else {
      Users.findById(id, function (error, user) {
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
  Users.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});
//delete a user

router.put("/addfavorite/:id", function (req, res) {
  let id = req.params.id;
  let favorite = req.body.favorite;
  Users.findById(id, function (err, user) {
    if (user) {
      if (user.favorite.includes(favorite)) {
        const index = user.favorite.indexOf(favorite);
        user.favorite.splice(index, 1);
      } else {
        user.favorite.push(favorite);
      }
      user
        .save()
        .then((user) => user)
        .then((response) => {
          res.json({
            status: 200,
            data: response,
            msg: "Added To Favorite",
            statusText: "Updated",
          });
        })
        .catch((err) => {
          res.status(400).send("adding new favorite failed");
        });
    } else {
      res.json({
        statusText: "NF",
        msg: "Please Login First to add to favorite",
      });
    }
  });
});
//add to favourite

router.route("/getfavorite/:id").get(function (req, res, next) {
  const id = req.params.id;
  Users.findById(id, function (err, user) {
    if (user) {
      let favorites = user.favorite;
      console.log(favorites);
      NewRestaurant.find({ restaurant_name: favorites })
        .then((favorites) => {
          return res.json({ status: 200, data: favorites });
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      res.json({ status: 400 });
    }
  });
});

router.put("/addaddress/:id", function (req, res) {
  let id = req.params.id;
  let address = req.body.address;
  Users.findById(id, function (err, user) {
    if (user) {
      user.addresses.push(address);
      user
        .save()
        .then((user) => user)
        .then((response) => {
          res.json({
            statusText: "updated",
            data: response,
            msg: "Address Added Successfully",
          });
        })
        .catch((err) => {
          res.status(400).send("adding new address failed");
        });
    } else {
      res.json({ statusText: "NF", msg: "Please login first to proceed" });
    }
  });
});

router.put("/addcard/:id", function (req, res) {
  let id = req.params.id;
  let card = req.body.card;
  console.log(card);
  Users.findById(id, function (err, user) {
    if (user) {
      user.cards.push(card);
      user
        .save()
        .then((user) => user)
        .then((response) => {
          res.json({
            statusText: "updated",
            data: response,
            msg: "Card Added Successfully",
          });
        })
        .catch((err) => {
          res.status(400).send("adding new card failed");
        });
    } else {
      res.json({ statusText: "NF", msg: "Please login first to proceed" });
    }
  });
});

router.route("/getaddress/:id").get(function (req, res, next) {
  const id = req.params.id;
  Users.findById(id, function (err, user) {
    if (user) {
      let addresses = user.addresses;
      res.json({ status: 200, data: addresses });
    } else {
      res.json({ status: 400 });
    }
  });
});
router.route("/getcards/:id").get(function (req, res, next) {
  const id = req.params.id;
  Users.findById(id, function (err, user) {
    if (user) {
      let cards = user.cards;
      res.json({ status: 200, data: cards });
    } else {
      res.json({ status: 400 });
    }
  });
});

//add to favourite

module.exports = router;
