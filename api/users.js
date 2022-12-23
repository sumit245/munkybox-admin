const express = require("express");
const router = express.Router();
const Users = require("../models/users.model");
const NewRestaurant = require("../models/newrest.model");

router.route("/").get(async (req, res) => {
  const users = await Users.find({})
  res.json(users)
});
//get all user

router.route("/").post(async function (req, res) {
  const { phone } = req.body;
  const user = await Users.findOne({ phone: phone }).exec();
  if (user) {
    return res.json({ status: 201, data: user, msg: "User Already Exists" });
  }
  else {
    const count = await Users.count()
    const userId = "USER".concat(count.toString().padStart(4, "0"))
    const user = new Users({ phone: phone, user_id: userId });
    const response = await user.save()
    res.json({
      status: 200,
      data: response,
      msg: `A 6-digit OTP has been sent to your mobile ${phone}`
    })
  }

});
//save a singe user to database

router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Users.findById(id, function (err, user) {
    res.json(user);
  });
});
//get specific users

router.put("/:id", function (req, res, next) {
  let id = req.params.id;
  Users.findByIdAndUpdate(id, req.body, (err, response) => {
    if (err) {
      res.json({ status: 403, msg: "Bad Request" });
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
//retrieve favourite

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
//add an address
router.put("/changeaddress/:id", function (req, res) {
  const id = req.params.id;
  const address = req.body.addresses;
  Users.findById(id, function (err, user) {
    if (user) {
      user.addresses = address;
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
//add an address

router.put("/editaddress/:id", function (req, res) {
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
//add an address

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
//add a card

router.route("/getaddress/:id").get(function (req, res) {
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
//get an address
router.route("/getcards/:id").get(function (req, res) {
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
//get a card
router.route("/deletecards/:userid/:cardid").get(function (req, res) {
  Users.findById(id, function (err, user) {
    if (user) {
      let { cards } = user;
      cards.findOneAndDelete(
        { _id: req.params.cardid },
        function (err, response) {
          if (response) {
            res.json({ status: 200, data: response, msg: "Deleted" });
          }
        }
      );
    }
  });
});
//delete a card
router.route("/add_review/:restaurant/:user").post(function (req, res) {
  const user = req.params.user;
  const review = {
    user_name: user,
    reviews: req.body.reviews,
  };
  const restaurant_name = req.params.restaurant;
  NewRestaurant.findOne(
    { restaurant_name: restaurant_name },
    function (err, restaurant) {
      let myReview = restaurant.reviews;
      myReview.push(review);
      let id = restaurant._id;
      NewRestaurant.updateOne(
        { reviews: myReview },
        function (err, affected, resp) {
          if (err) {
            res.send({ status: 400, data: err, msg: "" });
          } else {
            res.send({
              status: "200",
              data: resp,
              msg: "Thank you for your review",
            });
          }
        }
      );
    }
  ).catch((err) => res.send(err));
});
//add a review

router.route("/").delete((req, res, next) => {
  Users.deleteMany({}, (err, resp) => {
    res.json({ msg: "All Deleted" });
  });
});
//delete all users

module.exports = router;
