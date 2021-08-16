const express = require("express");
const router = express.Router();
const Order = require("../models/orders.model");

router.route("/").get(function (req, res) {
  Order.find(function (err, order) {
    if (err) {
      console.log(err);
    } else {
      res.json(order);
    }
  });
});
//get all factories

router.route("/:id").delete((req, res, next) => {
  Order.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(next(err));
      res.status(200).json({ data: "deleted" });
    } else {
      console.log("deleted successfully");
    }
  });
});
//delete a order

router.route("/").post(function (req, res) {
  let order = new Order(req.body);
  console.log(order);
  order
    .save()
    .then((response) => {
      res.json({data:response,msg:"Order Placed!!!",status:200})
    })
    .catch((err) => {
      res.status(400).send("Failed");
    });
});
//save a order
router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Order.findById(id, function (err, order) {
    res.json(order);
  });
});
//get specific order

// router.route("/:id").post(function (req, res) {
//   Order.findById(req.params.id, function (err, order) {
//     if (!order) res.status(404).send("data is not found");
//     else
//       (order.client_name = req.body.client_name),
//         (order.restaurant_name = req.body.restaurant_name),
//         (order.email = req.body.email),
//         (order.owner_name = req.body.owner_name),
//         (order.cuisine_type = req.body.cuisine_type),
//         (order.city = req.body.city),
//         (order.area = req.body.area),
//         (order.phone = req.body.phone),
//         (order.address = req.body.address),
//         (order.postal_code = req.body.postal_code),
//         (order.image = req.body.image),
//         (order.food_name = req.body.food_name),
//         (order.documents = req.body.documents),
//         (order.business_hours = req.body.business_hours),
//         (order.commissions = req.body.commissions)
//     order
//       .save()
//       .then((order) => {
//         res.json("Order Update Successfully");
//       })
//       .catch((err) => {
//         res.status(400).send("Update not possible");
//       });
//   });
// });
// //update a order

module.exports = router;
