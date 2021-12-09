import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Plans(props) {
  const restaurant = useSelector((state) => state.restaurant);
  const { base_2price, base_15price, base_30price } = restaurant;
  const [profits, setProfits] = useState({
    twoPlan: "",
    fifteenPlan: "",
    thirtyPlan: "",
  });
  useEffect(() => {
    let componentMounted = true;
    async function fetchData() {
      const response = await axios.get("/api/plans/6066360c920a2e311c95ee92");
      const data = await response.data;
      if (componentMounted) {
        setProfits(data);
      }
    }
    fetchData();
    return () => {
      componentMounted = false;
    };
  }, []);
  return (
    <div className="ibox">
      <div className="ibox-content">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Plan</th>
              <th scope="col">Base Price</th>
              <th scope="col">Customer Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2 Days</td>
              <td>
                {"$"}
                {base_2price}
              </td>
              <td>
                {"$"}
                {parseFloat(base_2price) + parseFloat(profits.twoPlan)}
              </td>
            </tr>
            <tr>
              <td>15 Days</td>
              <td>
                {"$"}
                {base_15price}
              </td>
              <td>
                {"$"}
                {parseFloat(base_15price) + parseFloat(profits.fifteenPlan)}
              </td>
            </tr>
            <tr>
              <td>30 Days</td>
              <td>
                {"$"}
                {base_30price}
              </td>
              <td>
                {"$"}
                {parseFloat(base_30price) + parseFloat(profits.thirtyPlan)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
