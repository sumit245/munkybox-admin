const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("./database/database");

const orders = require('./api/orders')
const users = require("./api/users");
const plan = require("./api/plan")
const cuisine = require("./api/cuisine")
const checkout = require('./api/checkoutoptions')
const newrest = require('./api/newrestaurant')
const coupon = require('./api/coupon')
const partner = require('./api/partnerrequest')

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))

app.use(cors());
app.use("/api/users", users);
app.use("/api/newrest", newrest)
app.use("/api/orders", orders)
app.use("/api/plans", plan)
app.use("/api/cuisine", cuisine)
app.use("/api/checkout", checkout)
app.use("/api/coupon", coupon)
app.use("/api/partnerrequest", partner)


if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, "./build/")));
  app.get("/**", (req, res) => {
    res.sendFile(path.join(__dirname, "./build/"));
  });
}

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
