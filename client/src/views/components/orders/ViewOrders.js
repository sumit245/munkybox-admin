import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ShowCard from "../restaurant/view/ShowCard";
import moment from "moment";
import { saveAs } from "file-saver";

export const ViewOrders = () => {
  const { id } = useParams();
  const [orderfetched, setOrderFetched] = useState(false);
  const [cardview, toggleCardview] = useState(false);
  const [restaddress, setAddress] = useState({
    locality: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    phone: "",
  });

  const [order, setOrder] = useState({});
  const fetchOrder = async () => {
    const response = await axios.get("/api/orders/" + id);
    const data = await response.data;
    setOrder(data);
  };

  const fetchRestaurant = async () => {
    const response = await axios.get(
      "/api/newrest/getchefbyId/" + order.restaurant_id
    );
    if (response.data !== null) {
      setAddress({ ...response.data });
    }
  };

  useEffect(() => {
    fetchOrder();
    setOrderFetched(true);
  }, []);

  useEffect(() => {
    if (orderfetched) {
      fetchRestaurant();
    }
  }, [orderfetched, fetchRestaurant]);

  const {
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
  } = order;

  const closeHandler = (state) => {
    toggleCardview(state);
  };

  const service_fee_in_dollar = price * service_fee * 0.01;
  const taxesinDollar =
    (parseFloat(price) +
      parseFloat(service_fee_in_dollar) +
      parseFloat(delivery_fee) -
      parseFloat(discount) +
      parseFloat(tip)) *
    0.01 *
    taxes;
  const downloadPdf = async () => {
    const res = await axios.post("/api/orders/create-pdf", {
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
    });
    const response = await axios.get("/api/orders/fetch-pdf", {
      responseType: "blob",
    });
    const pdfBlob = new Blob([response.data], { type: "application/pdf" });
    saveAs(pdfBlob, "receipt.pdf");
  };
  if (!cardview) {
    return (
      <>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-8">
            <h2>Order Details</h2>
          </div>
          <div className="col-lg-4">
            <div className="title-action">
              <button onClick={downloadPdf} className="btn btn-primary">
                <i className="fa fa-print" /> Print Invoice{" "}
              </button>
            </div>
          </div>
        </div>
        <div className="wrapper wrapper-content">
          <div className="ibox-content p-xl">
            <div className="row">
              <div className="col-sm-6">
                <h5>From:</h5>
                <address>
                  <strong>{restaurant + "," + restaurant_id}</strong>
                  <br />
                  {(restaddress.locality || "") +
                    ", " +
                    (restaddress.city || "")}
                  <br />
                  {restaddress.state + " -" + restaddress.postal_code}
                  <br />
                  <abbr title="Phone">P:</abbr> {restaddress.phone}
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
                      (address.locality || "")}
                  <br />
                  {address && address.city + ", " + address.postal_code}
                  <br />
                  <abbr title="Mobile">M:</abbr> {phone}
                  <br />
                  <abbr title="Email">E:</abbr> {email_id}
                </address>
                <p>
                  <span>
                    <strong>Ordered at:</strong>{" "}
                    {moment(order_time).format("DD-MMM-YYYY HH:mm:ss")}
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
                    <th>Customer Price</th>
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
            <div className="well m-t">
              <strong>Comments: </strong>
              {notes}
            </div>
            <div className="well m-t">
              <table className="table table-bordered table-sm">
                <thead className="thead-primary">
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Rate</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Order Date</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(add_on) && add_on.length !== 0 ? (
                    add_on.map((item) =>
                      item.map((item, key) => (
                        <tr key={key}>
                          <td className="td">{item.item}</td>
                          <td>{item.rate}</td>
                          <td>{item.qty}</td>
                          <td>{item.order_date}</td>
                        </tr>
                      ))
                    )
                  ) : (
                    <tr className="text-center">
                      <td colSpan={4}>No add-on for this user</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* </div> */}
        </div>
      </>
    );
  } else {
    return <ShowCard card={card} closeHandler={closeHandler} />;
  }
};
