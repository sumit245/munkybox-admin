import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export const ViewOrders = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const fetchOrder = async () => {
    const response = await axios.get("/api/orders/" + id);
    const data = await response.data;
    setOrder(data);
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  const {
    order_time,
    time,
    address,
    category,
    discount,
    email_id,
    end_date,
    meal_type,
    notes,
    order_id,
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
  } = order;
  return (
    <>
      <div className="row wrapper border-bottom white-bg page-heading">
        <div className="col-lg-8">
          <h2>Order Details</h2>
        </div>
        <div className="col-lg-4">
          <div className="title-action">
            <a href="/" className="btn btn-white">
              <i className="fa fa-plus" /> Add ons{" "}
            </a>
            <a href="/" className="btn btn-white">
              <i className="fa fa-credit-card" /> View Card{" "}
            </a>
            <a
              href="invoice_print.html"
              target="_blank"
              className="btn btn-primary"
            >
              <i className="fa fa-print" /> Print Invoice{" "}
            </a>
          </div>
        </div>
      </div>
      <div className="wrapper wrapper-content">
        <div className="ibox-content p-xl">
          <div className="row">
            <div className="col-sm-6">
              <h5>From:</h5>
              <address>
                <strong>{restaurant+","+restaurant_id}</strong>
                <br />
                106 Jorg Avenu, 600/10
                <br />
                Chicago, VT 32456
                <br />
                <abbr title="Phone">P:</abbr> (123) 601-4590
              </address>
            </div>
            <div className="col-sm-6 text-right">
              <h4 className="text-navy">{"#" + order_id}</h4>
              <span>To:</span>
              <address>
                <strong>{user_name + " (" + user_id + ")"}</strong>
                <br />
                {address &&
                  address.address_type +
                    ", " +
                    address.flat_num +
                    ", " +
                    address.locality}
                <br />
                {address && address.city + ", " + address.postal_code}
                <br />
                <abbr title="Mobile">M:</abbr> {phone}
                <br />
                <abbr title="Email">E:</abbr> {email_id}
              </address>
              <p>
                <span>
                  <strong>Ordered at:</strong> {order_time}
                </span>
              </p>
            </div>
          </div>
          <div className="table-responsive m-t">
            <table className="table invoice-table">
              <thead>
                <tr>
                  <th>Plan</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Base Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div>
                      <strong>
                        {plan === "twoPlan"
                          ? "2 Meals"
                          : plan === "fifteenPlan"
                          ? "15 Meals"
                          : "30 Meals"}
                      </strong>
                    </div>
                    <small>{meal_type + ", " + category + "-" + time}</small>
                  </td>
                  <td>{start_date}</td>
                  <td>{end_date}</td>
                  <td>{"$" + price}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* /table-responsive */}
          <table className="table invoice-total">
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
                  <strong>Service Fee :</strong>
                </td>
                <td>{service_fee}%</td>
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
                  <strong>Taxes :</strong>
                </td>
                <td>{taxes}%</td>
              </tr>
              <tr>
                <td>
                  <strong>TOTAL :</strong>
                </td>
                <td>${total}</td>
              </tr>
            </tbody>
          </table>
          <div className="well m-t">
            <strong>Comments: </strong>
            {notes}
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

// ReactDOM.render(<ViewOrders />, document.getElementById('root'));
