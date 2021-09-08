import React, { useEffect, useState } from "react";
import Table from "../../utilities/Table";
import { restaurantColumns } from "../../utilities/utility";
import axios from "axios";
import RestaurantCards from "../components/restaurant/RestaurantCards";

export default function Restaurant() {
  const [restaurant, setRestaurant] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/newrest")
      .then((res) => {
        setRestaurant(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="wrapper wrapper-content">
      <RestaurantCards />
      <Table title="Restaurant" data={restaurant} columns={restaurantColumns} />
    </div>
  );
}
