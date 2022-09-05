const moment = require("moment");
module.exports = ({
  order_time,
  add_on,
  time,
  address,
  category,
  discount,
  email_id,
  end_date,
  meal_type,
  notes,
  order_id,
  card,
  phone,
  plan,
  price,
  delivery_fee,
  restaurant_id,
  service_fee,
  taxes,
  tip,
  total,
  restaurant,
  start_date,
  user_id,
  user_name,
  restaddress,
}) => {
  const service_fee_in_dollar = price * service_fee * 0.01;
  const taxesinDollar =
    (parseFloat(price) +
      parseFloat(service_fee_in_dollar) +
      parseFloat(delivery_fee) -
      parseFloat(discount) +
      parseFloat(tip)) *
    0.01 *
    taxes;
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Receipt-ORD001</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
    />
    <style>
      .wrapper {
        padding: 0 20px;
      }
      .wrapper-content {
        padding: 20px 10px 40px;
      }
      .resizable-panels .ibox .ibox-content {
        height: calc(100% - 49px);
      }
      .ibox-content h1,
      .ibox-content h2,
      .ibox-content h3,
      .ibox-content h4,
      .ibox-content h5,
      .ibox-title h1,
      .ibox-title h2,
      .ibox-title h3,
      .ibox-title h4,
      .ibox-title h5 {
        margin-top: 5px;
      }
      .ibox-content.text-box {
        padding-bottom: 0;
        padding-top: 15px;
      }

      .ibox {
        clear: both;
        margin-bottom: 25px;
        margin-top: 0;
        padding: 0;
      }
      .ibox.collapsed .ibox-content {
        display: none;
      }
      .ibox.collapsed .fa.fa-chevron-up:before {
        content: '\f078';
      }
      .ibox.collapsed .fa.fa-chevron-down:before {
        content: '\f077';
      }
      .ibox:after,
      .ibox:before {
        display: table;
      }
      .ibox-title {
        -moz-border-bottom-colors: none;
        -moz-border-left-colors: none;
        -moz-border-right-colors: none;
        -moz-border-top-colors: none;
        background-color: #ffffff;
        border-color: #e7eaec;
        border-image: none;
        border-style: solid solid none;
        border-width: 2px 0 0;
        color: inherit;
        margin-bottom: 0;
        padding: 15px 90px 8px 15px;
        min-height: 48px;
        position: relative;
        clear: both;
      }
      .ibox-content {
        background-color: #ffffff;
        color: inherit;
        padding: 15px 20px 20px 20px;
        border-color: #e7eaec;
        border-image: none;
        border-style: solid solid none;
        border-width: 1px 0;
      }
      .ibox-footer {
        color: inherit;
        border-top: 1px solid #e7eaec;
        font-size: 90%;
        background: #ffffff;
        padding: 10px 15px;
      }

      .ibox-content {
        clear: both;
      }
      .ibox-heading {
        background-color: #f3f6fb;
        border-bottom: none;
      }
      .ibox-heading h3 {
        font-weight: 200;
        font-size: 24px;
      }
      .ibox-title h5 {
        display: inline-block;
        font-size: 14px;
        margin: 0 0 7px;
        padding: 0;
        text-overflow: ellipsis;
        float: none;
      }
      .ibox-title .label {
        margin-left: 4px;
      }
      .ibox-title .pull-right {
        position: absolute;
        right: 15px;
        top: 15px;
      }
      .ibox-tools {
        display: block;
        float: none;
        margin-top: 0;
        position: absolute;
        top: 15px;
        right: 15px;
        padding: 0;
        text-align: right;
      }
      .ibox-tools a {
        cursor: pointer;
        margin-left: 5px;
        color: #c4c4c4 !important;
      }
      .ibox-tools a.btn-primary {
        color: #fff !important;
      }
      .ibox-tools .dropdown-menu > li > a {
        padding: 4px 10px;
        font-size: 12px;
        color: #676a6c !important;
      }
      .ibox .ibox-tools.open > .dropdown-menu {
        left: auto;
        right: 0;
      }
      .ibox-tools .dropdown-toggle::after {
        display: none;
      }
      /* TABLES */
      .table > caption + thead > tr:first-child > td,
      .table > caption + thead > tr:first-child > th,
      .table > colgroup + thead > tr:first-child > td,
      .table > colgroup + thead > tr:first-child > th,
      .table > thead:first-child > tr:first-child > td,
      .table > thead:first-child > tr:first-child > th {
        border-top: 0;
      }
      .table-bordered {
        border: 1px solid #ebebeb;
      }
      .table-bordered > thead > tr > th,
      .table-bordered > thead > tr > td {
        background-color: #f5f5f6;
        border-bottom-width: 1px;
      }
      .table-bordered > thead > tr > th,
      .table-bordered > tbody > tr > th,
      .table-bordered > tfoot > tr > th,
      .table-bordered > thead > tr > td,
      .table-bordered > tbody > tr > td,
      .table-bordered > tfoot > tr > td {
        border: 1px solid #e7e7e7;
      }
      .table > thead > tr > th {
        border-bottom: 1px solid #dddddd;
        vertical-align: bottom;
      }
      .table > thead > tr > th,
      .table > tbody > tr > th,
      .table > tfoot > tr > th,
      .table > thead > tr > td,
      .table > tbody > tr > td,
      .table > tfoot > tr > td {
        border-top: 1px solid #e7eaec;
        line-height: 1.42857;
        padding: 8px;
        vertical-align: top;
      }
      .invoice-table tbody > tr > td:last-child,
      .invoice-table tbody > tr > td:nth-child(4),
      .invoice-table tbody > tr > td:nth-child(3),
      .invoice-table tbody > tr > td:nth-child(2) {
        text-align: right;
      }
      .invoice-table thead > tr > th:last-child,
      .invoice-table thead > tr > th:nth-child(4),
      .invoice-table thead > tr > th:nth-child(3),
      .invoice-table thead > tr > th:nth-child(2) {
        text-align: right;
      }

      .invoice-total > tbody > tr > td:first-child {
        text-align: right;
      }
      .invoice-total > tbody > tr > td {
        border: 0 none;
      }
      .invoice-total > tbody > tr > td:last-child {
        border-bottom: 1px solid #dddddd;
        text-align: right;
        width: 15%;
      }
      .chat-element .well {
        border: 1px solid #e7eaec;
        box-shadow: none;
        margin-top: 10px;
        margin-bottom: 5px;
        padding: 10px 20px;
        font-size: 11px;
        line-height: 16px;
      }
    </style>
  </head>
  <body>
    <div class="wrapper wrapper-content">
      <div class="ibox-content p-xl">
        <div class="row">
          <div class="col-sm-6">
            <h5>From:</h5>
            <address>
              <strong>${restaurant}, ${restaurant_id}</strong>
              <br />
              ${restaddress.locality},  ${restaddress.city}
              <br />
              ${restaddress.state}-${restaddress.postal_code}
              <br />
              <abbr title="Phone">P:</abbr> ${restaddress.phone}
            </address>
          </div>
          <div class="col-sm-6 text-right">
            <h4 class="text-navy">"#" + ${order_id}</h4>
            <span>To:</span>
            <address>
              <strong>${user_name}(${user_id})</strong>
              <br />
              ${address.address_type},
              ${address.flat_num},
              ${address.locality}
              <br />
              ${address.city},${address.postal_code}
              <br />
              <abbr title="Mobile">M:</abbr> ${phone}
              <br />
              <abbr title="Email">E:</abbr> ${email_id}
            </address>
            <p>
              <span>
                <strong>Ordered at:</strong>{" "}
                ${moment(order_time).format("DD-MMM-YYYY HH:mm:ss")}
              </span>
            </p>
          </div>
        </div>
        <div class="table-responsive m-t">
          <table class="table invoice-table">
            <thead>
              <tr>
                <th>Plan</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Customer Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>
                    <strong>
                      ${plan} === "twoPlan" ? "2 Meals" : ${plan} === "fifteenPlan" ?
                      "15 Meals" : "30 Meals"
                    </strong>
                  </div>
                  <small>${meal_type} + ", " + ${category} + "-" + ${time}</small>
                </td>
                <td>${start_date}</td>
                <td>${end_date}</td>
                <td>"$" ${price}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <table class="table invoice-total">
          <tbody>
            <tr>
              <td>
                <strong>Sub Total :</strong>
              </td>
              <td>${price}</td>
            </tr>
            <tr>
              <td>
                <strong>Delivery Fee :</strong>
              </td>
              <td>${delivery_fee}</td>
            </tr>
            <tr>
              <td>
                <strong>Service Fee ({service_fee}%):</strong>
              </td>
              <td>${parseFloat(service_fee_in_dollar).toFixed(2)}</td>
            </tr>
            <tr>
              <td>
                <strong>Tip :</strong>
              </td>
              <td>${tip}</td>
            </tr>
            <tr>
              <td>
                <strong>Discount :</strong>
              </td>
              <td>${discount}</td>
            </tr>
            <tr>
              <td>
                <strong>Taxes ({parseFloat(taxes).toFixed(2)}%):</strong>
              </td>
              <td>${parseFloat(taxesinDollar).toFixed(2)}</td>
            </tr>
            <tr>
              <td>
                <strong>TOTAL :</strong>
              </td>
              <td>${total}</td>
            </tr>
          </tbody>
        </table>
        <div class="well m-t">
          <strong>Comments: </strong>
          ${notes}
        </div>
        <div class="well m-t">
          <table class="table table-bordered table-sm">
            <thead class="thead-primary">
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Rate</th>
                <th scope="col">Qty</th>
                <th scope="col">Order Date</th>
              </tr>
            </thead>
            <tbody>
              rs
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </body>
</html>`;
};
