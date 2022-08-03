const express = require("express");
const moment = require("moment");
const router = express.Router();
const NewRestaurant = require("../models/newrest.model");
const Orders = require("../models/orders.model");
const Payout = require("../models/payouts.model");
const RestaurantDashboard = require("../models/restaurant_dashboard.model");
const Payoutcycle = require("../models/payoutcylce.model");
const Transaction = require("../models/transactions.model");

router.route("/").get(async (req, res) => {
  const restaurants = await NewRestaurant.find(
    {},
    { restaurant_id: 1, restaurant_name: 1, email: 1 }
  );
  const orders = await Orders.find(
    { status: { $ne: "rejected" } },
    {
      order_id: 1,
      restaurant_id: 1,
      price: 1,
      base_price: 1,
      plan: 1,
      add_on: 1,
      start_date: 1,
      discount: 1,
      promo_id: 1,
    }
  );
  function add(accumulator, a) {
    return parseFloat(accumulator) + parseFloat(a);
  }
  const dashboard = await RestaurantDashboard.find(
    {},
    { restaurant_id: 1, banners: 1, coupons: 1 }
  );
  let payouts = [];
  restaurants.forEach((restaurant) => {
    payouts.push({
      restID: restaurant.restaurant_id,
      restEmail: restaurant.email,
      restName: restaurant.restaurant_name,
      totalMerchAmt: orders
        .filter((order) => order.restaurant_id === restaurant.restaurant_id)
        .map((item) => item.base_price)
        .reduce(add, 0),
      totalBannerDue:
        dashboard
          .filter(
            (dashboard) => dashboard.restaurant_id === restaurant.restaurant_id
          )
          .map((dash) => dash.banners)
          .flat().length > 0
          ? dashboard
              .filter(
                (dashboard) =>
                  dashboard.restaurant_id === restaurant.restaurant_id
              )
              .map((dash) => dash.banners)
              .flat()
              .map((banner) => banner.due)
              .reduce(add, 0)
          : 0,
      totalDiscount: orders
        .filter(
          (order) =>
            order.restaurant_id === restaurant.restaurant_id &&
            order.promo_id !== "PROMOADMIN"
        )
        .map((item) => parseFloat(item.discount))
        .reduce(add, 0),
      totalAdminDiscount: orders
        .filter(
          (order) =>
            order.restaurant_id === restaurant.restaurant_id &&
            order.promo_id === "PROMOADMIN"
        )
        .map((item) => parseFloat(item.discount))
        .reduce(add, 0),
      totalAddOnAmt:
        orders
          .filter((order) => order.restaurant_id === restaurant.restaurant_id)
          .map((item) => item.add_on).length > 0
          ? [].concat
              .apply(
                [],
                orders
                  .filter(
                    (order) => order.restaurant_id === restaurant.restaurant_id
                  )
                  .flatMap((item) => item.add_on)
              )
              .map((item) => item.subtotal)
              .reduce(add, 0)
          : 0,
      totalCommissionAmt: orders
        .filter((order) => order.restaurant_id === restaurant.restaurant_id)
        .map((item) => parseFloat(item.base_price).toFixed(2) * 0.1)
        .reduce(add, 0),
      commissionAmt: orders
        .filter((order) => order.restaurant_id === restaurant.restaurant_id)
        .map((item) => parseFloat(item.base_price).toFixed(2) * 0.1)
        .reduce(add, 0),
    });
  });
  payouts.map((item) => {
    item.totalAddOnCommissionAmt =
      parseFloat(item.totalAddOnAmt).toFixed(2) * 0.1;
  });
  payouts.map((item) => {
    item.totalCommissionAmt = parseFloat(
      item.totalCommissionAmt + item.totalAddOnCommissionAmt
    ).toFixed(2);
  });
  payouts.map((item) => {
    item.payable = item.totalMerchAmt - item.totalCommissionAmt;
  });
  res.json({
    payouts: payouts,
  });
});
// get all payouts for chef

router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Payout.findById(id, function (err, payout) {
    if (!err) {
      res.json(payout);
    }
  });
});
//get specific payout

router.route("/").post(function (req, res) {
  let payout = new Payout(req.body);
  payout
    .save()
    .then((response) => {
      res.json({ data: response, msg: "New Payout Saved", status: 200 });
    })
    .catch((err) => {
      res.status(400).send("Failed");
    });
});
//post a payout

router.route("/:id").delete(async (req, res) => {
  const response = await Payout.findByIdAndDelete(req.params.id);
  if (response !== null) {
    res.json({ status: 200, msg: "Deleted", data: response });
  }
});
//delete single payout

router.route("/getchefpayout/:rest_id").get(async (req, res) => {
  function add(accumulator, a) {
    return parseFloat(accumulator) + parseFloat(a);
  }

  const payoutcycle = await Payoutcycle.findOne({ status: "current" });
  const { start_date, end_date } = payoutcycle;
  const myorders = await Orders.find({
    $and: [
      { restaurant_id: req.params.rest_id },
      {
        $or: [
          { status: "accepted" },
          { status: "started" },
          { status: "completed" },
        ],
      },
    ],
  });

  let updatedorders = myorders.filter((item) =>
    moment(item.order_time).isBetween(
      moment(start_date),
      moment(end_date),
      null,
      "[]"
    )
  );

  const basePrices = updatedorders.map((order) => order.base_price);
  let totalBaseIncome = basePrices.reduce(add, 0);
  const discounts = updatedorders
    .filter((item) => item.promo_id !== "PROMOADMIN")
    .map((order) => order.discount);
  let totalDiscount = discounts.reduce(add, 0);
  let x = updatedorders.map((order) => order.add_on);

  let addOns = myorders.map((el) => el.add_on);
  addOns = [].concat.apply([], addOns);
  let currentAdOns = addOns;
  // addOns.filter((item) => item.item === "Pie");

  const dimensions = [
    currentAdOns.length,
    currentAdOns.reduce((x, y) => Math.max(x, y.length), 0),
  ];
  let totalCount = 0;
  let totalPrice = 0;
  if (dimensions[0] !== 0) {
    currentAdOns = [].concat.apply([], currentAdOns);
    currentAdOns = currentAdOns.filter((item) =>
      moment(item.order_date).isBetween(
        moment(start_date),
        moment(end_date),
        null,
        "[]"
      )
    );
    totalCount = currentAdOns.map((item) => item.qty).reduce(add, 0);
    totalPrice = currentAdOns.map((item) => item.subtotal).reduce(add, 0);
  } else {
    totalCount = 0;
    totalPrice = 0;
  }

  const dashboard = await RestaurantDashboard.findOne({
    restaurant_id: req.params.rest_id,
  });

  let { banners } = dashboard;
  let dues = banners
    .filter(
      (item) =>
        item.status === "Inactive" &&
        moment(item.end_date).isBetween(moment(start_date), moment(end_date))
    )
    .map((item) => item.due);
  let dueAmt = dues.reduce(add, 0);

  res.json({
    restID: req.params.restaurant_id,
    totalBaseIncome: totalBaseIncome,
    totalDiscount: totalDiscount,
    numOrders: updatedorders.length,
    due: dueAmt,
    orders: updatedorders,
    payout_start_date: start_date,
    payout_end_date: end_date,
    totalAddOns: totalCount,
    totalAddOnRevenue: totalPrice,
    currentAdOns: currentAdOns,
    today: moment("27-Jul-2022"),
  });
});
//get current payout for all chef

router.route("/getpastpayout/:rest_id").get(async (req, res) => {
  function add(accumulator, a) {
    return parseFloat(accumulator) + parseFloat(a);
  }

  const payoutcycle = await Payoutcycle.find({ status: "expired" }, null, {
    sort: { start_date: -1 },
  });
  let pastpayouts = payoutcycle.map((item) => ({
    start_date: item.start_date,
    end_date: item.end_date,
  }));
  const myorders = await Orders.find({
    $and: [
      { restaurant_id: req.params.rest_id },
      {
        $or: [
          { status: "accepted" },
          { status: "started" },
          { status: "completed" },
        ],
      },
    ],
  });
  const dashboard = await RestaurantDashboard.findOne({
    restaurant_id: req.params.rest_id,
  });
  const restaurantDetails = await NewRestaurant.findOne({
    restaurant_id: req.params.rest_id,
  });
  const transaction = await Transaction.find({
    restaurant_id: req.params.rest_id,
  });
  let pp = pastpayouts.map((item) => {
    let sd = item.start_date;
    let nd = item.end_date;
    let currentTransaction = transaction.filter(
      (txn) => txn.start_date === sd && txn.end_date === nd
    );
    currentTransaction = currentTransaction[0];
    let txn_id =
      typeof currentTransaction === "object" &&
      Object.keys(currentTransaction, "txn_id")
        ? currentTransaction.txn_id
        : "";
    let deposit_date =
      typeof currentTransaction === "object" &&
      Object.keys(currentTransaction, "deposit_date")
        ? currentTransaction.deposit_date
        : "";
    let status =
      typeof currentTransaction === "object" &&
      Object.keys(currentTransaction, "status")
        ? currentTransaction.status
        : "";
    let updatedorders = myorders.filter((item) =>
      moment(item.order_time).isBetween(moment(sd), moment(nd), null, "[]")
    );
    const basePrices = updatedorders.map((order) => order.base_price);
    let totalAddOns =
      myorders.map((item) => item.add_on).length > 0
        ? [].concat
            .apply(
              [],
              myorders.flatMap((item) => item.add_on)
            )
            .filter((item) =>
              moment(item.order_date).isBetween(
                moment(sd),
                moment(nd),
                null,
                "[]"
              )
            )
            .map((item) => item.qty)
            .reduce(add, 0)
        : 0;

    let totalAddOnRevenue =
      myorders.map((item) => item.add_on).length > 0
        ? [].concat
            .apply(
              [],
              myorders.flatMap((item) => item.add_on)
            )
            .filter((item) =>
              moment(item.order_date).isBetween(
                moment(sd),
                moment(nd),
                null,
                "[]"
              )
            )
            .map((item) => item.subtotal)
            .reduce(add, 0)
        : 0;
    let totalBaseIncome = basePrices.reduce(add, 0);
    let totalCommission = totalBaseIncome * 0.1;
    const discounts = updatedorders
      .filter((order) => order.promo_id !== "PROMOADMIN")
      .map((order) => order.discount);
    let totalDiscount = discounts.reduce(add, 0);
    let AdOnsCommission = totalAddOnRevenue * 0.1;
    let { banners } = dashboard;
    let dues = banners
      .filter(
        (item) =>
          item.status === "Inactive" &&
          moment(item.end_date).isBetween(moment(sd), moment(nd))
      )
      .map((item) => item.due);
    let dueAmt = dues.reduce(add, 0);
    const { account_number, bank_name, branch_number, institution_number } =
      restaurantDetails;
    let chefBalance = parseFloat(
      totalBaseIncome +
        totalAddOnRevenue -
        AdOnsCommission -
        totalCommission -
        totalDiscount -
        dueAmt
    ).toFixed(2);
    return {
      restID: req.params.rest_id,
      account_number: account_number,
      bank_name: bank_name,
      branch_number: branch_number,
      institution_number: institution_number,
      orders: updatedorders,
      totalAddOns: totalAddOns,
      numOrders: updatedorders.length,
      totalBaseIncome: totalBaseIncome,
      totalCommission: totalCommission,
      totalDiscount: totalDiscount,
      due: dueAmt,
      totalAddOnRevenue: totalAddOnRevenue,
      chefBalance: chefBalance,
      txn_id: txn_id,
      status: status,
      deposit_date: deposit_date,
      payout_end_date: nd,
      payout_start_date: sd,
    };
  });
  res.json(pp);
});
//get past payout for all chef

router.route("/deposit").post(async (req, res) => {
  let transaction = new Transaction(req.body);
  const response = await transaction.save();
  if (response) {
    res.json({
      data: response,
      status: 200,
    });
  }
});

module.exports = router;
