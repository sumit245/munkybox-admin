const express = require("express");
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
  appInfo: {
    name: "feasti dash inc",
    version: "0.0.2",
    url: "https://github.com/stripe-samples",
  },
});

router.route("/create-payment-intent").post(async (req, res) => {
  const params = {
    amount: req.body.amount,
    currency: req.body.currency,
    payment_method_types: ["card"],
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

module.exports = router;
