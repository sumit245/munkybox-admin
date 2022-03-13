const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const timeout = require("connect-timeout");
require("./database/database");

const orders = require("./api/orders");
const users = require("./api/users");
const plan = require("./api/plan");
const cuisine = require("./api/cuisine");
const checkout = require("./api/checkoutoptions");
const banner = require("./api/bannerPlan");
const newrest = require("./api/newrestaurant");
const coupon = require("./api/coupon");
const promo = require("./api/promotions");
const contacts = require("./api/contacts");
const partner = require("./api/partnerrequest");
const slot = require("./api/slots");
const policies = require("./api/policies");
const chefdashboard = require("./api/restaurantdash");
const review = require("./api/reviews");
const currentOrders = require("./api/currentorder");
const payout = require("./api/admintochefpayments");
const payoutcycle = require("./api/payoutcycle");

const app = express();
const port = process.env.PORT || 5000;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
  appInfo: {
    // For sample support and debugging, not required for production:
    name: "feasti dash inc",
    version: "0.0.2",
    url: "https://github.com/stripe-samples",
  },
});

app.post("/create-payment-intent", async (req, res) => {
  const params = {
    amount: req.body.amount,
    currency: req.body.currency,
  };

  try {
    const paymentIntent = await stripe.paymentIntents.create(params);
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

app.use(cors());
app.use("/api/users", users);

app.use(timeout("90s"));
app.use("/api/newrest", newrest);
app.use(haltOnTimedout);

app.use("/api/orders", orders);
app.use("/api/plans", plan);
app.use("/api/cuisine", cuisine);
app.use("/api/checkout", checkout);
app.use("/api/getcurrentorder", currentOrders);
app.use("/api/banner", banner);
app.use("/api/coupon", coupon);
app.use("/api/promo/", promo);
app.use("/api/policies", policies);
app.use("/api/chefdashboard", chefdashboard);
app.use("/api/partnerrequest", partner);
app.use("/api/slots", slot);
app.use("/api/contacts", contacts);
app.use("/api/admintochefpayments", payout);
app.use("/api/payoutcycle", payoutcycle);
app.use("/api/review", review);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "./build/")));
  app.get("/**", (req, res) => {
    res.sendFile(path.join(__dirname, "./build/"));
  });
}

function haltOnTimedout(req, res, next) {
  if (!req.timedout) next();
}

app.listen(port, () => {
  console.warn(`Server started on port ${port}`);
});
