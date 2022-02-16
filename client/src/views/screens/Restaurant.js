import React, { useEffect, useState } from "react";
import Table from "../../utilities/Table";
import { restaurantColumns } from "../../utilities/utility";
import axios from "axios";
import RestaurantCards from "../components/restaurant/RestaurantCards";

const httpClient = axios.create();
httpClient.defaults.timeout = 90000;

export default function Restaurant() {
  const [restaurant, setRestaurant] = useState([]);
  useEffect(() => {
    httpClient
      .get("/api/newrest/")
      .then((res) => {
        setRestaurant(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="wrapper wrapper-content">
      <RestaurantCards data={restaurant} />
      <Table
        title="Restaurant"
        data={restaurant}
        flag={true}
        columns={restaurantColumns}
      />
    </div>
  );
}
